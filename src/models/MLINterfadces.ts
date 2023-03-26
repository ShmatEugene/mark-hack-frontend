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
