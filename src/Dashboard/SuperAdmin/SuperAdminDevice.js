import React from 'react'
import { Table } from 'react-bootstrap'
import classes from './SuperAdmin.module.css'
import * as Yup from 'yup'
import { NAME_REGEX } from '../../Utilities/Constants'
import dayjs from 'dayjs'
import { useFormik } from 'formik'

const wrokReportSchema = Yup.object({
  device_name: Yup.string().matches(NAME_REGEX, 'Enter valid vehicle name'),
})

export default function SuperAdminDevice() {
  const maxDate = new Date()
  const { handleChange, handleSubmit, values, errors, touched, resetForm } =
    useFormik({
      initialValues: {
        device_name: '',
        fromDate: '',
        toDate: '',
      },
      validationSchema: wrokReportSchema,
      validate: () => {
        let err = {}
        if (Date.parse(values.fromDate) > Date.parse(values.toDate)) {
          err.toDate = 'To date must be before from date'
        }
        return err
      },
      onSubmit: values => {
        console.log(values, 'values')
      },
    })
  return (
    <>
      <div className={classes.conatiner}>
        <p className={classes.title}>Devices</p>
        <div className="row">
          <div className="col-md-4 col-lg-3 col-sm-6 col-12 my-2">
            <p className={classes.label}>Device Name</p>
            <input
              name="device_name"
              className={classes.input}
              placeholder="Enter device name"
              onChange={handleChange}
              value={values.device_name}
              maxLength="15"
            />
            {touched.device_name && errors.device_name && (
              <p className="inputErrorTxt">{errors.device_name}</p>
            )}
          </div>

          <div className="col-md-4 col-lg-3 col-sm-6 col-12 my-2">
            <p className={classes.label}>From Date</p>
            <input
              type="date"
              name="fromDate"
              className={classes.input}
              value={values.fromDate}
              onChange={handleChange}
              max={dayjs(maxDate).format('YYYY-MM-DD')}
            />
            {touched.fromDate && errors.fromDate && (
              <p className="inputErrorTxt">{errors.fromDate}</p>
            )}
          </div>

          <div className="col-md-4 col-lg-3 col-sm-6 col-12 my-2">
            <p className={classes.label}>To Date</p>
            <input
              type="date"
              name="toDate"
              className={classes.input}
              value={values.toDate}
              onChange={handleChange}
              max={dayjs(maxDate).format('YYYY-MM-DD')}
            />
            {touched.toDate && errors.toDate && (
              <p className="inputErrorTxt">{errors.toDate}</p>
            )}
          </div>
          <div className="col-md-12 my-2 d-flex justify-content-end align-items-center">
            <button className="cancelBtn" onClick={resetForm}>
              Reset
            </button>
            <button className="saveBtn" onClick={handleSubmit}>
              Search
            </button>
          </div>
        </div>
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
