import axios from 'axios';
import authHeader from './auth-header';
import { IRoom, RoomsResDTO, RoomResDTO, ERoomSize, IRoomReqDTO } from '@app/common';

const API_URL = 'http://localhost:4000/api/room';

class RoomService {
    async create({
        name,
        size,
        premium
    }: IRoomReqDTO): Promise<RoomResDTO | undefined> {
        const { data, status } = await axios.post<RoomResDTO>(`${API_URL}/create`, {
            name,
            size,
            premium
        }, { headers: authHeader() });
        if (status === 201) {
            return data;
        }
        return undefined;
    }

    async findOne(id: string): Promise<IRoom | undefined> {
        const { data, status } = await axios.get<RoomResDTO>(`${API_URL}/find/${id}`, { headers: authHeader() });
        if (status === 200) {
            return data.room
        }
        return undefined;
    }

    async findAll({
        isPremium,
        size,
        name
    }: {
        isPremium?: boolean;
        size?: ERoomSize;
        name?: string;
    }): Promise<IRoom[] | undefined> {
        const queryParams: Record<string, string | boolean | undefined> = {};

        if (isPremium !== undefined) {
            queryParams.isPremium = isPremium;
        }
        if (size !== undefined) {
            queryParams.size = size;
        }
        if (name) {
            queryParams.name = name;
        }

        const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
        const url = `${API_URL}/find/all${queryString ? `?${queryString}` : ''}`;
        const { data, status } = await axios.get<RoomsResDTO>(url);

        if (status === 200) {
            return data.rooms;
        }
        return undefined;
    }

    async update({
        size,
        name,
        premium
    }: IRoomReqDTO): Promise<IRoom | undefined> {
        const { data, status } = await axios.patch<RoomResDTO>(`${API_URL}/update/me`, {
            name,
            size,
            premium
        }, { headers: authHeader() });
        if (status === 200) {
            return data.room
        }
        return undefined;
    }
}

export default new RoomService();