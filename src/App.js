import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signin from './Authentication/Signin'
import Signup from './Authentication/Signup'
import Otp from './Authentication/Otp'
import ForgotPassword from './Authentication/ForgotPassword'
import {
  AdminDashboardPrivateRoute,
  AuthPrivateRoute,
  OperatorDashboardPrivateRoute,
} from './Authentication/PrivateRoute'
import AdminDashboardLayout from './Layout/AdminDashboardLayout'
import OperatorDashboardLayout from './Layout/OperatorDashboardLayout'
import ErrorNotFound from './ErrorNotFound'
import AuthLayout from './Layout/AuthLayout'
import AdminHomeDashboard, {
  loader as dashboardLoader,
} from './Dashboard/Admin/AdminHomeDashboard'
import OperatorHomeDashboard from './Dashboard/Operator/OperatorHomeDashboard'
import Vehicle from './Dashboard/Admin/Vehicle'
import Operator from './Dashboard/Admin/Operator'
import Customer from './Dashboard/Admin/Customer'
import WorkReport from './Dashboard/Admin/WorkReport'
import Devices from './Dashboard/Admin/Devices'
import ChargeSetting from './Dashboard/Admin/ChargeSetting'
import ErrorElement from './ErrorNotFound/ErrorElement'
import Profile from './Authentication/Profile'

const router = createBrowserRouter([
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
    element: <OperatorDashboardPrivateRoute />,
    children: [
      {
        path: '/operator_dashboard',
        element: <OperatorDashboardLayout />,
        children: [{ index: true, element: <OperatorHomeDashboard /> }],
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
