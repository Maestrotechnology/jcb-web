import React, { useRef } from 'react'
import { Modal } from 'react-bootstrap'
import classes from './Modal.module.css'
import CancelImage from '../Assets/Icons/rounded_cancel.png'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { createOperatorService } from '../Services/Services'
import toast from 'react-hot-toast'
import { MOBILE_REGEX, NAME_REGEX } from '../Utilities/Constants'
import UploadImage from '../Assets/Icons/upload_image.png'
const operatorSchema = Yup.object({
  operator_name: Yup.string()
    .matches(NAME_REGEX, 'Enter valid name')
    .required('Operator name is required'),
  mobile: Yup.string()
    .matches(MOBILE_REGEX, 'Enter valid mobile number')
    .required('Mobile no is required'),
  address: Yup.string().required('Address is required'),
  image: Yup.string().required('Image is required'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
})
export default function AddOperatorModal({ show, close, handleListOperator }) {
  const handleFileUpload = useRef(null)

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    resetForm,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: {
      operator_name: '',
      mobile: '',
      address: '',
      image: '',
      password: '',
      confirmPassword: '',
      imageUploadStatus: false,
      isLoader: false,
    },
    validationSchema: operatorSchema,
    onSubmit: values => {
      handleCreateOpeartor(values)
    },
  })

  const handleCreateOpeartor = data => {
    setFieldValue('isLoader', true)
    let formData = new FormData()
    formData.append('name', data.operator_name)
    formData.append('mobile_no', data.mobile)
    formData.append('password', data.password)
    formData.append('license_image', data.image)
    formData.append('address', data.address)
    createOperatorService(formData)
      .then(res => {
        toast(res.data, { type: 'success' })
        handleListOperator()
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

  console.log(values.image, '==image')

  return (
    <Modal show={show} size="md" centered>
      <Modal.Body>
        <div className={classes.titleContainer}>
          <p className={classes.title}>Operator</p>
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
              Operator Name <span className="inputErrorTxt mb-0">*</span>
            </p>
            <input
              name="operator_name"
              className={classes.input}
              placeholder="Enter operator name"
              onChange={handleChange}
              value={values.operator_name}
              maxLength="15"
            />
            {touched.operator_name && errors.operator_name && (
              <p className="inputErrorTxt mb-0">{errors.operator_name}</p>
            )}
          </div>
          <div className="col-md-12 col-sm-12 my-2">
            <p className={classes.label}>
              Mobile number <span className="inputErrorTxt mb-0">*</span>
            </p>
            <input
              name="mobile"
              className={classes.input}
              placeholder="Enter mobile number"
              onChange={handleChange}
              value={values.mobile}
              maxLength="10"
              onKeyPress={e => {
                if (e.key === '0' || parseInt(e.key)) {
                } else {
                  e.preventDefault()
                }
              }}
            />
            {touched.mobile && errors.mobile && (
              <p className="inputErrorTxt mb-0">{errors.mobile}</p>
            )}
          </div>
          <div className="col-md-12 col-sm-12 my-2">
            <p className={classes.label}>
              Address <span className="inputErrorTxt mb-0">*</span>
            </p>
            <input
              name="address"
              className={classes.input}
              placeholder="Enter operator name"
              onChange={handleChange}
              value={values.address}
              maxLength="300"
            />
            {touched.address && errors.address && (
              <p className="inputErrorTxt mb-0">{errors.address}</p>
            )}
          </div>
          <div className="col-md-12 col-sm-12 my-2">
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
          <div className="col-md-12 col-sm-12 my-2">
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
          <div
            className="col-md-12 col-sm-12 my-2"
            style={{
              display: values.image !== '' ? 'flex' : 'block',
              alignItems: values.image !== '' ? 'center' : null,
            }}
          >
            <div
              className={classes.imageUploadContainer}
              onClick={() => {
                handleFileUpload.current.click()
              }}
            >
              <img
                src={UploadImage}
                alt="upload_image"
                className={classes.img}
              />
            </div>
            <input
              ref={handleFileUpload}
              type="file"
              id="imageUpload"
              name="image"
              style={{ display: 'none' }}
              onChange={e => {
                console.log('test')
                setFieldValue('image', e.target.files[0])
                handleFileUpload.current.value = ''
              }}
            />
            {values.image !== '' ? (
              <div className={classes.uploadedImgContainer}>
                <img
                  src={URL.createObjectURL(values.image)}
                  alt="uploaded_image"
                  className={classes.uploadedImg}
                />
                <img
                  src={CancelImage}
                  alt="cancel_uploaded_image"
                  className={classes.uploadImgCancel}
                  onClick={() => setFieldValue('image', '')}
                />
              </div>
            ) : null}
            {touched.image && errors.image && (
              <p className="inputErrorTxt mb-0">{errors.image}</p>
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
