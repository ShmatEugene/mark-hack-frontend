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
import { useStores } from '../../hooks/useStores';
import { Modal, ModalClose, Sheet } from '@mui/joy';

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Dashboard() {
    const [open, setOpen] = React.useState<boolean>(false);
    const status = useScript(`https://unpkg.com/feather-icons`);

    useEnhancedEffect(() => {
        // Feather icon setup: https://github.com/feathericons/feather#4-replace
        // @ts-ignore
        if (typeof feather !== 'undefined') {
            // @ts-ignore
            feather.replace();
        }
    }, [status]);

    const { operatorStore } = useStores();
    const { token } = useAuth();
    React.useEffect(() => {
        operatorStore.fetchTable(token, 0, 10);
    }, []);

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
                        Таблица товаров
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
                    Товары
                </Typography>
                <Box sx={{ flex: 999 }} />
                <Box sx={{ display: 'flex', gap: 1, '& > *': { flexGrow: 1 } }}>
                    {/* <Button
                        variant='outlined'
                        color='neutral'
                        startDecorator={<i data-feather='download-cloud' />}
                    >
                        Download PDF
                    </Button> */}
                    <Button
                        variant='outlined'
                        color='neutral'
                        onClick={() => setOpen(true)}
                        startDecorator={<i data-feather='table' />}
                    >
                        Загрузить CSV
                    </Button>
                </Box>
            </Box>
            <OrderTable />
            <Modal
                aria-labelledby='modal-title'
                aria-describedby='modal-desc'
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant='outlined'
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose
                        variant='outlined'
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Typography
                        component='h2'
                        id='modal-title'
                        level='h4'
                        textColor='inherit'
                        fontWeight='lg'
                        mb={1}
                    >
                        Загрузить файл
                    </Typography>
                    <Typography id='modal-desc' textColor='text.tertiary'>
                        Загрузка
                    </Typography>
                </Sheet>
            </Modal>
        </>
    );
}
