import Login from '../pages/Login/Login';
import React from 'react';
import Home from '../pages/Home/Home';
import Map from '../pages/Map/Map';

export interface IRoute {
    path: string;
    element: React.ComponentType;
}

export enum authRouteNames {
    HOME = '/home',
    MAP = '/map',
}

export enum nonAuthRouteNames {
    LOGIN = '/login',
    MAP = '/map',
}

export const authRoutes: IRoute[] = [
    { path: authRouteNames.HOME, element: Home },
    { path: authRouteNames.MAP, element: Map },
];

export const nonAuthRoutes: IRoute[] = [{ path: nonAuthRouteNames.LOGIN, element: Login }];
