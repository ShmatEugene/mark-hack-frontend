import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import useScript from '../../hooks/useScript';
import OrderTable from '../../components/OrderTable';
import ColorSchemeToggle from '../../components/ColorSchemeToggle';
import TileMap from '../../components/TileMap/TileMap';
import { Tab, TabList, Tabs } from '@mui/joy';

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function ProductWay() {
    const status = useScript(`https://unpkg.com/feather-icons`);

    useEnhancedEffect(() => {
        // Feather icon setup: https://github.com/feathericons/feather#4-replace
        // @ts-ignore
        if (typeof feather !== 'undefined') {
            // @ts-ignore
            feather.replace();
        }
    }, [status]);

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Breadcrumbs
                    size='sm'
                    aria-label='breadcrumbs'
                    separator={<i data-feather='chevron-right' />}
                    sx={{
                        '--Breadcrumbs-gap': '1rem',
                        '--Icon-fontSize': '16px',
                        fontWeight: 'lg',
                        color: 'neutral.400',
                        px: 0,
                    }}
                >
                    <Link
                        underline='none'
                        color='neutral'
                        fontSize='inherit'
                        href='#some-link'
                        aria-label='Home'
                    >
                        <i data-feather='home' />
                    </Link>
                    <Link underline='hover' color='neutral' fontSize='inherit' href='#some-link'>
                        Dashboard
                    </Link>
                    <Typography fontSize='inherit' variant='soft' color='primary'>
                        Путь продукта
                    </Typography>
                </Breadcrumbs>
                <ColorSchemeToggle
                    sx={{ ml: 'auto', display: { xs: 'none', md: 'inline-flex' } }}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    my: 1,
                    gap: 1,
                    flexWrap: 'wrap',
                    '& > *': {
                        minWidth: 'clamp(0px, (500px - 100%) * 999, 100%)',
                        flexGrow: 1,
                    },
                }}
            >
                <div>
                    <Typography level='h1' fontSize='xl4'>
                        Путь продукта
                    </Typography>
                </div>
                <div>Путь продукта</div>
            </Box>
        </>
    );
}
