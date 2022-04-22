import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../../constants/routes';

export default function AppRouter() {
    const user = {
        isAuth: true
    };
    return (
        <Routes>
            {user.isAuth &&
                authRoutes.map(({ path, Element }) => (
                    <Route key={path} path={path} element={<Element />} />
                ))}
            {publicRoutes.map(({ path, Element }) => (
                <Route key={path} path={path} element={<Element />} />
            ))}
            <Route path="*" element={<Navigate to="/shop" replace />} />
        </Routes>
    );
}
