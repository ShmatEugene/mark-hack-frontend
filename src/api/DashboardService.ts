import axios, { AxiosResponse, ResponseType } from 'axios';
import { API_URL } from '../config';
import { IFlightRequest } from '../models/TasksInterfaces';
import { IModelResult, ITenderInput } from '../models/TenderInterfaces';

export interface IDashboardService {
    fetchResultByData(data: ITenderInput): string;
    // fetchResultByFile(options: any): Promise<string>;
}

class DashboardService implements IDashboardService {
    public fetchResultByData(data: ITenderInput): string {
        return '1';
        // try {
        //     const response = await axios.post(`${API_URL}/calculate`, {
        //         id: 287205,
        //         session_name: data.name,
        //         OKPD: data.odpk,
        //         KPGZ: data.kpgz,
        //         Region: data.region,
        //         start_price: data.nmck,
        //         date: date,
        //         INN: 'asdf023820s',
        //     });
        //     // const response = await axios.get(`./response_1666522055380.json`);
        //     // console.log(response);

        //     let res: IModelResult = response.data;
        //     console.log(res);

        //     return res;
        // } catch (err) {
        //     message.error('Ошибка получения результата');
        //     console.log('Eroor: ', err);
        //     const error = new Error('Ошибка получения результата');
        //     throw error;
        // }
    }
}

export const DashboardServiceInstanse = new DashboardService();
