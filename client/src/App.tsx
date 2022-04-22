import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter/AppRouter';
import Navbar from './components/Navbar/Navbar';

function App() {
    return (
        <Suspense fallback={<div />}>
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
