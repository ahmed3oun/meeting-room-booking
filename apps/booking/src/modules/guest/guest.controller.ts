import {
    BadRequestException, Controller, Get, Logger,
    Param, Patch, Query, Res, UnauthorizedException, UseGuards
} from '@nestjs/common';
import { GuestService } from './guest.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { BookingService } from '../booking/booking.service';
import { BookingResDTO, GuestsResDTO, OmitUser } from '@app/common';
import { GetUser } from '@app/booking/decorators';
import { AuthGuard } from '@app/booking/guards/auth.guard';


@Controller('guest')
export class GuestController {

    private readonly _logger = new Logger(GuestController.name);
    constructor(
        private readonly guestService: GuestService,
        private readonly bookingService: BookingService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }


    @Patch('/confirm/:token')
    async confirm(
        @Param('token') confirmToken: string,
        @Res() response: Response
    ): Promise<Response<BookingResDTO>> {
        try {
            const { email, bookingId } = await this.jwtService.verifyAsync(confirmToken, {
                secret: this.configService.get<string>('JWT_SECRET')
            });
            const { booking } = await this.bookingService.findOne(bookingId)
            const foundEmail = booking.confirmedGuests.find(e => e === email)
            if (foundEmail) {
                throw new BadRequestException('Already confirmed!');
            }
            let _booking;
            if (await this.guestService.confirm(email, bookingId)) {
                // test if all guests are confirmed to confirm the meeting
                const { booking } = await this.bookingService.findOne(bookingId);
                if (booking.confirmedGuests.length === booking.guestsEmails.length) {
                    const confirmRes = await this.bookingService.confirm(booking.id);
                    _booking = confirmRes.booking
                }
            }

            return response.status(200).send({
                booking: _booking,
                status: 200,
                message: `Meeting confirmed successfully!`
            })
        } catch (error) {
            this._logger.error({
                error
            })
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Token has expired');
            } else {
                throw new UnauthorizedException('Invalid token');
            }
        }
    }

    @Get('/find/all')
    @UseGuards(AuthGuard)
    async findAll(
        @GetUser() currentUser: OmitUser,
        @Res() response: Response,
        @Query('bookingId') bookingId?: string,
    ) {
        const res: GuestsResDTO = await this.guestService.findAll({
            bookingId
        })

        return response.status(200).send({
            ...res
        })
    }
}
