import React from 'react';
import { Routes, Route, Navigate, BrowserRouter, Link, useRoutes } from 'react-router-dom';
import { authRouteNames, authRoutes, nonAuthRoutes, nonAuthRouteNames } from './router';

import './App.scss';

import { useStores } from './hooks/useStores';
import Home from './pages/Home/Home';
import { observer } from 'mobx-react-lite';
import { useAuth } from './hooks/auth.hook';
import Login from './pages/Login/Login';
import Layout from './components/layouts/Layout';
import {
    Avatar,
    AvatarGroup,
    CssBaseline,
    CssVarsProvider,
    GlobalStyles,
    IconButton,
    Typography,
} from '@mui/joy';
import { Box, Container } from '@mui/system';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import MenuIcon from '@mui/icons-material/Menu';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import { Icon } from '@mui/material';
import SecondSidebar from './components/SecondSidebar';
import Header from './components/Header';

import customTheme from './theme';
import CleanDashboard from './pages/CleanDashboard/CleanDashboard';

// import logo from './assets/img/cz-logo.svg';
import bregman from './assets/img/bregman.png';
import SimpleChart from './components/charts/SimpleChart';
const logo: string = require('./assets/img/cz-logo.svg').default;

const App: React.FC = observer(() => {
    const { operatorStore } = useStores();
    const { login, logout, token, userId, ready, email } = useAuth();
    console.log(token);

    const isAuthenticated = !!token;
    const routes = isAuthenticated ? authRoutes : nonAuthRoutes;
    const routeNames = isAuthenticated ? authRouteNames : nonAuthRouteNames;
    const defaultRouteName = isAuthenticated ? '/home' : '/login';

    console.log(routes);

    // React.useEffect(() => {
    //     operatorStore.fetchVolumeAggPredict(token);
    // }, [operatorStore, token]);
    return (
        <BrowserRouter>
            {isAuthenticated ? (
                <>
                    <div className='header'>
                        <Container fixed maxWidth='lg'>
                            <Layout.Header>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 1.5,
                                    }}
                                >
                                    {/* <Typography component='h1' fontWeight='xl'>
                                        Честный знак
                                    </Typography> */}

                                    <img className='main-logo' alt='logo' src={logo} />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
                                    <div className='avatar-box'>
                                        <div className='name-pos'>
                                            <div className='name'>
                                                <Typography>Илья Брегман</Typography>
                                            </div>
                                            <div className='pos'>
                                                <Typography level='body3'>Честный знак</Typography>
                                            </div>
                                        </div>
                                        <Avatar
                                            style={{
                                                border: '2px solid gray',
                                            }}
                                            src={bregman}
                                        />
                                    </div>
                                </Box>
                            </Layout.Header>
                        </Container>
                    </div>
                    <Container fixed maxWidth='lg'>
                        <CssVarsProvider disableTransitionOnChange theme={customTheme}>
                            <GlobalStyles
                                styles={{
                                    '[data-feather], .feather': {
                                        color: 'var(--Icon-color)',
                                        margin: 'var(--Icon-margin)',
                                        fontSize: 'var(--Icon-fontSize, 20px)',
                                        width: '1em',
                                        height: '1em',
                                    },
                                }}
                            />
                            <CssBaseline />
                            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                                <Header />
                                {/* <FirstSidebar /> */}
                                <SecondSidebar />
                                <Box
                                    component='main'
                                    className='MainContent'
                                    sx={(theme) => ({
                                        px: {
                                            xs: 2,
                                            md: 6,
                                        },
                                        pt: {
                                            xs: `calc(${theme.spacing(2)} + var(--Header-height))`,
                                            sm: `calc(${theme.spacing(2)} + var(--Header-height))`,
                                            md: 3,
                                        },
                                        pb: {
                                            xs: 2,
                                            sm: 2,
                                            md: 3,
                                        },
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        minWidth: 0,
                                        height: '100dvh',
                                        gap: 1,
                                    })}
                                >
                                    <Routes>
                                        {routes.map((route, index) => (
                                            <Route
                                                key={index + route.path}
                                                path={route.path}
                                                element={<route.element />}
                                            />
                                        ))}
                                        <Route
                                            path='*'
                                            element={<Navigate to={defaultRouteName} replace />}
                                        />
                                    </Routes>
                                </Box>
                            </Box>
                        </CssVarsProvider>
                    </Container>
                </>
            ) : (
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={index + route.path}
                            path={route.path}
                            element={<route.element />}
                        />
                    ))}
                    <Route path='*' element={<Navigate to={defaultRouteName} replace />} />
                </Routes>
            )}
        </BrowserRouter>
    );
});

export default App;
