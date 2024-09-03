import { Inject, Injectable, Logger } from '@nestjs/common';
import { BookingReqDTO, BookingResDTO, BookingsResDTO, IBooking } from '@app/common';
import { PrismaService } from '@app/booking/prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class BookingService {
    private readonly _logger = new Logger(BookingService.name);
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        @Inject('EMAIL') private emailClient: ClientProxy,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        // private readonly guestService: GuestService
    ) { }

    async create(body: BookingReqDTO): Promise<BookingResDTO> {
        const new_booking = await this.prismaService.booking.create({
            data: {
                startTime: body.startTime,
                endTime: body.endTime,
                roomId: body.roomId,
                userId: body.userId,
                guestsEmails: body.guestsEmails,
            }
        }) as IBooking;
        const { user } = await this.userService.findOne(body.userId);

        const confirmationTokens: string[] = [];
        for (const guestEmail of body.guestsEmails) {
            const confirmationToken = await this.jwtService.signAsync({
                email: guestEmail,
                bookingId: new_booking.id
            }, {
                expiresIn: '1d',
                secret: this.configService.get<string>('JWT_SECRET')
            });
            confirmationTokens.push(confirmationToken)
        }

        const confirmationLinks = confirmationTokens.map(
            cToken => `http://localhost:4000/api/guest/confirm/${cToken}`
        );

        await lastValueFrom(
            this.emailClient.emit('booking_created', {
                guestEmails: body.guestsEmails,
                meetingDetails: new_booking,
                ownerUser: user,
                confirmationLinks
            })
        )
        this._logger.log({
            new_booking
        })
        return {
            booking: new_booking,
            status: 201,
            message: `Booking created successfully!`
        }
    }

    async findAll({
        userId,
        roomId,
        startTime,
        endTime,
        confirmed
    }: {
        userId?: string;
        roomId?: string;
        startTime?: Date;
        endTime?: Date;
        confirmed?: boolean;
    }): Promise<BookingsResDTO> {
        const bookings = await this.prismaService.booking.findMany({
            include: {
                guests: true,
                room: true,
                user: true
            },
            where: {
                userId,
                roomId,
                startTime,
                endTime,
                confirmed
            }
        })
        this._logger.log({
            bookings
        })
        return {
            bookings,
            status: 200,
            message: `Bookings fetched successfully!`
        };
    }

    async findOne(id: string): Promise<BookingResDTO> {
        const current_booking = await this.prismaService.booking.findUniqueOrThrow({
            include: {
                guests: true,
                room: true,
                user: true
            },
            where: {
                id
            }
        })
        this._logger.log({
            current_booking
        })
        return {
            booking: current_booking,
            status: 200,
            message: `Booking ${id} Fetched successfully!`
        }
    }

    update(id: string, body: BookingReqDTO): Promise<BookingResDTO> {
        throw new Error("Not implemented");
    }

    async confirm(id: string): Promise<BookingResDTO> {
        const confirmed_booking = await this.prismaService.booking.update({
            where: {
                id
            },
            data: {
                confirmed: true
            }
        }) as IBooking;

        return {
            booking: confirmed_booking,
            status: 200,
            message: `Booking id ${id} confirmed successfully!`
        }
    }

    async remove(id: string): Promise<BookingResDTO> {
        const deleted_booking = await this.prismaService.booking.delete({
            where: {
                id
            }
        })
        this._logger.log({
            deleted_booking
        })
        return {
            booking: deleted_booking,
            status: 200,
            message: `Booking ${id} deleted successfully!`
        }
    }
}

