import { observable, runInAction, makeAutoObservable } from 'mobx';
import { AuthServiceInstanse } from '../api/AuthService';
import { IFlightRequest } from '../models/TasksInterfaces';
import { IAuthToken } from '../models/User';

export interface IOperatorStore {
    isLoading: boolean;
    authInfo: IAuthToken;
    isAuth: boolean;

    // fetchResultByData(data: ITenderInput): Promise<IModelResult>;
    login(login: string, pass: string): Promise<IAuthToken>;
    logout(): void;
    setAuth(isAuth: boolean): void;
}

export class OperatorStore implements IOperatorStore {
    isLoading: boolean;
    authInfo: IAuthToken;
    isAuth: boolean;

    constructor() {
        makeAutoObservable(this, {});

        this.isLoading = false;
        this.isAuth = false;
        this.authInfo = {
            token_type: '',
            access_token: '',
        };
    }

    public async login(login: string, pass: string): Promise<IAuthToken> {
        this.isLoading = true;

        try {
            const result = await AuthServiceInstanse.login(login, pass);
            console.log(result);
            if (result) {
                runInAction(() => {
                    this.authInfo = result;
                    this.isLoading = false;
                    this.isAuth = true;
                });
            }
            const storageName = 'userInfo';
            localStorage.setItem(
                storageName,
                JSON.stringify({ login: login, token: result.access_token })
            );

            return result;
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
            });
            throw error;
        }
    }

    logout(): void {
        runInAction(() => {
            this.authInfo = {
                access_token: '',
                token_type: '',
            };
            this.isAuth = false;
        });
    }

    setAuth(): void {
        console.log(localStorage.getItem('userInfo'));

        // runInAction(() => {
        //     this.isAuth = isAuth;
        // });
    }
}
