import * as React from 'react';
import Table from '@mui/joy/Table';

const headers = ['header1'];

const rows = [
    {
        name: 'INV-1231',
    },
    {
        name: 'INV-1232',
    },
    {
        name: 'INV-1233',
    },
];

export default function BasicTable() {
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
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        <td>{row.name}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
