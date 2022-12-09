import React, { useState } from 'react'
import HeaderLogo from '../Assets/Images/header_logo.png'
import UserLogo from '../Assets/Icons/dashboard.png'
import classes from './Layout.module.css'
import { Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import LogoutConfirmationModal from '../ModalComponents/LogoutConfirmationModal'
import { Link, Outlet, useLocation } from 'react-router-dom'
export default function SuperAdminDashboardLayout() {
  const { pathname } = useLocation()
  const { loginUserData } = useSelector(state => state.auth)
  const [isLogout, setIsLogout] = useState(false)
  return (
    <div className={classes.superadminContainer}>
      {isLogout ? (
        <LogoutConfirmationModal
          show={isLogout}
          close={() => setIsLogout(false)}
        />
      ) : null}
      <div className={classes.superAdminLogoContainer}>
        <img src={HeaderLogo} alt="header logo" className={classes.img} />
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              <img
                className={classes.user_img}
                src={UserLogo}
                alt="user_logo"
              />
              <span className="ms-2 me-1">{loginUserData?.name || 'User'}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Change password</Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setIsLogout(true)
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className={classes.superAdminLinkContainer}>
        <Link
          className={classes.superAdminLink}
          style={{
            color:
              pathname === '/superadmin_dashboard/admin_details'
                ? '#ec9b00'
                : '#000',
          }}
          to="/superadmin_dashboard/admin_details"
        >
          Admin
        </Link>
      </div>
      <Outlet />
    </div>
  )
}
