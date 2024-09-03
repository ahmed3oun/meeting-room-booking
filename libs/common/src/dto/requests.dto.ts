import 'reflect-metadata';
import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";
import { EMembership, ERoomSize } from "@app/common";

// user module
export class SigninReqDTO {

    @IsNotEmpty()
    @IsEmail()
    login: string;

    @IsNotEmpty()
    @Length(6, 50)
    password: string;
}

export interface ISigninReqDTO {
    login: string;
    password: string;
}

export class SignupReqDTO {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6, 50)
    password: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    membership: EMembership;
}
export interface ISignupReqDTO {

    email: string;
    password: string;
    name: string;
    membership: EMembership;
}

export class UserReqDTO {

    @IsNotEmpty()
    @Length(6, 50)
    password: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    membership: EMembership;
}

export interface IUserReqDTO {
    password: string;
    name: string;
    membership: EMembership;
}
// room module
export class RoomReqDTO {

    @IsNotEmpty()
    premium: boolean;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    size: ERoomSize;

    @IsOptional()
    bookings?: string[];
}

export interface IRoomReqDTO {
    premium: boolean;
    name: string;
    size: ERoomSize;
    bookings?: string[];
}
// booking module
export class BookingReqDTO {

    @IsOptional()
    confirmed: boolean;

    @IsNotEmpty()
    roomId: string;

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    startTime: Date;

    @IsNotEmpty()
    endTime: Date;

    @IsNotEmpty()
    guestsEmails: string[];
}

export interface IBookingReqDTO {
    confirmed: boolean;
    roomId: string;
    userId: string;
    startTime: Date;
    endTime: Date;
    guestsEmails: string[];
}
// guest module
export class GuestReqDTO {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsOptional()
    bookingId?: string;
}

export interface IGuestReqDTO {
    email: string;
    name: string;
    bookingId?: string;
}