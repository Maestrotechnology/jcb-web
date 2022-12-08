import { Navigate, Outlet } from 'react-router-dom'
import { getCookie } from '../Utilities/Cookies'

export const AuthPrivateRoute = () => {
  let isAdminOrOperator = getCookie('loginData') ? JSON.parse(getCookie('loginData')) : null
  return getCookie('loginData') !== '' ? (
    <Navigate
      to={
        parseInt(isAdminOrOperator?.user_type) === 2
          ? '/admin_dashboard'
          : '/operator_dashboard'
      }
    />
  ) : (
    <Outlet />
  )
}
export const AdminDashboardPrivateRoute = () => {
  return getCookie('loginData') === "" ? <Navigate to="/" /> : <Outlet />
}

export const OperatorDashboardPrivateRoute = () => {
  return getCookie('loginData') === "" ? <Navigate to="/" /> : <Outlet />
}
