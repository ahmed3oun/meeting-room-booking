import { EMembership, ERoomSize } from "./enums";

interface IBase {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUser extends IBase {
    email: string;
    password?: string;
    name: string;
    membership: EMembership;
    bookings?: IBooking[];
}

export type OmitUser = Omit<IUser, 'password' | 'createdAt' | 'updatedAt'>

export interface IBooking extends IBase {
    room?: IRoom;
    roomId?: string;
    user?: IUser;
    userId?: string;
    startTime: Date;
    endTime: Date;
    guests?: IGuest[];
    confirmedGuests?: string[]
    guestsEmails?: string[]
    confirmed: boolean;
}

export interface IRoom extends IBase {
    name: string;
    size: ERoomSize;
    premium: boolean;
    bookings?: IBooking[];
}

export interface IGuest extends IBase {
    email: string;
    name: string;
    booking?: IBooking;
    bookingId?: string;
}