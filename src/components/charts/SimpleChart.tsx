import React, { PureComponent } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { IShopsGraph } from '../../models/MLINterfadces';

type Props = {
    data: IShopsGraph[];
};
const SimpleChart = ({ data }: Props) => {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width='100%' height='100%'>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* <Line type='monotone' dataKey='pv' stroke='#8884d8' activeDot={{ r: 8 }} /> */}
                    <Line
                        type='monotone'
                        dataKey='uv'
                        label='Количество точек продаж'
                        stroke='#82ca9d'
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SimpleChart;
