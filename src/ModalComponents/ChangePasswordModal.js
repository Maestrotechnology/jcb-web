import { useFormik } from 'formik'
import React from 'react'
import { Modal } from 'react-bootstrap'
import classes from './Modal.module.css'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { changePasswordService } from '../Services/Services'
import CancelImage from '../Assets/Icons/rounded_cancel.png'
import HidePassword from '../Assets/Icons/password_hide.svg'
import OpenPassword from '../Assets/Icons/password_open.svg'
import Loader from '../Loader'

const changePasswordSchema = Yup.object({
  new_password: Yup.string()
    .min(8, 'Password must be 8 characters')
    .required('New password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .required('Confirm password is required'),
})

export default function ChangePasswordModal({ show, close }) {
  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } =
    useFormik({
      initialValues: {
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
    setFieldValue('isLoader', true)
    let formData = new FormData()
    formData.append('new_password', data.new_password)
    formData.append('confirm_password', data.confirm_password)
    changePasswordService(formData)
      .then(res => {
        toast(res.data, { type: 'success' })
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
    <>
      <Loader isLoader={values.isLoader} />
      <Modal show={show} size="md" centered>
        <Modal.Body>
          <div className={classes.titleContainer}>
            <p className={classes.title}>Change password</p>
            <img
              src={CancelImage}
              className={classes.cancelImage}
              onClick={close}
              alt="cancel icon"
            />
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12 my-2">
              <p className={classes.label}>
                New password <span className="inputErrorTxt">*</span>
              </p>
              <div className={classes.changePwdInputContainer}>
                <input
                  type={values.isShowPassword ? 'text' : 'password'}
                  name="new_password"
                  className={classes.changePwdInput}
                  placeholder="Enter new password"
                  onChange={handleChange}
                  value={values.new_password}
                  maxLength="50"
                />
                <img
                  src={values.isShowPassword ? OpenPassword : HidePassword}
                  alt="password"
                  className={classes.pwdIcon}
                  onClick={() => {
                    setFieldValue('isShowPassword', !values.isShowPassword)
                  }}
                />
              </div>
              {touched.new_password && errors.new_password && (
                <p className="inputErrorTxt mb-0">{errors.new_password}</p>
              )}
            </div>
            <div className="col-md-12 col-sm-12 my-2">
              <p className={classes.label}>
                Confirm password <span className="inputErrorTxt">*</span>
              </p>
              <div className={classes.changePwdInputContainer}>
                <input
                  type={values.isShowConfirmPassword ? 'text' : 'password'}
                  name="confirm_password"
                  className={classes.changePwdInput}
                  placeholder="Enter confirm password"
                  onChange={handleChange}
                  value={values.confirm_password}
                  maxLength="50"
                />
                <img
                  src={
                    values.isShowConfirmPassword ? OpenPassword : HidePassword
                  }
                  alt="password"
                  onClick={() => {
                    setFieldValue(
                      'isShowConfirmPassword',
                      !values.isShowConfirmPassword
                    )
                  }}
                  className={classes.pwdIcon}
                />
              </div>
              {touched.confirm_password && errors.confirm_password && (
                <p className="inputErrorTxt mb-0">{errors.confirm_password}</p>
              )}
            </div>
            <div className="col-md-12 d-flex justify-content-end mt-2">
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
    </>
  )
}
