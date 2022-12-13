import React from 'react'
import { Modal } from 'react-bootstrap'
import classes from './Modal.module.css'
import CancelImage from '../Assets/Icons/rounded_cancel.png'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { createCompanyAdminService } from '../Services/Services'
import toast from 'react-hot-toast'
import {
  COMPANY_CODE_REGEX,
  EMAIL_REGEX,
  MOBILE_REGEX,
  NAME_REGEX,
} from '../Utilities/Constants'
const operatorSchema = Yup.object({
  customer_name: Yup.string()
    .matches(NAME_REGEX, 'Enter valid name')
    .required('Operator name is required'),
  company_code: Yup.string()
    .matches(COMPANY_CODE_REGEX, 'Enter valid company code')
    .required('Company code is required'),
  mobile_no: Yup.string()
    .matches(MOBILE_REGEX, 'Enter valid mobile number')
    .required('Mobile no is required'),
  address: Yup.string().required('Address is required'),
  email: Yup.string().matches(EMAIL_REGEX, 'Enter valid email'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
})

export default function AddSuperAdminCustomerModal({
  show,
  close,
  handleListCustomer,
}) {
  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } =
    useFormik({
      initialValues: {
        customer_name: '',
        company_code: '',
        mobile_no: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: '',
        isLoader: false,
      },
      validationSchema: operatorSchema,
      onSubmit: values => {
        handleCreateCustomer(values)
      },
    })

  const handleCreateCustomer = data => {
    setFieldValue('isLoader', true)
    let formData = new FormData()
    formData.append('customer_name', data.customer_name)
    formData.append('company_code', data.company_code)
    formData.append('mobile_no', data.mobile_no)
    formData.append('password', data.password)
    if (data.email) {
      formData.append('email', data.email)
    }
    formData.append('address', data.address)
    createCompanyAdminService(formData)
      .then(res => {
        toast(res.data, { type: 'success' })
        handleListCustomer()
        close()
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
    <Modal show={show} size="lg" centered>
      <Modal.Body>
        <div className={classes.titleContainer}>
          <p className={classes.title}>Customer</p>
          <img
            src={CancelImage}
            className={classes.cancelImage}
            onClick={close}
            alt="cancel icon"
          />
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 my-2">
            <p className={classes.label}>
              Customer Name <span className="inputErrorTxt mb-0">*</span>
            </p>
            <input
              name="customer_name"
              className={classes.input}
              placeholder="Enter customer name"
              onChange={handleChange}
              value={values.customer_name}
              maxLength="15"
            />
            {touched.customer_name && errors.customer_name && (
              <p className="inputErrorTxt mb-0">{errors.customer_name}</p>
            )}
          </div>
          <div className="col-md-6 col-sm-12 my-2">
            <p className={classes.label}>
              Company Code <span className="inputErrorTxt mb-0">*</span>
            </p>
            <input
              name="company_code"
              className={classes.input}
              placeholder="Enter company code"
              onChange={handleChange}
              value={values.company_code}
              maxLength="25"
            />
            {touched.company_code && errors.company_code && (
              <p className="inputErrorTxt mb-0">{errors.company_code}</p>
            )}
          </div>
          <div className="col-md-6 col-sm-12 my-2">
            <p className={classes.label}>
              Mobile number <span className="inputErrorTxt mb-0">*</span>
            </p>
            <input
              name="mobile_no"
              className={classes.input}
              placeholder="Enter mobile number"
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
              <p className="inputErrorTxt mb-0">{errors.mobile_no}</p>
            )}
          </div>
          <div className="col-md-6 col-sm-12 my-2">
            <p className={classes.label}>
              Address <span className="inputErrorTxt mb-0">*</span>
            </p>
            <input
              name="address"
              className={classes.input}
              placeholder="Enter your address"
              onChange={handleChange}
              value={values.address}
              maxLength="300"
            />
            {touched.address && errors.address && (
              <p className="inputErrorTxt mb-0">{errors.address}</p>
            )}
          </div>
          <div className="col-md-6 col-sm-12 my-2">
            <p className={classes.label}>Email</p>
            <input
              name="email"
              className={classes.input}
              placeholder="Enter your email"
              onChange={handleChange}
              value={values.email}
              maxLength="300"
            />
            {touched.email && errors.email && (
              <p className="inputErrorTxt mb-0">{errors.email}</p>
            )}
          </div>
          <div className="col-md-6 col-sm-12 my-2">
            <p className={classes.label}>
              Password <span className="inputErrorTxt mb-0">*</span>
            </p>
            <input
              name="password"
              className={classes.input}
              placeholder="Enter your password"
              onChange={handleChange}
              value={values.password}
              maxLength="300"
            />
            {touched.password && errors.password && (
              <p className="inputErrorTxt mb-0">{errors.password}</p>
            )}
          </div>
          <div className="col-md-6 col-sm-12 my-2">
            <p className={classes.label}>
              Confirm Password <span className="inputErrorTxt mb-0">*</span>
            </p>
            <input
              name="confirmPassword"
              className={classes.input}
              placeholder="Enter confirm passsword"
              onChange={handleChange}
              value={values.confirmPassword}
              maxLength="300"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="inputErrorTxt mb-0">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="col-md-12 d-flex justify-content-end">
            <button className="cancelBtn" onClick={close}>
              Cancel
            </button>
            <button className="saveBtn" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
