import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signin from './Authentication/Signin'
import Signup from './Authentication/Signup'
import Otp from './Authentication/Otp'
import ForgotPassword from './Authentication/ForgotPassword'
import {
  AdminDashboardPrivateRoute,
  AuthPrivateRoute,
  SuperAdminDashboardPrivateRoute,
} from './Authentication/PrivateRoute'
import AdminDashboardLayout from './Layout/AdminDashboardLayout'
import ErrorNotFound from './ErrorNotFound'
import AuthLayout from './Layout/AuthLayout'
import AdminHomeDashboard, {
  loader as dashboardLoader,
} from './Dashboard/Admin/AdminHomeDashboard'
import Vehicle from './Dashboard/Admin/Vehicle'
import Operator from './Dashboard/Admin/Operator'
import Customer from './Dashboard/Admin/Customer'
import WorkReport from './Dashboard/Admin/WorkReport'
import Devices from './Dashboard/Admin/Devices'
import ChargeSetting from './Dashboard/Admin/ChargeSetting'
import ErrorElement from './ErrorNotFound/ErrorElement'
import Profile from './Authentication/Profile'
import SuperAdminDashboardLayout from './Layout/SuperAdminDashboardLayout'
import SuperAdminHomeDashboard from './Dashboard/SuperAdmin/SuperAdminHomeDashboard'

const router = createBrowserRouter([
  {
    errorElement: <ErrorElement />,
    element: <AuthPrivateRoute />,
    children: [
      {
        errorElement: <ErrorElement />,
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            errorElement: <ErrorElement />,
            index: true,
            element: <Signin />,
          },
          {
            errorElement: <ErrorElement />,
            path: 'signup',
            element: <Signup />,
          },
          {
            errorElement: <ErrorElement />,
            path: 'otp',
            element: <Otp />,
          },
          {
            errorElement: <ErrorElement />,
            path: 'forgot_password',
            element: <ForgotPassword />,
          },
        ],
      },
    ],
  },
  {
    element: <AdminDashboardPrivateRoute />,
    children: [
      {
        errorElement: <ErrorElement />,
        path: '/admin_dashboard',
        element: <AdminDashboardLayout />,
        children: [
          {
            index: true,
            element: <AdminHomeDashboard />,
            loader: dashboardLoader,
          },
          {
            path: 'vehicle_details',
            element: <Vehicle />,
          },
          {
            path: 'operator_details',
            element: <Operator />,
          },
          {
            path: 'customer_details',
            element: <Customer />,
          },
          {
            path: 'work_report',
            element: <WorkReport />,
          },
          {
            path: 'device_details',
            element: <Devices />,
          },
          {
            path: 'charge_setting_details',
            element: <ChargeSetting />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    element: <SuperAdminDashboardPrivateRoute />,
    children: [
      {
        errorElement: <ErrorElement />,
        path: '/superadmin_dashboard/admin_details',
        element: <SuperAdminDashboardLayout />,
        children: [{ index: true, element: <SuperAdminHomeDashboard /> }],
      },
    ],
  },
  {
    path: '*',
    element: <ErrorNotFound />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
