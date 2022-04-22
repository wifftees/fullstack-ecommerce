import { lazy, LazyExoticComponent } from 'react';

export type Route = {
    path: string;
    Element: LazyExoticComponent<() => JSX.Element>;
};

const Auth = lazy(() => import('../pages/auth/AuthPage'));
const Admin = lazy(() => import('../pages/admin/AdminPage'));
const Basket = lazy(() => import('../pages/basket/BasketPage'));
const Device = lazy(() => import('../pages/device/DevicePage'));
const Shop = lazy(() => import('../pages/shop/ShopPage'));

export const publicRoutes: Route[] = [
    {
        path: '/login',
        Element: Auth
    },
    {
        path: '/register',
        Element: Auth
    },
    {
        path: '/devices/:id',
        Element: Device
    },
    {
        path: '/shop',
        Element: Shop
    }
];

export const authRoutes: Route[] = [
    {
        path: '/admin',
        Element: Admin
    },
    {
        path: '/basket',
        Element: Basket
    }
];
