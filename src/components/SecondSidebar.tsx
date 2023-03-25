import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { closeSidebar } from '../utils';

import './SeconSidebar.scss';
import { Link } from 'react-router-dom';

export default function SecondSidebar() {
    return (
        <React.Fragment>
            <Box
                className='SecondSidebar-overlay'
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    bgcolor: 'background.body',
                    opacity: 'calc(var(--SideNavigation-slideIn, 0) - 0.2)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => closeSidebar()}
            />
            <Sheet
                className='SecondSidebar SecondSidebar_mark'
                sx={{
                    position: {
                        xs: 'fixed',
                        lg: 'sticky',
                    },
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
                        lg: 'none',
                    },
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    transition: 'transform 0.4s',
                    zIndex: 9999,
                    height: '100dvh',
                    top: 0,
                    p: 2,
                    py: 3,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <List
                    sx={{
                        '--ListItem-radius': '8px',
                        '--ListItem-minHeight': '32px',
                        '--List-gap': '4px',
                    }}
                >
                    {/* <ListSubheader role='presentation' sx={{ color: 'text.primary' }}>
                        Dashboard
                    </ListSubheader> */}
                    <Link to={'/home'} style={{ textDecoration: 'none' }}>
                        <ListItem>
                            <ListItemButton selected variant='soft' onClick={() => closeSidebar()}>
                                <ListItemDecorator>
                                    <i data-feather='activity' />
                                </ListItemDecorator>
                                <ListItemContent>Таблица товаров</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={'/map'} style={{ textDecoration: 'none' }}>
                        <ListItem>
                            <ListItemButton onClick={() => closeSidebar()}>
                                <ListItemDecorator>
                                    <i data-feather='bell' />
                                </ListItemDecorator>
                                <ListItemContent>Карта</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <ListItem>
                        <ListItemButton onClick={() => closeSidebar()}>
                            <ListItemDecorator>
                                <i data-feather='bar-chart' />
                            </ListItemDecorator>
                            <ListItemContent>Предикт</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Sheet>
        </React.Fragment>
    );
}