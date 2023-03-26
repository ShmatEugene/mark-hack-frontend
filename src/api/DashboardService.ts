import axios, { AxiosResponse, ResponseType } from 'axios';
import { API_URL } from '../config';
import { IAggPrediction, IMainTableRow, IPopularGTINs, IShopsCount } from '../models/MLINterfadces';
import { IRegionsShort } from '../models/RegionsInterfaces';
import { IFlightRequest } from '../models/TasksInterfaces';
import { IModelResult, ITenderInput } from '../models/TenderInterfaces';

export interface IDashboardService {
    fetchRegions(): Promise<IRegionsShort[]>;
    fetchVolumeAggPredict(token: string): Promise<IAggPrediction[]>;

    fetchTable(token: string, from: number, cnt: number): Promise<IMainTableRow[]>;

    fetchPopularGTINs(): Promise<IPopularGTINs>;

    fetchShopsManufactuteCount(): Promise<IShopsCount[]>;
}

const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBbGFuZGV6IiwiZXhwIjoxNjc5OTk4NDI2fQ.ZJ5mB8JYAhz0S4Y0Qzk6EO3l4aOxWmjirVm0rv3CUso';

class DashboardService implements IDashboardService {
    public async fetchRegions(): Promise<IRegionsShort[]> {
        try {
            // const response = await axios.get(`./regions.json`);
            const response = await axios.get(`${API_URL}/map/get`, {
                headers: { Authorization: `Bearer ${TOKEN}` },
            });

            let data: IRegionsShort[] = response.data;
            console.log(data);

            return data;
        } catch (err) {
            const response = await axios.get(`./regions.json`);
            let data: IRegionsShort[] = response.data;
            console.log(data);

            return data;
            console.log('Eroor: ', err);
            const error = new Error('Ошибка получения результата');
            throw error;
        }
    }

    public async fetchVolumeAggPredict(token: string): Promise<IAggPrediction[]> {
        try {
            let token2 =
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBbGFuZGV6IiwiZXhwIjoxNjc5ODExODc4fQ.UZ9iZ3ClXLWPXtBhoKu5uM5zkdNcpfWgLQTXKmsHNX0';
            const config = {
                headers: { Authorization: `Bearer ${token2}` },
            };
            console.log('token', token);

            // const response = await axios.get(`${API_URL}/ml/volume_agg_predict`, config);
            const response = await axios.get(`${API_URL}/ml/volume_agg_predict`, {
                headers: { Authorization: `Bearer ${token2}` },
            });
            console.log(response);

            let data: IAggPrediction[] = response.data;
            console.log(data);

            return data;
        } catch (err) {
            console.log('Eroor: ', err);
            const error = new Error('Ошибка получения результата');
            throw error;
        }
    }

    public async fetchTable(token: string, from: number, cnt: number): Promise<IMainTableRow[]> {
        try {
            let token2 =
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBbGFuZGV6IiwiZXhwIjoxNjc5ODExODc4fQ.UZ9iZ3ClXLWPXtBhoKu5uM5zkdNcpfWgLQTXKmsHNX0';

            if (token) {
                token2 = token;
            }

            // const token3 = localStorage.getItem('UserInfo');
            // console.log(token3);

            // const response = await axios.get(`${API_URL}/ml/volume_agg_predict`, config);
            const response = await axios.get(`${API_URL}/goods/produced`, {
                headers: { Authorization: `Bearer ${TOKEN}` },
                params: {
                    offset: from,
                    count: cnt,
                },
            });
            console.log(response);

            let data: IMainTableRow[] = response.data;
            console.log(data);

            return data;
        } catch (err) {
            console.log('Eroor: ', err);
            const error = new Error('Ошибка получения результата');
            throw error;
        }
    }

    public async fetchPopularGTINs(): Promise<IPopularGTINs> {
        try {
            // const response = await axios.get(`./regions.json`);
            const response = await axios.get(`${API_URL}/ml/popular_offline_gtin_manufacturer`, {
                headers: { Authorization: `Bearer ${TOKEN}` },
            });

            let data: IPopularGTINs = response.data;
            console.log(data);

            return data;
        } catch (err) {
            console.log('Eroor: ', err);
            const error = new Error('Ошибка получения результата');
            throw error;
        }
    }

    public async fetchShopsManufactuteCount(): Promise<IShopsCount[]> {
        try {
            const response = await axios.get(`./shops.json`);

            let data: IShopsCount[] = response.data;
            console.log('shops', data);

            return data;
        } catch (err) {
            console.log('Eroor: ', err);
            const error = new Error('Ошибка получения результата');
            throw error;
        }
    }
}

export const DashboardServiceInstanse = new DashboardService();
