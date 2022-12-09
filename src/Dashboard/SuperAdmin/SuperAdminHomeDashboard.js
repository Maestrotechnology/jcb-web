import React from 'react'
import { Table } from 'react-bootstrap'
import classes from './SuperAdmin.module.css'
export default function SuperAdminHomeDashboard() {
  return (
    <>
      <div className={classes.conatiner}>
        <p className={classes.title}>Admin</p>
        <Table striped bordered hover responsive className="mt-4">
          <thead className={classes.tableResponsive}>
            <tr className="text-center">
              <th>S.No</th>
              <th>Date</th>
              <th>Vehicle</th>
              <th>Operator</th>
              <th>Customer</th>
              <th>Duration</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className={classes.tableBody}>
            {/* <tr className="text-center">
            <td>1</td>
            <td>test</td>
            <td>JCB</td>
            <td>test</td>
            <td>12-11-22</td>
            <td>1000</td>
            <td>3000</td>
          </tr> */}
            <tr>
              <td colSpan="7" className="text-center">
                No Data Found
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  )
}
