import React from 'react'
import classes from './Auth.module.css'
import CancelImage from '../Assets/Icons/rounded_cancel.png'
import HidePassword from '../Assets/Icons/password_hide.svg'
import OpenPassword from '../Assets/Icons/password_open.svg'
import PasswordLock from '../Assets/Icons/password_lock.png'
import PasswordUnlock from '../Assets/Icons/password_unlock.svg'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  changePasswordService,
  resetPasswordService,
} from '../Services/Services'
import Loader from '../Loader'
import { useLocation, useNavigate } from 'react-router-dom'

const changePasswordSchema = Yup.object({
  new_password: Yup.string()
    .min(8, 'Password must be 8 characters')
    .required('New password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .required('Confirm password is required'),
})

export default function ChangePassword() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } =
    useFormik({
      initialValues: {
        password_resetkey: state,
        new_password: '',
        confirm_password: '',
        isShowPassword: false,
        isShowConfirmPassword: false,
        isLoader: false,
      },
      validationSchema: changePasswordSchema,
      onSubmit: values => {
        handleChangePassword(values)
      },
    })

  const handleChangePassword = data => {
    setFieldValue('setFieldValue', true)
    let formData = new FormData()
    formData.append('reset_key', data.password_resetkey)
    formData.append('password', data.new_password)
    resetPasswordService(formData)
      .then(res => {
        toast(res.data, { type: 'success' })
        navigate('/')
      })
      .catch(err => {
        if (err?.response?.data?.detail) {
          toast(err.response.data.detail[0].msg, { type: 'error' })
        } else {
          toast('Something went wrong!!', { type: 'error' })
        }
      })
      .finally(() => setFieldValue('setFieldValue', true))
  }
  return (
    <>
      <Loader isLoader={values.isLoader} />
      <div className={classes.container}>
        <p className={classes.title}>Change Password</p>
        <p className={classes.description}>Reset your password here</p>
        <div className={classes.inputContainer}>
          <input
            type={values.isShowPassword ? 'text' : 'password'}
            className={classes.input}
            placeholder="New password"
            name="new_password"
            value={values.new_password}
            onChange={handleChange}
            maxLength="50"
          />
          <div
            className={classes.iconContainer}
            onClick={() =>
              setFieldValue('isShowPassword', !values.isShowPassword)
            }
          >
            <img
              className={classes.passwordIcon}
              src={values.isShowPassword ? PasswordUnlock : PasswordLock}
              alt="password"
            />
          </div>
        </div>
        {touched.new_password && errors.new_password && (
          <p className="inputErrorTxt ms-2 mb-0">{errors.new_password}</p>
        )}
        <div className={classes.inputContainer}>
          <input
            type={values.isShowConfirmPassword ? 'text' : 'password'}
            className={classes.input}
            placeholder="Confirm password"
            name="confirm_password"
            value={values.confirm_password}
            onChange={handleChange}
            maxLength="50"
          />
          <div
            className={classes.iconContainer}
            onClick={() =>
              setFieldValue(
                'isShowConfirmPassword',
                !values.isShowConfirmPassword
              )
            }
          >
            <img
              className={classes.passwordIcon}
              src={values.isShowConfirmPassword ? PasswordUnlock : PasswordLock}
              alt="password"
            />
          </div>
        </div>
        {touched.confirm_password && errors.confirm_password && (
          <p className="inputErrorTxt ms-2 mb-0">{errors.confirm_password}</p>
        )}
        <button className={classes.loginBtn + ' my-3'} onClick={handleSubmit}>
          Change password
        </button>
      </div>
    </>
  )
}
