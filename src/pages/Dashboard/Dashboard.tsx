import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import useScript from '../../hooks/useScript';
import FirstSidebar from '../../components/FirstSidebar';
import SecondSidebar from '../../components/SecondSidebar';
import OrderTable from '../../components/OrderTable';
import Header from '../../components/Header';
import ColorSchemeToggle from '../../components/ColorSchemeToggle';
import customTheme from '../../theme';
import { useAuth } from '../../hooks/auth.hook';

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function Dashboard() {
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
                        Orders
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
                <Typography level='h1' fontSize='xl4'>
                    Orders
                </Typography>
                <Box sx={{ flex: 999 }} />
                <Box sx={{ display: 'flex', gap: 1, '& > *': { flexGrow: 1 } }}>
                    <Button
                        variant='outlined'
                        color='neutral'
                        startDecorator={<i data-feather='download-cloud' />}
                    >
                        Download PDF
                    </Button>
                    <Button
                        variant='outlined'
                        color='neutral'
                        startDecorator={<i data-feather='table' />}
                    >
                        Download CSV
                    </Button>
                </Box>
            </Box>
            <OrderTable />
        </>
    );
}
