export interface IUser {
    isAuth: boolean;
    login: string;
}

export interface IAuthToken {
    access_token: string;
    token_type: string;
}
