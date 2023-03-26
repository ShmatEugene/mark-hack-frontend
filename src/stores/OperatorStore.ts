import { observable, runInAction, makeAutoObservable } from 'mobx';
import { AuthServiceInstanse } from '../api/AuthService';
import { DashboardServiceInstanse } from '../api/DashboardService';
import {
    IAggPrediction,
    IMainTableRow,
    IPopularGTINs,
    IShopsCount,
    IShopsGraph,
} from '../models/MLINterfadces';
import { IRegionsShort } from '../models/RegionsInterfaces';
import { IAuthToken } from '../models/User';

export interface IOperatorStore {
    isLoading: boolean;
    authInfo: IAuthToken;
    isAuth: boolean;
    regionsShort: IRegionsShort[];
    tileMapType: number;

    //region details
    isRegionActive: boolean;
    activeRegion: number;

    volumeAggPrediction: IAggPrediction[];
    popularGTINS: IPopularGTINs;
    shopsCount: IShopsCount[];

    mainTable: IMainTableRow[];

    login(login: string, pass: string): Promise<IAuthToken>;
    logout(): void;
    setAuth(isAuth: boolean): void;

    // setters
    setTileMapType(type: number): void;
    setActiveRegion(type: number): void;
    setIsRegionActive(isActive: boolean): void;

    // getters
    getRegionByCode(code: number): IRegionsShort;
    getShopsGraphByRegion(region_id: number): Array<IShopsGraph>;

    //запросы
    fetchRegionsShort(): Promise<IRegionsShort[]>;
    fetchVolumeAggPredict(token: string): Promise<IAggPrediction[]>;
    fetchTable(token: string, from: number, cnt: number): Promise<IMainTableRow[]>;
    fetchPopularGTINs(): Promise<IPopularGTINs>;
    fetchShopsManufactuteCount(): Promise<IShopsCount[]>;
}

export class OperatorStore implements IOperatorStore {
    isLoading: boolean;
    authInfo: IAuthToken;
    isAuth: boolean;
    regionsShort: IRegionsShort[];
    tileMapType: number;
    popularGTINS: IPopularGTINs;
    shopsCount: IShopsCount[];

    isRegionActive: boolean;
    activeRegion: number;
    volumeAggPrediction: IAggPrediction[];

    mainTable: IMainTableRow[];

    constructor() {
        makeAutoObservable(this, {
            regionsShort: observable,
            mainTable: observable,
        });

        this.isLoading = false;
        this.isAuth = false;
        this.authInfo = {
            token_type: '',
            access_token: '',
        };
        this.regionsShort = [];
        this.tileMapType = 1;

        this.isRegionActive = false;
        this.activeRegion = 77;

        this.volumeAggPrediction = [];
        this.mainTable = [];
        this.popularGTINS = {
            count: [],
            gtin: [],
        };
        this.shopsCount = [];
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

    public async fetchRegionsShort(): Promise<IRegionsShort[]> {
        const data = await DashboardServiceInstanse.fetchRegions();

        console.log('data regions', data);
        runInAction(() => {
            this.regionsShort = data;
        });

        return data;
    }

    public async fetchVolumeAggPredict(token: string): Promise<IAggPrediction[]> {
        const data = await DashboardServiceInstanse.fetchVolumeAggPredict(token);

        let groupedData = data.reduce(function (r, a) {
            r[a.region_code] = r[a.region_code] || [];
            r[a.region_code].push(a);
            return r;
        }, Object.create(null));

        console.log(groupedData);
        runInAction(() => {
            this.volumeAggPrediction = data;
        });

        return data;
    }

    public async fetchTable(token: string, from: number, cnt: number): Promise<IMainTableRow[]> {
        const data = await DashboardServiceInstanse.fetchTable(token, from, cnt);

        console.log(data);

        runInAction(() => {
            this.mainTable = data;
        });

        return data;
    }

    public async fetchPopularGTINs(): Promise<IPopularGTINs> {
        const data = await DashboardServiceInstanse.fetchPopularGTINs();

        console.log(data);

        runInAction(() => {
            this.popularGTINS = data;
        });

        return data;
    }

    public async fetchShopsManufactuteCount(): Promise<IShopsCount[]> {
        const data = await DashboardServiceInstanse.fetchShopsManufactuteCount();

        console.log(data);

        runInAction(() => {
            this.shopsCount = data;
        });

        return data;
    }

    public setTileMapType(type: number): void {
        runInAction(() => {
            this.tileMapType = type;
        });
    }
    public setActiveRegion(type: number): void {
        runInAction(() => {
            this.activeRegion = type;
        });
    }
    public setIsRegionActive(isActive: boolean): void {
        runInAction(() => {
            this.isRegionActive = isActive;
        });
    }

    getRegionByCode(code: number): IRegionsShort {
        const region =
            this.regionsShort.find((x) => x.geoname_code === code) || this.regionsShort[0];
        return region;
    }
    getShopsGraphByRegion(region_id: number): IShopsGraph[] {
        const region =
            this.shopsCount.find((x) => x.geoname_code === region_id) || this.shopsCount[0];

        let res: IShopsGraph[] = [];

        for (let i = 0; i < region.shops_manufacturer_count_region.count.length; i++) {
            const name = region.shops_manufacturer_count_region.month[i] + '';
            const value = region.shops_manufacturer_count_region.count[i];

            res[i] = {
                name: name,
                uv: value,
            };
        }

        return res;
    }
}
