import { KeyboardArrowDown, ReceiptLong } from '@mui/icons-material';
import {
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    listItemButtonClasses,
    listItemClasses,
    Typography,
} from '@mui/joy';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '../../hooks/useStores';
import BasicTable from '../BasicTable/BasicTable';
import GoodsTable from '../BasicTable/GoodsTable';
import PointsTable from '../BasicTable/PointsTable';
import SimpleChart from '../charts/SimpleChart';
import './RegionDetails.scss';

type Props = {};

const graphData = [
    {
        name: 'Page A',
        uv: 4000,
    },
    {
        name: 'Page B',
        uv: 3000,
    },
    {
        name: 'Page C',
        uv: 2000,
    },
    {
        name: 'Page D',
        uv: 2780,
    },
    {
        name: 'Page E',
        uv: 1890,
    },
    {
        name: 'Page F',
        uv: 2390,
    },
    {
        name: 'Page G',
        uv: 3490,
    },
];

const RegionDetails = observer(() => {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);

    const { operatorStore } = useStores();

    const regionShort = operatorStore.getRegionByCode(operatorStore.activeRegion);

    return (
        <Box>
            <Typography level='h3'>Информация по региону {regionShort?.name_with_type}</Typography>

            <List
                size='sm'
                sx={(theme) => ({
                    // Gatsby colors
                    '--joy-palette-primary-plainColor': '#8a4baf',
                    '--joy-palette-neutral-plainHoverBg': 'transparent',
                    '--joy-palette-neutral-plainActiveBg': 'transparent',
                    '--joy-palette-primary-plainHoverBg': 'transparent',
                    '--joy-palette-primary-plainActiveBg': 'transparent',
                    [theme.getColorSchemeSelector('dark')]: {
                        '--joy-palette-text-secondary': '#635e69',
                        '--joy-palette-primary-plainColor': '#d48cff',
                    },

                    '--List-insetStart': '32px',
                    '--ListItem-paddingY': '0px',
                    '--ListItem-paddingRight': '16px',
                    '--ListItem-paddingLeft': '21px',
                    '--ListItem-startActionWidth': '0px',
                    '--ListItem-startActionTranslateX': '-50%',

                    [`& .${listItemButtonClasses.root}`]: {
                        borderLeft: '1px solid',
                        borderColor: 'divider',
                    },
                    [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
                        borderColor: 'currentColor',
                    },
                    [`& .${listItemClasses.nested} > .${listItemButtonClasses.root}`]: {
                        border: 'none',
                    },
                    '& [class*="startAction"]': {
                        color: 'var(--joy-palette-text-tertiary)',
                    },
                })}
            >
                <ListItem
                    nested
                    sx={{ my: 1 }}
                    startAction={
                        <IconButton
                            variant='plain'
                            size='sm'
                            color='neutral'
                            onClick={() => setOpen(!open)}
                        >
                            <KeyboardArrowDown
                                sx={{ transform: open ? 'initial' : 'rotate(-90deg)' }}
                            />
                        </IconButton>
                    }
                >
                    <ListItem>
                        <Typography
                            level='h4'
                            sx={{
                                fontWeight: open ? 'bold' : undefined,
                                color: open ? 'text.primary' : 'inherit',
                            }}
                        >
                            Торговые точки
                        </Typography>
                    </ListItem>
                    {open && (
                        <Box>
                            <Divider />
                            <Typography className='list-text' level='body1'>
                                Таблица торговых точек по регионам, чаще всего "неправильно"
                                выводящих товары из оборота для одного производителя
                            </Typography>
                            {/* <BasicTable /> */}
                            <PointsTable />
                        </Box>
                    )}
                </ListItem>
                <ListItem
                    nested
                    sx={{ my: 1 }}
                    startAction={
                        <IconButton
                            variant='plain'
                            size='sm'
                            color='neutral'
                            onClick={() => setOpen2((bool) => !bool)}
                        >
                            <KeyboardArrowDown
                                sx={{ transform: open2 ? 'initial' : 'rotate(-90deg)' }}
                            />
                        </IconButton>
                    }
                >
                    <ListItem>
                        <Typography
                            level='h4'
                            sx={{
                                fontWeight: open2 ? 'bold' : undefined,
                                color: open2 ? 'text.primary' : 'inherit',
                            }}
                        >
                            Популярные товары
                        </Typography>
                    </ListItem>
                    {open2 && (
                        <Box>
                            <Divider />
                            <Typography className='list-text' level='body1'>
                                Самые популярные товары среди оффлайн покупателей для 1
                                производителя по регионам.
                            </Typography>
                            {/* <BasicTable /> */}
                            <GoodsTable />
                        </Box>
                    )}
                </ListItem>
                <ListItem
                    nested
                    sx={{ my: 1 }}
                    startAction={
                        <IconButton
                            variant='plain'
                            size='sm'
                            color='neutral'
                            onClick={() => setOpen3((bool) => !bool)}
                        >
                            <KeyboardArrowDown
                                sx={{ transform: open3 ? 'initial' : 'rotate(-90deg)' }}
                            />
                        </IconButton>
                    }
                >
                    <ListItem>
                        <Typography
                            level='h4'
                            sx={{
                                fontWeight: open3 ? 'bold' : undefined,
                                color: open3 ? 'text.primary' : 'inherit',
                            }}
                        >
                            Точки, которые продают товары одного производителя
                        </Typography>
                    </ListItem>
                    {open3 && (
                        <Box>
                            <Divider />
                            <Typography className='list-text' level='body1'>
                                Количество точек, окторый продают товары конеретного производителя.
                            </Typography>
                            <SimpleChart
                                data={operatorStore.getShopsGraphByRegion(
                                    operatorStore.activeRegion
                                )}
                            />
                        </Box>
                    )}
                </ListItem>
                <ListItem
                    nested
                    sx={{ my: 1 }}
                    startAction={
                        <IconButton
                            variant='plain'
                            size='sm'
                            color='neutral'
                            onClick={() => setOpen4((bool) => !bool)}
                        >
                            <KeyboardArrowDown
                                sx={{ transform: open4 ? 'initial' : 'rotate(-90deg)' }}
                            />
                        </IconButton>
                    }
                >
                    <ListItem>
                        <Typography
                            level='h4'
                            sx={{
                                fontWeight: open4 ? 'bold' : undefined,
                                color: open4 ? 'text.primary' : 'inherit',
                            }}
                        >
                            Прогноз по количеству и сумме продаж
                        </Typography>
                    </ListItem>
                    {open4 && (
                        <Box>
                            <Divider />
                            <Typography className='list-text' level='body1'>
                                Прогноз кол-ва продаж на месяц и суммы продаж на месяц для всех
                                производителей (агрегированные)
                            </Typography>
                            <SimpleChart data={graphData} />
                            <SimpleChart data={graphData} />
                        </Box>
                    )}
                </ListItem>
                <ListItem
                    nested
                    sx={{ my: 1 }}
                    startAction={
                        <IconButton
                            variant='plain'
                            size='sm'
                            color='neutral'
                            onClick={() => setOpen5((bool) => !bool)}
                        >
                            <KeyboardArrowDown
                                sx={{ transform: open5 ? 'initial' : 'rotate(-90deg)' }}
                            />
                        </IconButton>
                    }
                >
                    <ListItem>
                        <Typography
                            level='h4'
                            sx={{
                                fontWeight: open5 ? 'bold' : undefined,
                                color: open5 ? 'text.primary' : 'inherit',
                            }}
                        >
                            Прогноз по количеству и сумме продаж для производителя
                        </Typography>
                    </ListItem>
                    {open5 && (
                        <Box>
                            <Divider />
                            <Typography className='list-text' level='body1'>
                                Прогноз кол-ва продаж и суммы продаж на месяц для 1 производителя.
                            </Typography>
                            <SimpleChart data={graphData} />
                            <SimpleChart data={graphData} />
                        </Box>
                    )}
                </ListItem>
            </List>
        </Box>
    );
});

export default RegionDetails;
