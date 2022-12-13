import React, { useEffect } from 'react'
import classes from './Auth.module.css'
import PasswordLock from '../Assets/Icons/password_lock.png'
import PasswordUnlock from '../Assets/Icons/password_unlock.svg'
import User from '../Assets/Icons/user.png'
import Phone from '../Assets/Icons/call.png'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { MOBILE_REGEX, SPECIAL_CHARACTER_REGEX } from '../Utilities/Constants'
import { useNavigate } from 'react-router-dom'
import { loginService } from '../Services/Services'
import toast from 'react-hot-toast'
import { setCookie } from '../Utilities/Cookies'
import Loader from '../Loader'

const LoginSchema = Yup.object({
  mobile: Yup.string()
    .matches(MOBILE_REGEX, 'Mobile number is Invalid')
    .required('Mobile number is required'),
  companyCode: Yup.string().matches(
    SPECIAL_CHARACTER_REGEX,
    'Enter valid company code'
  ),
  password: Yup.string()
    .min(8, 'Password must be 8 characters')
    .required('Password is required'),
})

export default function Signin() {
  const navigate = useNavigate()
  const { handleChange, handleSubmit, values, errors, touched, setFieldValue } =
    useFormik({
      initialValues: {
        mobile: '',
        companyCode: '',
        password: '',
        isShowPassword: false,
        isLoader: false,
      },
      validationSchema: LoginSchema,
      onSubmit: values => {
        handleLogin(values)
      },
    })

  const handleLogin = data => {
    setFieldValue('isLoader', true)
    let formData = new FormData()
    formData.append('username', data.mobile)
    if (data.companyCode) {
      formData.append('company_code', data.companyCode)
    }
    formData.append('password', data.password)
    loginService(formData)
      .then(res => {
        setCookie('loginData', res.data)
        navigate(
          res?.data?.user_type === 2
            ? '/admin_dashboard'
            : res?.data?.user_type === 1
            ? '/superadmin_dashboard'
            : '/'
        )
        toast('Login successfully!!!', { type: 'success' })
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
      <div className={classes.container}>
        <p className={classes.title + ' mb-2'}>Hello Again!</p>
        <p className={classes.description + ' mb-2'}>
          Hello, welcome back to our application
        </p>
        <div className={classes.inputContainer}>
          <input
            type="text"
            className={classes.input}
            placeholder="Mobile number"
            name="mobile"
            value={values.mobile}
            onChange={handleChange}
            onKeyPress={e => {
              if (e.key === '0' || parseInt(e.key)) {
              } else {
                e.preventDefault()
              }
            }}
            maxLength="10"
          />
          <div className={classes.iconContainer}>
            <img src={Phone} alt="call" />
          </div>
        </div>
        {touched.mobile && errors.mobile && (
          <p className="inputErrorTxt ms-2 mb-0">{errors.mobile}</p>
        )}
        <div className={classes.inputContainer}>
          <input
            type="text"
            className={classes.input}
            placeholder="Company code"
            name="companyCode"
            value={values.companyCode}
            onChange={handleChange}
          />
          <div className={classes.iconContainer}>
            <img src={User} alt="company_code" />
          </div>
        </div>
        {touched.companyCode && errors.companyCode && (
          <p className="inputErrorTxt ms-2 mb-0">{errors.companyCode}</p>
        )}
        <div className={classes.inputContainer}>
          <input
            type={values.isShowPassword ? 'text' : 'password'}
            className={classes.input}
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
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
        {touched.password && errors.password && (
          <p className="inputErrorTxt ms-2 mb-0">{errors.password}</p>
        )}
        <p className={classes.forgotTxt}>
          <span onClick={() => navigate('/forgot_password')}>
            Forgot password ?
          </span>
        </p>
        <button className={classes.loginBtn} onClick={handleSubmit}>
          Login
        </button>
        <p className="text-center my-3">
          Dont’t have an company account{' '}
          <span className={classes.signupTxt}>Sign up? </span>{' '}
        </p>
      </div>
    </>
  )
}
