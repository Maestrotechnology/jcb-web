import React, { useState } from 'react'
import UserLogo from '../Assets/Icons/dashboard.png'
import classes from './Layout.module.css'
import { useSelector } from 'react-redux'
import LogoutConfirmationModal from '../ModalComponents/LogoutConfirmationModal'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import LogoutImage from '../Assets/Icons/logout_icon.png'
export default function SuperAdminDashboardLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { loginUserData } = useSelector(state => state.auth)
  const [isLogout, setIsLogout] = useState(false)

  const navigationMenuData = [
    {
      id: 1,
      name: 'Customer',
      navigationPath: '/superadmin_dashboard',
      img: UserLogo,
      altTxt: 'dashboard',
    },
    {
      id: 2,
      name: 'Device',
      navigationPath: '/superadmin_dashboard/devices',
      img: UserLogo,
      altTxt: 'device',
    },
  ]

  return (
    <div className={classes.superadminContainer}>
      {isLogout ? (
        <LogoutConfirmationModal
          show={isLogout}
          close={() => setIsLogout(false)}
        />
      ) : null}

      <div className={classes.superadminLeftContainer}>
        <div className={classes.superAdminProfileImgContainer}>
          <img
            src="https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=1600"
            className={classes.superAdminProfieImg}
            alt="user"
          />
          <p className={classes.superAdminProfileTxt}>User name</p>
        </div>

        <div className={classes.superAdminMenuLinkContainer}>
          {navigationMenuData.map(ele => (
            <p
              className={classes.superAdminMenuLinks}
              style={{
                backgroundColor:
                  ele.navigationPath === pathname ? '#fff' : '#ffca00',
              }}
              onClick={() => {
                navigate(ele.navigationPath)
              }}
            >
              <img
                src={ele.img}
                alt={ele.altTxt}
                className={classes.superAdminMenuLinkIcons}
              />
              {ele.name}
            </p>
          ))}
        </div>
        <p
          className={classes.logoutTxt}
          onClick={() => {
            setIsLogout(true)
          }}
        >
          <img src={LogoutImage} alt="logout" className={classes.logoutImg} />
          Logout
        </p>
      </div>
      <div className={classes.superadminRightContainer}>
        <Outlet />
      </div>
    </div>
  )
}
