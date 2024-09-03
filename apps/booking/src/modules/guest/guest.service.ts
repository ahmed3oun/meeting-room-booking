import { PrismaService } from '@app/booking/prisma/prisma.service';
import { GuestReqDTO, GuestResDTO, GuestsResDTO, IGuest } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { BookingService } from '../booking/booking.service';


@Injectable()
export class GuestService {

    private readonly _logger = new Logger(GuestService.name);
    constructor(
        private readonly prismaService: PrismaService,
        private readonly bookingService: BookingService,
    ) { }

    async create(body: GuestReqDTO): Promise<GuestResDTO> {
        let new_guest;
        if (body.bookingId) {
            new_guest = await this.prismaService.guest.create({
                data: {
                    name: body.name,
                    email: body.email,
                    bookingId: body.bookingId || undefined
                }
            }) as IGuest;
        } else {
            new_guest = await this.prismaService.guest.create({
                data: {
                    name: body.name,
                    email: body.email,
                    bookingId: undefined
                }
            }) as IGuest;
        }
        this._logger.log({
            new_guest
        });
        return {
            guest: new_guest
        }
    }

    async findAll({ bookingId }: { bookingId?: string; }): Promise<GuestsResDTO> {
        let guests;
        if (bookingId) {
            guests = await this.prismaService.guest.findMany({
                include: {
                    booking: true
                },
                where: {
                    bookingId
                }
            }) as IGuest[];
        } else {
            guests = await this.prismaService.guest.findMany({
                include: {
                    booking: true
                }
            }) as IGuest[];
        }
        this._logger.log({
            guests
        });
        return {
            guests
        }
    }

    async findOne({
        id,
        email
    }: {
        id?: string,
        email?: string
    }): Promise<GuestResDTO> {
        let current_guest;
        if (id) {
            current_guest = await this.prismaService.guest.findUniqueOrThrow({
                include: {
                    booking: false
                },
                where: {
                    id
                }
            }) as IGuest;
        } else if (email) {
            current_guest = await this.prismaService.guest.findUniqueOrThrow({
                include: {
                    booking: false
                },
                where: {
                    email
                }
            }) as IGuest;
        }
        this._logger.log({
            current_guest
        });
        return {
            guest: current_guest
        }
    }

    async update(id: string, body: GuestReqDTO): Promise<GuestResDTO> {
        const updated_guest = await this.prismaService.guest.update({
            where: {
                id
            },
            data: {
                name: body.name,
                email: body.email,
                bookingId: body.bookingId || undefined
            }
        }) as IGuest;
        this._logger.log({
            updated_guest
        });
        return {
            guest: updated_guest
        }
    }

    async confirm(guestEmail, bookingId): Promise<boolean> {
        const isExistedGuest = await this.isExistedGuest({ email: guestEmail })
        if (!isExistedGuest) {
            await this.create({
                email: guestEmail,
                name: guestEmail.split('@')[0],
                bookingId
            });
        } else {
            const { guest } = await this.findOne({ email: guestEmail });
            await this.update(guest.id, {
                email: guest.email,
                name: guest.name,
                bookingId: guest.bookingId
            })
        }

        const { booking } = await this.bookingService.findOne(bookingId)
        booking.confirmedGuests.push(guestEmail);
        const updated_booking = await this.prismaService.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                confirmedGuests: booking.confirmedGuests
            }
        })

        return !!updated_booking;
    }

    async remove(id: string): Promise<GuestResDTO> {
        const deleted_guest = await this.prismaService.guest.delete({
            where: {
                id
            }
        }) as IGuest
        this._logger.log({
            deleted_guest
        });
        return {
            guest: deleted_guest
        }
    }

    async isExistedGuest({ id, email }: { id?: string; email?: string; }): Promise<boolean> {
        const { guest } = await this.findOne({ id, email })
        if (guest) {
            return true
        } else {
            return false
        }
    }
}

