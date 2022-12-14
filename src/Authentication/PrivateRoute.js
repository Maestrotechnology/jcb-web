import { Navigate, Outlet } from 'react-router-dom'
import { getCookie } from '../Utilities/Cookies'

export const AuthPrivateRoute = () => {
  let isAdminOrOperator = getCookie('jcbLoginData')
    ? JSON.parse(getCookie('jcbLoginData'))
    : null
  return getCookie('jcbLoginData') !== '' ? (
    <Navigate
      to={
        parseInt(isAdminOrOperator?.user_type) === 2
          ? '/admin_dashboard'
          : parseInt(isAdminOrOperator?.user_type) === 1
          ? '/superadmin_dashboard'
          : '/'
      }
    />
  ) : (
    <Outlet />
  )
}
export const AdminDashboardPrivateRoute = () => {
  return getCookie('jcbLoginData') === '' ? <Navigate to="/" /> : <Outlet />
}

export const SuperAdminDashboardPrivateRoute = () => {
  return getCookie('jcbLoginData') === '' ? <Navigate to="/" /> : <Outlet />
}
