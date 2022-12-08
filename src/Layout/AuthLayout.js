import React from 'react'
import classes from './Layout.module.css'
import LoginImage from '../Assets/Images/Login.svg'
import ForgotPasswordImage from '../Assets/Images/Forgot_password.svg'
import { Outlet, useLocation } from 'react-router-dom'
export default function AuthLayout() {
  const { pathname } = useLocation()
  return (
    <div className={classes.container}>
      <div className={classes.leftContainer}>
        <img src={pathname === "/" ? LoginImage : ForgotPasswordImage} className="img-fluid" alt="login logo" />
      </div>
      <div className={classes.rightContainer}>
        <Outlet />
      </div>
    </div>
  )
}
