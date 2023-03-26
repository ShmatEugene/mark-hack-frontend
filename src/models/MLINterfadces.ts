export interface IAggPrediction {
    dt: string;
    region_code: number;
    value: number;
}

// export interface IAggPredictionGrouped {

// }

export interface IMainTableRow {
    dt: string;
    gtin: string;
    prid: string;
    operation_type: string;
    cnt: number;
}

export interface IPopularGTINs {
    gtin: Array<string>;
    count: Array<number>;
}

export interface IShopsCount {
    geoname_code: number;
    shops_manufacturer_count_region: {
        region_code: number;
        month: Array<number>;
        count: Array<number>;
    };
}

export interface IShopsGraph {
    uv: number;
    name: string;
}
