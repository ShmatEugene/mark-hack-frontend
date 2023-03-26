import axios, { AxiosResponse, ResponseType } from 'axios';
import { API_URL } from '../config';
import { IAggPrediction, IMainTableRow } from '../models/MLINterfadces';
import { IRegionsShort } from '../models/RegionsInterfaces';
import { IFlightRequest } from '../models/TasksInterfaces';
import { IModelResult, ITenderInput } from '../models/TenderInterfaces';

export interface IDashboardService {
    fetchRegions(): Promise<IRegionsShort[]>;
    fetchVolumeAggPredict(token: string): Promise<IAggPrediction[]>;

    fetchTable(token: string, from: number, cnt: number): Promise<IMainTableRow[]>;
}

class DashboardService implements IDashboardService {
    public async fetchRegions(): Promise<IRegionsShort[]> {
        try {
            const response = await axios.get(`./regions.json`);

            let data: IRegionsShort[] = response.data;
            console.log(data);

            return data;
        } catch (err) {
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
                headers: { Authorization: `Bearer ${token2}` },
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
}

export const DashboardServiceInstanse = new DashboardService();
