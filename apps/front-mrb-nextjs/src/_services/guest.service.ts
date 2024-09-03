import axios from 'axios';
import authHeader from './auth-header';
import { IGuest, BookingResDTO, GuestsResDTO } from '@app/common';

const API_URL = 'http://localhost:4000/api/guest';

class GuestService {

    async findAll({ bookingId }: { bookingId?: string; }): Promise<IGuest[] | undefined> {

        const queryParams: Record<string, string | boolean | undefined> = {};

        if (bookingId !== undefined) {
            queryParams.roomId = bookingId;
        }

        const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
        const url = `${API_URL}/find/all${queryString ? `?${queryString}` : ''}`;
        const { data, status } = await axios.get<GuestsResDTO>(url, { headers: authHeader() });
        if (status === 200) {
            return data.guests
        }
        return undefined;
    }

    async confirm(url: string) {
        try {
            const { data, status } = await axios.patch<BookingResDTO>(url);

            if (status === 200) {
                return data;
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                return {
                    status: error.response.status,
                    message: error.message
                }
            } else {
                console.error('Unexpected error:', error.message);
            }
            return undefined;
        }
    }

}

export default new GuestService();