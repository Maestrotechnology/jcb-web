import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import classes from './Layout.module.css'
import UserImage from '../Assets/Icons/user_profile.png'
import LogoutImage from '../Assets/Icons/logout_icon.png'
import DashboardImage from '../Assets/Icons/dashboard.svg'
import VehicleImage from '../Assets/Icons/vehicle.png'
import OperatorImage from '../Assets/Icons/operator.png'
import CustomeImage from '../Assets/Icons/customer.png'
import WorkReportImage from '../Assets/Icons/work_report.png'
import SearchImage from '../Assets/Icons/search.png'
import ChargeSettingImage from '../Assets/Icons/charge_setting.svg'
import DeviceImage from '../Assets/Icons/devices.svg'
import toggle from '../Assets/Icons/toggler1.png'
import { Dropdown, Offcanvas } from 'react-bootstrap'
import LogoutConfirmationModal from '../ModalComponents/LogoutConfirmationModal'
import Loader from '../Loader'
import { viewProfileService } from '../Services/Services'
import { handleUserData } from '../Store/Reducers/AuthReducer'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
export default function AdminDashboardLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchData, setSearchData] = useState({
    refSearch: '',
    search: '',
  })
  const [isAddModal, setIsAddModal] = useState({
    isShowModal: false,
    name: '',
  })
  const [isLogout, setIsLogout] = useState(false)
  const [isLoader, setIsLoader] = useState(false)
  const [userName, setUserName] = useState('')

  const [toggler, settoggler] = useState(false)
  const navigationData = [
    {
      id: 1,
      name: 'Dashboard',
      icon: DashboardImage,
      navigatePath: '/admin_dashboard',
    },
    {
      id: 2,
      name: 'Vehicle',
      icon: VehicleImage,
      navigatePath: '/admin_dashboard/vehicle_details',
    },
    {
      id: 3,
      name: 'Operator',
      icon: OperatorImage,
      navigatePath: '/admin_dashboard/operator_details',
    },
    {
      id: 4,
      name: 'Customer',
      icon: CustomeImage,
      navigatePath: '/admin_dashboard/customer_details',
    },
    {
      id: 5,
      name: 'Devices',
      icon: DeviceImage,
      navigatePath: '/admin_dashboard/device_details',
    },
    {
      id: 6,
      name: 'Work report',
      icon: WorkReportImage,
      navigatePath: '/admin_dashboard/work_report',
    },
    {
      id: 7,
      name: 'Charge Setting',
      icon: ChargeSettingImage,
      navigatePath: '/admin_dashboard/charge_setting_details',
    },
  ]

  useEffect(() => {
    handleGetProfileInfo()
  }, [])

  const handleGetProfileInfo = () => {
    setIsLoader(true)
    viewProfileService()
      .then(({ data }) => {
        dispatch(handleUserData(data))
        setUserName(data?.name)
      })
      .catch(err => {
        if (err?.response?.data?.detail) {
          toast(err.response.data.detail[0].msg, { type: 'error' })
        } else {
          toast('Something went wrong!!', { type: 'error' })
        }
      })
      .finally(() => setIsLoader(false))
  }

  const handleClose = () => settoggler(false)

  return (
    <>
      <Loader isLoader={isLoader} />
      {isLogout ? (
        <LogoutConfirmationModal
          show={isLogout}
          close={() => setIsLogout(false)}
        />
      ) : null}
      <div className={classes.adminContainer}>
        <div className={classes.adminLeftContainer}>
          <div className={classes.adminChildLeftConatiner}>
            <div className={classes.adminInnerLeftContainer}>
              {navigationData?.map(ele => (
                <div
                  key={ele.id}
                  className={classes.link}
                  style={{
                    backgroundColor:
                      pathname === ele.navigatePath ? '#fff' : null,
                  }}
                  onClick={() => {
                    navigate(ele.navigatePath)
                  }}
                >
                  <img
                    src={ele.icon}
                    alt={ele.name}
                    className={classes.menuIcon}
                  />
                  <span className="ms-2">{ele.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.adminRightContainer}>
          <div className={classes.stickyContainer}>
            <div className={classes.profileImgContainer}>
              <img
                onClick={() => {
                  settoggler(pre => !pre)
                }}
                className={classes.Toggle}
                src={toggle}
                alt="profile"
              />

              <Offcanvas
                navigationData={navigationData}
                show={toggler}
                onHide={handleClose}
              >
                <Offcanvas.Body>
                  <div className={classes.adminLeftContainer1}>
                    <div className={classes.adminChildLeftConatiner1}>
                      <div
                        onClick={() => {
                          settoggler(pre => !pre)
                        }}
                        className={classes.canvasClose}
                      >
                        <button>X</button>
                      </div>

                      <div className={classes.adminInnerLeftContainer1}>
                        {navigationData?.map(ele => (
                          <div
                            key={ele.id}
                            className={classes.link}
                            style={{
                              backgroundColor:
                                pathname === ele.navigatePath ? '#fff' : null,
                            }}
                            onClick={() => {
                              navigate(ele.navigatePath)
                              settoggler(pre => !pre)
                            }}
                          >
                            <img
                              src={ele.icon}
                              alt={ele.name}
                              className={classes.menuIcon}
                            />
                            <span className="ms-2">{ele.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>

              <div className={classes.profileImgOuterBorder}>
                <Dropdown
                  onSelect={e => {
                    if (e === 'profile') {
                      navigate('/admin_dashboard/profile')
                    } else if (e === 'logout') {
                      setIsLogout(true)
                    }
                  }}
                >
                  <Dropdown.Toggle variant="white">
                    <img
                      className={classes.profileImg}
                      src={UserImage}
                      alt="profile"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      className="text-center d-flex justify-content-center"
                      eventKey="profile"
                    >
                      <img
                        src={UserImage}
                        className={classes.menuIcon + ' me-1'}
                        alt="logout_image"
                      />
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="text-center d-flex justify-content-center"
                      eventKey="logout"
                    >
                      <img
                        src={LogoutImage}
                        className={classes.menuIcon + ' me-1'}
                        alt="logout_image"
                      />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className={classes.titleContainer}>
              <p className={classes.title}>
                {pathname === '/admin_dashboard'
                  ? 'Welcome, '
                  : pathname === '/admin_dashboard/vehicle_details'
                  ? 'Vehicle'
                  : pathname === '/admin_dashboard/operator_details'
                  ? 'Operator'
                  : pathname === '/admin_dashboard/customer_details'
                  ? 'Customer'
                  : pathname === '/admin_dashboard/work_report'
                  ? 'Work Report'
                  : pathname === '/admin_dashboard/device_details'
                  ? 'Device'
                  : pathname === '/admin_dashboard/charge_setting_details'
                  ? 'Charge Setting'
                  : pathname === '/admin_dashboard/profile'
                  ? 'Profile'
                  : null}
                <span
                  className={classes.username}
                  style={{
                    display: pathname === '/admin_dashboard' ? null : 'none',
                  }}
                >
                  {userName || 'User'}
                </span>
              </p>
              {pathname === '/admin_dashboard/vehicle_details' ||
              pathname === '/admin_dashboard/operator_details' ||
              pathname === '/admin_dashboard/customer_details' ||
              pathname === '/admin_dashboard/device_details' ||
              pathname === '/admin_dashboard/charge_setting_details' ? (
                <div
                  className={classes.searchParentContainer}
                  style={{
                    justifyContent:
                      pathname === '/admin_dashboard/charge_setting_details'
                        ? 'flex-end'
                        : 'space-between',
                  }}
                >
                  <div
                    className={classes.searchContainer}
                    style={{
                      display:
                        pathname === '/admin_dashboard/charge_setting_details'
                          ? 'none'
                          : 'block',
                    }}
                  >
                    <input
                      className={classes.searchInput}
                      placeholder="Search here"
                      value={searchData.refSearch}
                      onChange={e => {
                        setSearchData(prev => {
                          return {
                            ...prev,
                            refSearch: e.target.value,
                          }
                        })
                      }}
                    />
                    <img
                      src={SearchImage}
                      onClick={() => {
                        setSearchData(prev => {
                          return {
                            search: searchData.refSearch,
                            refSearch: '',
                          }
                        })
                      }}
                      alt="search_image"
                      className={classes.searchIcon}
                    />
                  </div>
                  <button
                    className={classes.addBtn}
                    onClick={() => {
                      setIsAddModal(
                        pathname === '/admin_dashboard/vehicle_details'
                          ? { show: true, name: 'vehicle' }
                          : pathname === '/admin_dashboard/operator_details'
                          ? { show: true, name: 'operator' }
                          : pathname === '/admin_dashboard/customer_details'
                          ? { show: true, name: 'customer' }
                          : pathname === '/admin_dashboard/device_details'
                          ? { show: true, name: 'device' }
                          : pathname ===
                            '/admin_dashboard/charge_setting_details'
                          ? { show: true, name: 'charge_setting' }
                          : null
                      )
                    }}
                  >
                    Add
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <Outlet
            context={{
              searchData: searchData.search,
              isAddModal,
              setIsAddModal,
            }}
          />
        </div>
      </div>
    </>
  )
}
