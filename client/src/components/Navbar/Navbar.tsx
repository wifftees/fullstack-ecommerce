/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const user = {
        isAuth: true
    };
    const history = useNavigate();
    return (
        <div>
            <h1>Navbar</h1>
        </div>
    );
}
