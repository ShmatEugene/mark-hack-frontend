import axios, { AxiosResponse, ResponseType } from 'axios';
import { API_URL } from '../config';

import { IAuthToken } from '../models/User';

export interface IAuthService {
    login(login: string, pass: string): Promise<IAuthToken>;
}

class AuthService implements IAuthService {
    public async login(login: string, pass: string): Promise<IAuthToken> {
        try {
            const data = new FormData();
            data.append('username', login);
            data.append('password', pass);

            const response = await axios.post(`${API_URL}/auth/token`, data);
            let res: IAuthToken = response.data;
            console.log(res);

            return res;
        } catch (err) {
            console.log('Eroor: ', err);
            const error = new Error('Ошибка авторизации');
            throw error;
        }
    }
}

export const AuthServiceInstanse = new AuthService();
