import { useFormik } from 'formik'
import React from 'react'
import { Table } from 'react-bootstrap'
import classes from './Admin.module.css'
import * as Yup from 'yup'
import { NAME_REGEX } from '../../Utilities/Constants'
import dayjs from 'dayjs'

const wrokReportSchema = Yup.object({
  customer_name: Yup.string().matches(NAME_REGEX, 'Enter valid customer name'),
  operator_name: Yup.string().matches(NAME_REGEX, 'Enter valid operator name'),
  vehicle_name: Yup.string().matches(NAME_REGEX, 'Enter valid vehicle name'),
})

export default function WorkReport() {
  const maxDate = new Date()
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      customer_name: '',
      operator_name: '',
      vehicle_name: '',
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
      <div className="row">

        <div className="col-md-4 col-lg-3 col-sm-6 col-12 my-2">
          <p className={classes.label}>Customer Name</p>
          <input
            name="customer_name"
            className={classes.input}
            placeholder="Enter customer name"
            onChange={handleChange}
            value={values.customer_name}
            maxLength="15"
          />
          {touched.customer_name && errors.customer_name && (
            <p className="inputErrorTxt">{errors.customer_name}</p>
          )}
        </div>

        <div className="col-md-4 col-lg-3 col-sm-6 col-12 my-2">
          <p className={classes.label}>Operator Name</p>
          <input
            name="operator_name"
            className={classes.input}
            placeholder="Enter operator name"
            onChange={handleChange}
            value={values.operator_name}
            maxLength="15"
          />
          {touched.operator_name && errors.operator_name && (
            <p className="inputErrorTxt">{errors.operator_name}</p>
          )}
        </div>

        <div className="col-md-4 col-lg-3 col-sm-6 col-12 my-2">
          <p className={classes.label}>Vehicle Name</p>
          <input
            name="vehicle_name"
            className={classes.input}
            placeholder="Enter vehicle name"
            onChange={handleChange}
            value={values.vehicle_name}
            maxLength="15"
          />
          {touched.vehicle_name && errors.vehicle_name && (
            <p className="inputErrorTxt">{errors.vehicle_name}</p>
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
        <div className="col-md-9 d-flex justify-content-end align-items-center">
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
    </>
  )
}
