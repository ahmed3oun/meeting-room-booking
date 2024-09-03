import { Injectable, Logger } from '@nestjs/common';
import {
    ERoomSize,
    IBooking,
    IRoom,
    RoomReqDTO,
    RoomResDTO,
    RoomsResDTO,
} from "@app/common";
import { PrismaService } from '@app/booking/prisma/prisma.service';
import moment from 'moment';

@Injectable()
export class RoomService {
    private readonly _logger = new Logger(RoomService.name);
    constructor(
        private readonly prismaService: PrismaService,

    ) { }

    async create(body: RoomReqDTO): Promise<RoomResDTO> {
        /* 
        - 2 large rooms (premium)
        - 5 medium rooms (2 premium)
        - 3 small rooms
        */
        const new_room = await this.prismaService.room.create({
            data: {
                name: body.name,
                size: body.size,
                premium: body.premium,
            }
        }) as IRoom;
        this._logger.log({
            new_room
        })
        return {
            room: new_room,
            status: 201,
            message: `Room created successfully!`
        };
    }

    async findAll({
        isPremium,
        size,
        name
    }: {
        isPremium?: boolean;
        size?: ERoomSize;
        name?: string;
    }): Promise<RoomsResDTO> {
        let rooms: IRoom[];
        const condition = `${isPremium !== undefined ? 'premium' : ''}${size ? 'size' : ''}${name ? 'name' : ''}`;

        switch (condition) {
            case 'premium':
                rooms = await this.prismaService.room.findMany({
                    include: { bookings: true },
                    where: { premium: isPremium },
                }) as IRoom[];
                break;

            case 'size':
                rooms = await this.prismaService.room.findMany({
                    include: { bookings: true },
                    where: { size },
                }) as IRoom[];
                break;

            case 'name':
                rooms = await this.prismaService.room.findMany({
                    include: { bookings: true },
                    where: {
                        name: {
                            contains: name,
                            mode: 'insensitive',
                        },
                    },
                }) as IRoom[];
                break;

            case 'premiumsize':
                rooms = await this.prismaService.room.findMany({
                    include: { bookings: true },
                    where: { size, premium: isPremium },
                }) as IRoom[];
                break;

            case 'premiumname':
                rooms = await this.prismaService.room.findMany({
                    include: { bookings: true },
                    where: {
                        name: {
                            contains: name,
                            mode: 'insensitive',
                        },
                        premium: isPremium,
                    },
                }) as IRoom[];
                break;

            case 'sizename':
                rooms = await this.prismaService.room.findMany({
                    include: { bookings: true },
                    where: {
                        name: {
                            contains: name,
                            mode: 'insensitive',
                        },
                        size,
                    },
                }) as IRoom[];
                break;

            default:
                rooms = await this.prismaService.room.findMany({
                    include: { bookings: true },
                }) as IRoom[];
                break;
        }
        this._logger.log({
            rooms
        })

        return {
            rooms,
            status: 200,
            message: `Rooms fetched successfully!`
        };;
    }

    async findOne(id: string): Promise<RoomResDTO> {
        const current_room = await this.prismaService.room.findUniqueOrThrow({
            include: { bookings: true },
            where: { id }
        })
        this._logger.log({
            current_room
        })

        return {
            room: current_room,
            status: 200,
            message: `Room id ${id} fetched successfully!`
        };
    }

    async update(id: string, body: RoomReqDTO) {
        const updated_room = await this.prismaService.room.update({
            where: { id },
            data: {
                name: body.name,
                size: body.size,
                premium: body.premium
            }
        }) as IRoom;
        this._logger.log({
            updated_room
        })

        return {
            room: updated_room,
            status: 200,
            message: `Room id ${id} updated successfully!`
        };
    }

    isRoomAvailable(startTimeToBook: Date, existingBookingOfcurrentRoom: IBooking[]): boolean {
        for (const booking of existingBookingOfcurrentRoom) {
            const startMomentTime = moment(startTimeToBook);
            if (startMomentTime.isBetween(
                booking.startTime,
                booking.endTime
            )) {
                return false
            }
        }
        return true;
    }
}

