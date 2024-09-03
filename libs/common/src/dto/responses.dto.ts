import { IBooking, IGuest, IRoom, IUser } from "@app/common";


interface BaseRes {
    message?: string;
    status?: number;
}
// user module
export interface SigninResDTO extends BaseRes {
    user: IUser;
    token: string;
}

export interface SignupResDTO extends BaseRes {
    user: IUser;
}

export interface UsersResDTO extends BaseRes {
    users: IUser[];
}

export interface UserResDTO extends BaseRes {
    user: IUser;
}
// room module
export interface RoomResDTO extends BaseRes {
    room: IRoom;
}

export interface RoomsResDTO extends BaseRes {
    rooms: IRoom[];
}
// booking module
export interface BookingResDTO extends BaseRes {
    booking: IBooking;
}

export interface BookingsResDTO extends BaseRes {
    bookings: IBooking[];
}
// Guest module
export interface GuestResDTO extends BaseRes {
    guest: IGuest;
}

export interface GuestsResDTO extends BaseRes {
    guests: IGuest[];
}