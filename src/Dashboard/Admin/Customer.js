import React from 'react'
import { Table } from 'react-bootstrap'
import classes from './Admin.module.css'
export default function Customer() {
  return (
    <Table striped bordered responsive>
      <thead className={classes.tableResponsive}>
        <tr className="text-center">
          <th>S.No</th>
          <th>Date</th>
          <th>Customer Name</th>
          <th>Contact</th>
          <th>Duration</th>
          <th>Amount</th>
          <th>Collected Amount</th>
          <th>Address</th>
          <th>Action</th>
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
          <td colSpan="9" className="text-center">
            No Data Found
          </td>
        </tr>
      </tbody>
    </Table>
  )
}
