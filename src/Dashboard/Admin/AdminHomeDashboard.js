import React from 'react'
import classes from './Admin.module.css'
import { dashboardService } from '../../Services/Services'
import { useLoaderData, useNavigate } from 'react-router-dom'
import VehicleImage from '../../Assets/Icons/vehicle.png'
import OperatorImage from '../../Assets/Icons/operator.png'
import CustomeImage from '../../Assets/Icons/customer.png'
import WorkReportImage from '../../Assets/Icons/work_report.png'
export default function AdminHomeDashboard() {
  const { data } = useLoaderData()
  const navigate = useNavigate()

  const dashboardData = [
    {
      id: 1,
      name: `Vehicle - ${data?.vehicle || 0}`,
      navigatePath: '/admin_dashboard/vehicle_details',
      img: VehicleImage,
      alt_text: 'vehicle image',
    },
    {
      id: 2,
      name: `operator - ${data?.operator || 0}`,
      navigatePath: '/admin_dashboard/operator_details',
      img: OperatorImage,
      alt_text: 'operator image',
    },
    {
      id: 3,
      name: `Devices - ${data?.device_count || 0}`,
      navigatePath: '/admin_dashboard/device_details',
      img: CustomeImage,
      alt_text: 'device image',
    },
  ]

  return (
    <div className="row col-md-12 pb-4">
      {dashboardData.map(ele => (
        <div
          className={classes.contain + ' col-xl-3 col-lg-4 col-sm-6 col-12'}
          key={ele.id}
          onClick={() => navigate(ele.navigatePath)}
        >
          <div className={classes.container}>
            <div className={classes.imgContainer}>
              <img src={ele.img} alt={ele.alt_text} />
            </div>
            <p className={classes.dashboardTitle}>{ele.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function loader() {
  return dashboardService()
}
