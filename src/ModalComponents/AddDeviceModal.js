import React from 'react'
import { Modal } from 'react-bootstrap'
import classes from './Modal.module.css'
import CancelImage from '../Assets/Icons/rounded_cancel.png'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { createDeviceService } from '../Services/Services'
import { SPECIAL_CHARACTER_REGEX } from '../Utilities/Constants'
import { useFormik } from 'formik'
import Loader from '../Loader'

const deviceSchema = Yup.object({
  device_code: Yup.string()
    .matches(SPECIAL_CHARACTER_REGEX, 'Enter valid device code')
    .required('Device code is required'),
  device_name: Yup.string()
    .matches(SPECIAL_CHARACTER_REGEX, 'Enter valid device name')
    .required('Device name is required'),
})

export default function AddDeviceModal({ show, close, deviceData }) {
  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } =
    useFormik({
      initialValues: {
        device_code: '',
        device_name: '',
        isLoader: false,
      },
      validationSchema: deviceSchema,
      onSubmit: values => {
        handleCreateDevice(values)
      },
    })

  const handleCreateDevice = data => {
    setFieldValue('isLoader', true)
    let formData = new FormData()
    formData.append('device_name', data.device_name)
    formData.append('device_code', data.device_code)
    createDeviceService(formData)
      .then(res => {
        toast(res.data, { type: 'success' })
        deviceData()
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
            <p className={classes.title}>Device</p>
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
                Device code <span className="inputErrorTxt">*</span>
              </p>
              <input
                name="device_code"
                className={classes.input}
                placeholder="Enter device code"
                onChange={handleChange}
                value={values.device_code}
                maxLength="20"
              />
              {touched.device_code && errors.device_code && (
                <p className="inputErrorTxt mb-0">{errors.device_code}</p>
              )}
            </div>
            <div className="col-md-12 col-sm-12 my-2">
              <p className={classes.label}>
                Device name <span className="inputErrorTxt">*</span>
              </p>
              <input
                name="device_name"
                className={classes.input}
                placeholder="Enter device name"
                onChange={handleChange}
                value={values.device_name}
                maxLength="20"
              />
              {touched.device_name && errors.device_name && (
                <p className="inputErrorTxt mb-0">{errors.device_name}</p>
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
