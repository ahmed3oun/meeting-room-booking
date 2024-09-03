import axios from 'axios';
import authHeader from './auth-header';
import { IBooking, BookingResDTO, BookingsResDTO, IBookingReqDTO } from '@app/common';

const API_URL = 'http://localhost:4000/api/booking';

class BookingService {
    async create({
        userId,
        roomId,
        startTime,
        endTime,
        guestsEmails
    }: IBookingReqDTO): Promise<BookingResDTO | undefined> {
        const { data, status } = await axios.post<BookingResDTO>(`${API_URL}/create`, {
            userId,
            roomId,
            startTime,
            endTime,
            guestsEmails
        }, { headers: authHeader() });
        if (status === 201) {
            return data;
        }
        return undefined;
    }

    async findOne(id: string): Promise<IBooking | undefined> {
        const { data, status } = await axios.get<BookingResDTO>(`${API_URL}/find/${id}`, { headers: authHeader() });
        if (status === 200) {
            return data.booking
        }
        return undefined;
    }

    async findAll({
        confirmed,
        roomId,
        startTime,
        endTime
    }: {
        confirmed?: boolean;
        roomId?: string;
        startTime?: Date;
        endTime?: Date;
    }): Promise<IBooking[] | undefined> {

        const queryParams: Record<string, string | boolean | undefined> = {};

        if (confirmed !== undefined) {
            queryParams.confirmed = confirmed;
        }
        if (roomId !== undefined) {
            queryParams.roomId = roomId;
        }
        if (startTime) {
            queryParams.startTime = startTime.toISOString();
        }
        if (endTime) {
            queryParams.endTime = endTime.toISOString();
        }

        const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
        const url = `${API_URL}/find/all${queryString ? `?${queryString}` : ''}`;
        const { data, status } = await axios.get<BookingsResDTO>(url, { headers: authHeader() });
        if (status === 200) {
            return data.bookings
        }
        return undefined;
    }
}

export default new BookingService();