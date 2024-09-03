import axios from "axios";
import { ISigninReqDTO, ISignupReqDTO, IUser, SigninResDTO, SignupResDTO } from '@app/common'

const API_URL = "http://localhost:4000/api/user";

class AuthService {

    async login({ login, password }: ISigninReqDTO): Promise<SigninResDTO> {
        const { data, status } = await axios.post<SigninResDTO>(`${API_URL}/signin`, {
            login,
            password
        })
        if (status === 200) {
            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('token', JSON.stringify(data.token))
        }

        return data;
    }

    logout() {
        localStorage.clear()
    }

    async register({ email, name, password, membership }: ISignupReqDTO): Promise<SignupResDTO> {
        const { data } = await axios.post<SignupResDTO>(API_URL + "signup", {
            name,
            email,
            password,
            membership
        });

        return data;
    }

    getCurrentUser(): IUser | null {
        const userStr: string | null = localStorage.getItem("user");
        if (userStr)
            return JSON.parse(userStr);

        return null;
    }
}

export default new AuthService();