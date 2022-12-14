import './App.css'
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from 'react-router-dom'
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
import SuperAdminDevice from './Dashboard/SuperAdmin/SuperAdminDevice'
import ChangePassword from './Authentication/ChangePassword'

const routes = [
  {
    errorElement: <ErrorElement />,
    element: <AuthPrivateRoute />,
    children: [
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Signin />,
          },
          {
            path: 'signup',
            element: <Signup />,
          },
          {
            path: 'otp',
            element: <Otp />,
          },
          {
            path: 'forgot_password',
            element: <ForgotPassword />,
          },
          {
            path: 'change_password',
            element: <ChangePassword />,
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
        path: '/superadmin_dashboard',
        element: <SuperAdminDashboardLayout />,
        children: [
          { index: true, element: <SuperAdminHomeDashboard /> },
          { path: 'devices', element: <SuperAdminDevice /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <ErrorNotFound />,
  },
]

const router = createBrowserRouter(routes, { basename: '' })

function App() {
  return <RouterProvider router={router} />
}

export default App
