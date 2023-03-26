import * as React from 'react';
import Table from '@mui/joy/Table';
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';

const headers = ['Точка', 'Количество'];

const rows = [
    {
        name: '289AEBCA82877CB19E7AA33E0E522883',
        value: 29,
    },
    {
        name: '8088EB728C76675D594BE5097D66B966',
        value: 9,
    },
    {
        name: 'E0C3BE288E09F7A2529D358D54AA71DC',
        value: 2,
    },
    {
        name: 'E4CBE8BA3DBC3C6E2E85EC808EFCF3F5',
        value: 2,
    },
];

const PointsTable = observer(() => {
    const { operatorStore } = useStores();

    React.useEffect(() => {
        operatorStore.fetchPopularGTINs();
    }, []);

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
});

export default PointsTable;
