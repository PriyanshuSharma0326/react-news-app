import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar.component';

function SharedLayout() {
    return (
        <>
            <Navbar />

            <Outlet />
        </>
    )
}

export default SharedLayout;
