import { Body, Controller, Get, InternalServerErrorException, Logger, NotFoundException, Param, Post, Query, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingReqDTO, BookingResDTO, ERoomSize, IUser, OmitUser, toBoolean } from '@app/common';
import { AuthGuard } from '@app/booking/guards/auth.guard';
import { GetUser } from '@app/booking/decorators';
import { RoomService } from '../room/room.service';
import { Response } from 'express';

@Controller('booking')
export class BookingController {

    private readonly _logger = new Logger(BookingController.name)
    constructor(
        private readonly bookingService: BookingService,
        private readonly roomService: RoomService,
    ) { }

    @Post('/create')
    @UseGuards(AuthGuard)
    async create(
        @Body() body: BookingReqDTO,
        @Res() response: Response,
        @GetUser() currentUser: Omit<IUser, 'password' | 'createdAt' | 'updatedAt'>
    ) {
        try {
            let res: BookingResDTO;
            const { room } = await this.roomService.findOne(body.roomId);
            const { bookings } = await this.bookingService.findAll({
                roomId: body.roomId,
                confirmed: true
            })
            const existingBookingOfcurrentRoom = bookings
            // in case both are premium or current room not premium
            if ((room.premium && currentUser.membership === 'PREMIUM') || !room.premium) {
                if (this.roomService.isRoomAvailable(body.startTime, existingBookingOfcurrentRoom)) {
                    res = await this.bookingService.create(body);
                } else {
                    throw new UnauthorizedException('Unauthorized booking, this room is not available');
                }
            } else if (room.premium && currentUser.membership === 'REGULAR') {
                throw new UnauthorizedException('Unauthorized membership');
            }

            return response.status(res.status).send({
                ...res
            })
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException('ID doesn\'t exists in database');
            } else {
                this._logger.error({
                    error
                })
                throw new InternalServerErrorException('Internal server error', error);
            }
        }
    }

    @Get('/find/:id')
    @UseGuards(AuthGuard)
    async findOne(
        @Param('id') id: string,
        @Res() response: Response,
        @GetUser() currentUser: Omit<IUser, 'password' | 'createdAt' | 'updatedAt'>
    ) {
        try {
            const res = await this.bookingService.findOne(id);

            if (currentUser.id === res.booking.userId) {
                throw new UnauthorizedException('Unauthorized');
            } else {
                return response.status(res.status).send({
                    ...res
                })
            }

        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException('This id doesn\'t exists in database');
            } else {
                this._logger.error({
                    error
                })
                throw new InternalServerErrorException(`Failed to find user with id ${id}`, error);
            }
        }
    }

    @Get('/find/all')
    @UseGuards(AuthGuard)
    async findAll(
        @Res() response: Response,
        @GetUser() currentUser: OmitUser,
        @Query('confirmed') confirmed?: string,
        @Query('roomId') roomId?: string,
        @Query('startTime') startTime?: string,
        @Query('endTime') endTime?: string,
    ) {
        try {
            const res = await this.bookingService.findAll({
                userId: currentUser.id,
                roomId,
                confirmed: toBoolean(confirmed),
                startTime: startTime ? new Date(startTime) : undefined,
                endTime: endTime ? new Date(endTime) : undefined,
            });

            return response.status(res.status).send({
                ...res
            })
        } catch (error) {
            this._logger.error({
                error
            })
            throw new InternalServerErrorException('Failed to retrieve rooms', error);
        }
    }
}