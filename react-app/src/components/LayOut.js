import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './NavBar/NavBar'
import { Grid } from '@mui/material'
import axios from 'axios'
import { Navigate,useNavigate } from 'react-router-dom'

const LayOut = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const token = localStorage.getItem('token')
  useEffect(()=>{
    if(!token)navigate('/login-signup')
    if(location.pathname == "/")navigate('/transaction')
  },[token])
  return (<>
    <div style={{ display: 'flex', marginLeft: "-20px", marginTop: "70px" }}>

      <NavBar />
      <Outlet />
    </div>

  </>)
}

export default LayOut