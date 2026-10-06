import React from 'react'
import {useAuth} from '../context/AuthContext.jsx'
import { Outlet } from 'react-router-dom';

function ProtectedLayout() {
    const {user} = useAuth();

    return (
    user ? <Outlet/> : <div>You are not authorized to view this page. Please log in.</div>
  )
}

export default ProtectedLayout