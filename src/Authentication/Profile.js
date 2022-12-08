import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import * as Yup from 'yup'
import {
  COMPANY_CODE_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  NUMBER_REGEX,
} from '../Utilities/Constants'
import classes from './Auth.module.css'
import EditImage from '../Assets/Icons/table_edit.png'
import { updateProfileService, viewProfileService } from '../Services/Services'
import toast from 'react-hot-toast'
import Loader from '../Loader'
import ChangePasswordModal from '../ModalComponents/ChangePasswordModal'
import { useSelector } from 'react-redux'

const profileSchema = Yup.object({
  name: Yup.string()
    .matches(NAME_REGEX, 'Enter valid name')
    .required('Name is required'),
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Enter valid email')
    .required('Email is required'),
  mobile: Yup.string()
    .matches(NUMBER_REGEX, 'Enter valid phone number')
    .required('Phone number is required'),
  company_code: Yup.string()
    .matches(COMPANY_CODE_REGEX, 'Enter valid company code')
    .required('Company code is required'),
  address: Yup.string().required('Address is required'),
})

export default function Profile() {
  const { loginUserData } = useSelector(state => state.auth)
  useEffect(() => {
    if (loginUserData === null) {
      handleGetProfileInfo()
    }
  }, [])

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      name: loginUserData?.name || '',
      email: loginUserData?.email || '',
      mobile: loginUserData?.mobile_no || '',
      company_code: loginUserData?.code || '',
      address: loginUserData?.address || '',
      isChangePassword: false,
      isEditProfile: false,
      isLoader: false,
    },
    validationSchema: profileSchema,
    onSubmit: values => {
      handleUpdateProfile(values)
    },
  })

  const handleGetProfileInfo = () => {
    setFieldValue('isLoader', true)
    viewProfileService()
      .then(({ data }) => {
        setValues({
          ...values,
          name: data?.name,
          email: data?.email,
          mobile: data?.mobile_no,
          company_code: data.code,
          address: data.address,
        })
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

  const handleUpdateProfile = data => {
    setFieldValue('isLoader', true)
    let formData = new FormData()
    formData.append('customer_id', parseInt(loginUserData?.customer_id))
    formData.append('customer_name', data.name)
    formData.append('company_code', data.company_code)
    formData.append('mobile_no', data.mobile)
    if (data.email) {
      formData.append('email', data.email)
    }
    formData.append('address', data.address)
    updateProfileService(formData)
      .then(res => {
        toast(res.data, { type: 'success' })
        setFieldValue('isEditProfile', false)
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
      <Loader isLoader={values.isLoader} />
      {values.isChangePassword ? (
        <ChangePasswordModal
          show={values.isChangePassword}
          close={() => {
            setFieldValue('isChangePassword', false)
          }}
        />
      ) : null}
      <div className={classes.parentEditContainer}>
        <p
          className={classes.editTxt}
          onClick={() => {
            setFieldValue('isEditProfile', true)
          }}
        >
          <img src={EditImage} alt="edit_icon" className="me-1" /> Edit
        </p>
      </div>
      <div className="row">
        <div className="col-md-3 col-sm-12 my-2">
          <p className={classes.label}>
            Name <span className="inputErrorTxt">*</span>
          </p>
          <input
            type="text"
            name="name"
            className={classes.profileInput}
            disabled={!values.isEditProfile}
            placeholder="Enter your name"
            onChange={handleChange}
            value={values.name}
            maxLength="20"
          />
          {touched.name && errors.name && (
            <p className="inputErrorTxt mb-0">{errors.name}</p>
          )}
        </div>
        <div className="col-md-3 col-sm-12 my-2">
          <p className={classes.label}>
            Email <span className="inputErrorTxt">*</span>
          </p>
          <input
            type="text"
            name="email"
            className={classes.profileInput}
            disabled={!values.isEditProfile}
            placeholder="Enter your email"
            onChange={handleChange}
            value={values.email}
            maxLength="20"
          />
          {touched.email && errors.email && (
            <p className="inputErrorTxt mb-0">{errors.email}</p>
          )}
        </div>
        <div className="col-md-3 col-sm-12 my-2">
          <p className={classes.label}>
            Mobile No <span className="inputErrorTxt">*</span>
          </p>
          <input
            type="text"
            name="mobile"
            className={classes.profileInput}
            disabled
            placeholder="Enter your mobile no"
            onChange={handleChange}
            value={values.mobile}
            maxLength="20"
          />
          {touched.mobile && errors.mobile && (
            <p className="inputErrorTxt mb-0">{errors.mobile}</p>
          )}
        </div>
        <div className="col-md-3 col-sm-12 my-2">
          <p className={classes.label}>
            Company code <span className="inputErrorTxt">*</span>
          </p>
          <input
            type="text"
            name="company_code"
            className={classes.profileInput}
            disabled={!values.isEditProfile}
            placeholder="Enter your company code"
            onChange={handleChange}
            value={values.company_code}
            maxLength="20"
          />
          {touched.company_code && errors.company_code && (
            <p className="inputErrorTxt mb-0">{errors.company_code}</p>
          )}
        </div>
        <div className="col-md-3 col-sm-12 my-2">
          <p className={classes.label}>
            Address <span className="inputErrorTxt">*</span>
          </p>
          <input
            type="text"
            name="address"
            className={classes.profileInput}
            disabled={!values.isEditProfile}
            placeholder="Enter your address"
            onChange={handleChange}
            value={values.address}
            maxLength="20"
          />
          {touched.address && errors.address && (
            <p className="inputErrorTxt mb-0">{errors.address}</p>
          )}
        </div>
        <div className="col-md-12 d-flex justify-content-end mt-2">
          <button
            disabled={!values.isEditProfile}
            className="saveBtn"
            style={{
              backgroundColor: !values.isEditProfile ? '#fac86b' : '#ec9b00',
            }}
            onClick={handleSubmit}
          >
            Save
          </button>
          <p
            className={classes.changePasswordTxt}
            onClick={() => {
              setFieldValue('isChangePassword', true)
            }}
          >
            Change Password
          </p>
        </div>
      </div>
    </>
  )
}
