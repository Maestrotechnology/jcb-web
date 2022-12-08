import React from 'react'
import classes from './Auth.module.css'
import Phone from '../Assets/Icons/call.png'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { MOBILE_REGEX } from '../Utilities/Constants'
import toast from 'react-hot-toast'
import { sendOtpService } from '../Services/Services'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'

const forgotSchema = Yup.object({
  mobile: Yup.string()
    .matches(MOBILE_REGEX, 'Enter valid mobile number')
    .required('Mobile number is required'),
})

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } = useFormik({
    initialValues: {
      mobile: '',
      isLoader: false,
    },
    validationSchema: forgotSchema,
    onSubmit: values => {
      handleForgotPassword(values)
    },
  })

  const handleForgotPassword = data => {
    setFieldValue("isLoader", true)
    let formData = new FormData()
    formData.append('mobile_no', data.mobile)
    sendOtpService(formData)
      .then(res => {
        toast(res.data.msg, { type: "success" })
        navigate('/otp', {
          state: { reset_key: res.data.reset_key, mobile: data.mobile },
        })
      })
      .catch(err => {
        if (err?.response?.data?.detail) {
          toast(err.response.data.detail[0].msg, { type: 'error' })
        } else {
          toast('Something went wrong!!', { type: 'error' })
        }
      }).finally(() => setFieldValue("isLoader", false))
  }

  return (
    <>
      <Loader isLoader={values.isLoader} />
      <div className={classes.container}>
        <p className={classes.title}>Forgot Password</p>
        <p className={classes.description}>
          Enter your mobile number for the verification process, we will send 4
          digit code to your email
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
        <button
          className={classes.loginBtn + ' text-capitalize my-3'}
          onClick={handleSubmit}
        >
          Send Code
        </button>
      </div>
    </>
  )
}
