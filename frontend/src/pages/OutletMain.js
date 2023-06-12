import React, { useEffect } from 'react'
import Header from '../components/header'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Notification from '../components/notifications';

function OutletMain() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const navigateHome = () => { if (pathname === '/') navigate('/home') };
    useEffect(navigateHome, [navigate, pathname]);
    return (
        <>
            <Header />
            <Notification/>
            <Outlet />
        </>
    )
}

export default OutletMain