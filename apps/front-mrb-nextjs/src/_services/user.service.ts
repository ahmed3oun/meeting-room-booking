import axios from 'axios';
import authHeader from './auth-header';
import { IUser, IUserReqDTO, UserResDTO } from '@app/common';

const API_URL = 'http://localhost:4000/api/user';

class UserService {
    async getMe(): Promise<IUser | undefined> {
        const { data, status } = await axios.get<UserResDTO>(`${API_URL}/find/me`, { headers: authHeader() });
        if (status === 200) {
            return data.user
        }
        return undefined;
    }

    async updateMe({
        membership,
        name,
        password
    }: IUserReqDTO): Promise<IUser | undefined> {
        const { data, status } = await axios.patch<UserResDTO>(`${API_URL}/update/me`, {
            name,
            password,
            membership
        }, { headers: authHeader() });
        if (status === 200) {
            return data.user
        }
        return undefined;
    }
}

export default new UserService();