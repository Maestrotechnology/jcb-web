import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import classes from './SuperAdmin.module.css'
import * as Yup from 'yup'
import { MOBILE_REGEX, NAME_REGEX } from '../../Utilities/Constants'
import { useFormik } from 'formik'
import { listCompanyAdminService } from '../../Services/Services'
import toast from 'react-hot-toast'
import AddSuperAdminCustomerModal from '../../ModalComponents/AddSuperAdminCustomerModal'

const wrokReportSchema = Yup.object({
  customer_name: Yup.string().matches(NAME_REGEX, 'Enter valid customer name'),
  mobile_no: Yup.string().matches(MOBILE_REGEX, 'Enter valid mobile number'),
})

export default function SuperAdminHomeDashboard() {
  useEffect(() => {
    handleListCustomer()
  }, [])

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      customer_name: '',
      mobile_no: '',
      isLoader: false,
      isAddCustomer: false,
    },
    validationSchema: wrokReportSchema,
    onSubmit: values => {
      handleListCustomer(values)
    },
  })

  const handleListCustomer = (data, PageNum = 1) => {
    setFieldValue('isLoader', true)
    let formData = new FormData()
    formData.append('customer_name', data?.customer_name)
    formData.append('mobile_no', data?.mobile_no)
    listCompanyAdminService(formData, PageNum)
      .then(res => {
        console.log(res.data, '==response')
      })
      .catch(err => {
        if (err?.response?.data?.detail) {
          toast(err.response.data.detail[0].msg, { type: 'error' })
        } else {
          toast('Something went wrong!!', { type: 'error' })
        }
      })
      .finally(() => setFieldValue('isLoader', false))
  }
  return (
    <>
      {values.isAddCustomer ? (
        <AddSuperAdminCustomerModal
          show={values.isAddCustomer}
          close={() => {
            setFieldValue('isAddCustomer', false)
          }}
        />
      ) : null}
      <div className={classes.conatiner}>
        <p className={classes.title}>Customer</p>
        <div className="row">
          <div className="col-md-4 col-lg-3 col-sm-6 col-12 my-2">
            <p className={classes.label}>Customer Name</p>
            <input
              name="customer_name"
              className={classes.input}
              placeholder="Enter customer name"
              onChange={handleChange}
              value={values.customer_name}
              maxLength="25"
            />
            {touched.customer_name && errors.customer_name && (
              <p className="inputErrorTxt">{errors.customer_name}</p>
            )}
          </div>

          <div className="col-md-4 col-lg-3 col-sm-6 col-12 my-2">
            <p className={classes.label}>Mobile No</p>
            <input
              name="mobile_no"
              className={classes.input}
              placeholder="Enter mobile no"
              onChange={handleChange}
              value={values.mobile_no}
              maxLength="10"
              onKeyPress={e => {
                if (e.key === '0' || parseInt(e.key)) {
                } else {
                  e.preventDefault()
                }
              }}
            />
            {touched.mobile_no && errors.mobile_no && (
              <p className="inputErrorTxt">{errors.mobile_no}</p>
            )}
          </div>

          <div className="col-md-12 d-flex justify-content-end align-items-center my-2">
            <button className="cancelBtn" onClick={resetForm}>
              Reset
            </button>
            <button className="saveBtn" onClick={handleSubmit}>
              Search
            </button>
            <button
              className={classes.addCustomerBtn}
              onClick={() => {
                setFieldValue('isAddCustomer', true)
              }}
            >
              Add
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
