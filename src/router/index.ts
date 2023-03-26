import Login from '../pages/Login/Login';
import React from 'react';
import Home from '../pages/Home/Home';
import Map from '../pages/Map/Map';
import ProductWay from '../pages/ProductWay/ProductWay';

export interface IRoute {
    path: string;
    element: React.ComponentType;
}

export enum authRouteNames {
    HOME = '/home',
    MAP = '/map',
    PRODUCT_WAY = '/product-way',
}

export enum nonAuthRouteNames {
    LOGIN = '/login',
}

export const authRoutes: IRoute[] = [
    { path: authRouteNames.HOME, element: Home },
    { path: authRouteNames.MAP, element: Map },
    { path: authRouteNames.PRODUCT_WAY, element: ProductWay },
];

export const nonAuthRoutes: IRoute[] = [{ path: nonAuthRouteNames.LOGIN, element: Login }];
