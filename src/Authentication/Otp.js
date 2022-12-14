import React, { useEffect } from 'react'
import classes from './Auth.module.css'
import Phone from '../Assets/Icons/call.png'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { sendOtpService, verifyOtpService } from '../Services/Services'
import Loader from '../Loader'
export default function Otp() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { handleChange, handleSubmit, values, errors, touched, setFieldValue } =
    useFormik({
      initialValues: {
        otp: '',
        resendOtpTimer: 60,
        reset_key: state?.reset_key,
        resend_otp_mobile: state?.mobile,
        isLoader: false,
      },
      validationSchema: Yup.object({
        otp: Yup.string().required('Otp is required'),
      }),
      onSubmit: values => {
        handleOtp(values)
      },
    })

  useEffect(() => {
    let timer
    if (values.resendOtpTimer > 0) {
      timer = setInterval(() => {
        setFieldValue('resendOtpTimer', values.resendOtpTimer - 1)
      }, 1000)
    } else {
      clearInterval(timer)
    }
    return () => {
      clearInterval(timer)
    }
  }, [values.resendOtpTimer])

  const secondsToMinutesAndSeconds = millis => {
    var minutes = Math.floor(millis / 60)
    var seconds = (millis % 60).toFixed(0)
    return (
      (minutes < 10 ? '0' : '') +
      minutes +
      ':' +
      (seconds < 10 ? '0' : '') +
      seconds
    )
  }
  const handleOtp = data => {
    setFieldValue('isLoader', true)
    let formData = new FormData()
    formData.append('reset_key', data.reset_key)
    formData.append('otp', data.otp)
    verifyOtpService(formData)
      .then(res => {
        toast(res.data.msg, { type: 'success' })
        navigate('/change_password', { state: data.reset_key })
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

  const handleResendOtp = () => {
    let formData = new FormData()
    formData.append('mobile_no', values?.resend_otp_mobile)
    sendOtpService(formData)
      .then(res => {
        toast(res.data.msg, { type: 'success' })
        setFieldValue('reset_key', res.data.reset_key)
      })
      .catch(err => {
        if (err?.response?.data?.detail) {
          toast(err.response.data.detail[0].msg, { type: 'error' })
        } else {
          toast('Something went wrong!!', { type: 'error' })
        }
      })
  }

  return (
    <>
      <Loader isLoader={values.isLoader} />
      <div className={classes.container}>
        <p className={classes.title}>OTP Verification</p>
        <p className={classes.description}>
          Enter your 4 digit verification code
        </p>
        <div className={classes.inputContainer}>
          <input
            type="text"
            className={classes.input}
            placeholder="Enter otp here"
            name="otp"
            value={values.otp}
            onChange={handleChange}
            onKeyPress={e => {
              if (e.key === '0' || parseInt(e.key)) {
              } else {
                e.preventDefault()
              }
            }}
            maxLength="4"
          />
          <div className={classes.iconContainer}>
            <img src={Phone} alt="call" />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          {touched.otp && errors.otp && (
            <p className="inputErrorTxt ms-2 mb-0 w-100">{errors.otp}</p>
          )}
          <p
            className={
              values.resendOtpTimer === 0
                ? classes.resendOtpLink
                : classes.resendOtpTxt
            }
            onClick={() => {
              if (values.resendOtpTimer === 0) {
                setFieldValue('resendOtpTimer', 60)
                handleResendOtp()
              }
            }}
          >
            {values.resendOtpTimer === 0
              ? 'Resend OTP'
              : `Resend Otp in ${secondsToMinutesAndSeconds(
                  values.resendOtpTimer
                )}`}
          </p>
        </div>
        <button
          className={classes.loginBtn + ' text-capitalize my-3'}
          onClick={handleSubmit}
        >
          Verify OTP
        </button>
      </div>
    </>
  )
}
