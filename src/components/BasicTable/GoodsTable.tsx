import * as React from 'react';
import Table from '@mui/joy/Table';

const headers = ['Товар', 'Количество'];

const rows = [
    {
        name: 'E07A60936AD356F3AB01F5C67D419876',
        value: 312,
    },
    {
        name: 'BF5FF6D5265973E4F6C477DDAC3D0CF6',
        value: 238,
    },
    {
        name: 'A26A440677CBA571FA3DD89BE8D140D8',
        value: 194,
    },
    {
        name: '7EB3212DCC852F61E568222B0F5EAE78',
        value: 173,
    },
];

export default function GoodsTable() {
    return (
        <Table
            aria-labelledby='tableTitle'
            stickyHeader
            hoverRow
            sx={{
                '--TableCell-headBackground': (theme) => theme.vars.palette.background.level1,
                '--Table-headerUnderlineThickness': '1px',
                '--TableRow-hoverBackground': (theme) => theme.vars.palette.background.level1,
            }}
        >
            <thead>
                <tr>
                    {/* {headers.map((header) => {
                        return <th key={header}></th>;
                    })} */}
                    <th>{headers[0]}</th>
                    <th>{headers[1]}</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        <td>{row.name}</td>
                        <td>{row.value}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
