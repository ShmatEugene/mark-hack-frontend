/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { observer } from 'mobx-react-lite';
import { useStores } from '../hooks/useStores';

const rows = [
    {
        dt: '2021-11-22T00:00:00',
        gtin: 'A279061678C6BCAD8D72041BB2C0A834',
        prid: 'DA62EC79660CF21AC37A260DA6F642C4',
        operation_type: 'РФ',
        cnt: 175,
    },
    {
        dt: '2021-11-22T00:00:00',
        gtin: '3C31611BC8FF7AF82B6E7D8930E11CA8',
        prid: 'DA62EC79660CF21AC37A260DA6F642C4',
        operation_type: 'РФ',
        cnt: 18,
    },
    {
        dt: '2021-11-22T00:00:00',
        gtin: '4A566E6DC27A1376CC263090A77C62D8',
        prid: 'DA62EC79660CF21AC37A260DA6F642C4',
        operation_type: 'РФ',
        cnt: 1,
    },
    {
        dt: '2021-11-22T00:00:00',
        gtin: '2FAFBA086E6F308987A681CD6238AE3C',
        prid: 'DA62EC79660CF21AC37A260DA6F642C4',
        operation_type: 'РФ',
        cnt: 18,
    },
    {
        dt: '2021-11-22T00:00:00',
        gtin: '5D74B67E1DAC42C7526F27A6BDA73FF6',
        prid: 'DA62EC79660CF21AC37A260DA6F642C4',
        operation_type: 'Перемаркировка',
        cnt: 120,
    },
    {
        dt: '2021-11-22T00:00:00',
        gtin: 'CD80FBB949F19044827D363A89D4B60B',
        prid: 'DA62EC79660CF21AC37A260DA6F642C4',
        operation_type: 'РФ',
        cnt: 3,
    },
    {
        dt: '2022-02-03T00:00:00',
        gtin: '91EAD5D4A1205DE123B751E9B5322BB8',
        prid: 'DA62EC79660CF21AC37A260DA6F642C4',
        operation_type: 'РФ',
        cnt: 56,
    },
    {
        dt: '2022-02-03T00:00:00',
        gtin: '8618EE0C2EDADED7BE6EA570F34894A6',
        prid: 'DA62EC79660CF21AC37A260DA6F642C4',
        operation_type: 'РФ',
        cnt: 1586,
    },
    {
        dt: '2022-02-03T00:00:00',
        gtin: '8AD9201DF484BA62BFCDA93389BE2546',
        prid: 'DA62EC79660CF21AC37A260DA6F642C4',
        operation_type: 'РФ',
        cnt: 1688,
    },
    {
        dt: '2022-02-03T00:00:00',
        gtin: 'D8D81404B197E7D50A7499D7064D46AC',
        prid: 'DA62EC79660CF21AC37A260DA6F642C4',
        operation_type: 'РФ',
        cnt: 72,
    },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const OrderTable = observer(() => {
    const [order, setOrder] = React.useState<Order>('desc');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [open, setOpen] = React.useState(false);

    const { operatorStore } = useStores();

    const renderFilters = () => (
        <React.Fragment>
            <FormControl size='sm'>
                <FormLabel>Status</FormLabel>
                <Select
                    placeholder='Filter by status'
                    slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                >
                    <Option value='paid'>Paid</Option>
                    <Option value='pending'>Pending</Option>
                    <Option value='refunded'>Refunded</Option>
                    <Option value='cancelled'>Cancelled</Option>
                </Select>
            </FormControl>

            <FormControl size='sm'>
                <FormLabel>Category</FormLabel>
                <Select placeholder='All'>
                    <Option value='all'>All</Option>
                </Select>
            </FormControl>

            <FormControl size='sm'>
                <FormLabel>Customer</FormLabel>
                <Select placeholder='All'>
                    <Option value='all'>All</Option>
                </Select>
            </FormControl>
        </React.Fragment>
    );
    return (
        <React.Fragment>
            <Sheet
                className='SearchAndFilters-mobile'
                sx={{
                    display: {
                        xs: 'flex',
                        sm: 'none',
                    },
                    my: 1,
                    gap: 1,
                }}
            >
                <Input
                    size='sm'
                    placeholder='Search'
                    startDecorator={<i data-feather='search' />}
                    sx={{ flexGrow: 1 }}
                />
                <IconButton
                    size='sm'
                    variant='outlined'
                    color='neutral'
                    onClick={() => setOpen(true)}
                >
                    <i data-feather='filter' />
                </IconButton>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog aria-labelledby='filter-modal' layout='fullscreen'>
                        <ModalClose />
                        <Typography id='filter-modal' level='h2'>
                            Фильрты
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {renderFilters()}
                            <Button color='primary' onClick={() => setOpen(false)}>
                                Submit
                            </Button>
                        </Sheet>
                    </ModalDialog>
                </Modal>
            </Sheet>
            <Box
                className='SearchAndFilters-tabletUp'
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: {
                        xs: 'none',
                        sm: 'flex',
                    },
                    flexWrap: 'wrap',
                    gap: 1.5,
                    '& > *': {
                        minWidth: {
                            xs: '120px',
                            md: '160px',
                        },
                    },
                }}
            >
                <FormControl sx={{ flex: 1 }} size='sm'>
                    <FormLabel>Search for order</FormLabel>
                    <Input placeholder='Search' startDecorator={<i data-feather='search' />} />
                </FormControl>

                {renderFilters()}
            </Box>
            <Sheet
                className='OrderTableContainer'
                variant='outlined'
                sx={{
                    width: '100%',
                    borderRadius: 'md',
                    flex: 1,
                    overflow: 'auto',
                    minHeight: 0,
                }}
            >
                <Table
                    aria-labelledby='tableTitle'
                    stickyHeader
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': (theme) =>
                            theme.vars.palette.background.level1,
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': (theme) =>
                            theme.vars.palette.background.level1,
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: 100, textAlign: 'center', padding: 12 }}>
                                {/* <Checkbox
                                    indeterminate={
                                        selected.length > 0 && selected.length !== rows.length
                                    }
                                    checked={selected.length === rows.length}
                                    onChange={(event) => {
                                        setSelected(
                                            event.target.checked ? rows.map((row) => row.id) : []
                                        );
                                    }}
                                    color={
                                        selected.length > 0 || selected.length === rows.length
                                            ? 'primary'
                                            : undefined
                                    }
                                    sx={{ verticalAlign: 'text-bottom' }}
                                /> */}
                            </th>
                            <th style={{ width: 400, padding: 12 }}>
                                <Link
                                    underline='none'
                                    color='primary'
                                    component='button'
                                    onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                                    fontWeight='lg'
                                    endDecorator={<i data-feather='arrow-down' />}
                                    sx={{
                                        '& svg': {
                                            transition: '0.2s',
                                            transform:
                                                order === 'desc'
                                                    ? 'rotate(0deg)'
                                                    : 'rotate(180deg)',
                                        },
                                    }}
                                >
                                    GTIN
                                </Link>
                            </th>
                            <th style={{ width: 400, padding: 12 }}>PRID</th>
                            <th style={{ width: 200, padding: 12 }}>operation_type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td>{new Date(row.dt).toDateString()}</td>
                                    <td>{row.gtin}</td>
                                    <td>{row.prid}</td>
                                    <td>{row.operation_type}</td>
                                </tr>
                            );
                        })}
                        {/* {stableSort(rows, getComparator(order, 'id')).map((row) => (
                            <tr key={row.id}>
                                <td style={{ textAlign: 'center' }}>
                                    <Checkbox
                                        checked={selected.includes(row.id)}
                                        color={selected.includes(row.id) ? 'primary' : undefined}
                                        onChange={(event) => {
                                            setSelected((ids) =>
                                                event.target.checked
                                                    ? ids.concat(row.id)
                                                    : ids.filter((itemId) => itemId !== row.id)
                                            );
                                        }}
                                        slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                                        sx={{ verticalAlign: 'text-bottom' }}
                                    />
                                </td>
                                <td>
                                    <Typography fontWeight='md'>{row.id}</Typography>
                                </td>
                                <td>{row.date}</td>
                                <td>
                                    <Chip
                                        variant='soft'
                                        size='sm'
                                        startDecorator={
                                            {
                                                Paid: <i data-feather='check' />,
                                                Refunded: <i data-feather='corner-up-left' />,
                                                Cancelled: <i data-feather='x' />,
                                            }[row.status]
                                        }
                                        color={
                                            {
                                                Paid: 'success',
                                                Refunded: 'neutral',
                                                Cancelled: 'danger',
                                            }[row.status] as ColorPaletteProp
                                        }
                                    >
                                        {row.status}
                                    </Chip>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Avatar size='sm'>{row.customer.initial}</Avatar>
                                        <div>
                                            <Typography
                                                fontWeight='lg'
                                                level='body3'
                                                textColor='text.primary'
                                            >
                                                {row.customer.name}
                                            </Typography>
                                            <Typography level='body3'>
                                                {row.customer.email}
                                            </Typography>
                                        </div>
                                    </Box>
                                </td>
                                <td>{row.subscription}</td>
                                <td>
                                    <Link fontWeight='lg' component='button' color='neutral'>
                                        архив
                                    </Link>
                                    <Link
                                        fontWeight='lg'
                                        component='button'
                                        color='primary'
                                        sx={{ ml: 2 }}
                                    >
                                        Загрузить
                                    </Link>
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </Table>
            </Sheet>
            <Box
                className='Pagination-mobile'
                sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}
            >
                <IconButton aria-label='previous page' variant='outlined' color='neutral' size='sm'>
                    <i data-feather='arrow-left' />
                </IconButton>
                <Typography level='body2' mx='auto'>
                    Page 1 of 10
                </Typography>
                <IconButton aria-label='next page' variant='outlined' color='neutral' size='sm'>
                    <i data-feather='arrow-right' />
                </IconButton>
            </Box>
            <Box
                className='Pagination-laptopUp'
                sx={{
                    pt: 4,
                    gap: 1,
                    [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
                    display: {
                        xs: 'none',
                        md: 'flex',
                    },
                }}
            >
                <Button
                    size='sm'
                    variant='plain'
                    color='neutral'
                    startDecorator={<i data-feather='arrow-left' />}
                >
                    Previous
                </Button>

                <Box sx={{ flex: 1 }} />
                {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
                    <IconButton
                        key={page}
                        size='sm'
                        variant={Number(page) ? 'outlined' : 'plain'}
                        color='neutral'
                    >
                        {page}
                    </IconButton>
                ))}
                <Box sx={{ flex: 1 }} />

                <Button
                    size='sm'
                    variant='plain'
                    color='neutral'
                    endDecorator={<i data-feather='arrow-right' />}
                >
                    Next
                </Button>
            </Box>
        </React.Fragment>
    );
});

export default OrderTable;
