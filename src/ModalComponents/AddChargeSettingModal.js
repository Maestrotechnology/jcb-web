import { useFormik } from 'formik'
import React from 'react'
import { Modal } from 'react-bootstrap'
import classes from './Modal.module.css'
import CancelImage from '../Assets/Icons/rounded_cancel.png'
import { createVehicleChargeService } from '../Services/Services'
import toast from 'react-hot-toast'
import { NAME_REGEX, NUMBER_REGEX } from '../Utilities/Constants'
import * as Yup from 'yup'
import Loader from '../Loader'

const chargeSettingSchema = Yup.object({
  type_name: Yup.string()
    .matches(NAME_REGEX, 'Enter valid type name')
    .required('Type name is required'),
  charge: Yup.string()
    .matches(NUMBER_REGEX, 'Enter valid charge')
    .required('Charge is required'),
})

export default function AddChargeSettingModal({
  show,
  close,
  handleListChargeSetting,
}) {
  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } =
    useFormik({
      initialValues: {
        type_name: '',
        charge: '',
        isLoader: false,
      },
      validationSchema: chargeSettingSchema,
      onSubmit: values => {
        handleCreateChargeSetting(values)
      },
    })

  const handleCreateChargeSetting = data => {
    setFieldValue('isLoader', true)
    let formData = new FormData()
    formData.append('type_name', data.type_name)
    formData.append('charge', parseInt(data.charge))
    createVehicleChargeService(formData)
      .then(res => {
        toast(res.data, { type: 'success' })
        handleListChargeSetting()
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
            <p className={classes.title}>Charge Setting</p>
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
                Charge Type Name <span className="inputErrorTxt">*</span>
              </p>
              <input
                name="type_name"
                className={classes.input}
                placeholder="Enter charge type name"
                onChange={handleChange}
                value={values.type_name}
                maxLength="20"
              />
              {touched.type_name && errors.type_name && (
                <p className="inputErrorTxt mb-0">{errors.type_name}</p>
              )}
            </div>
            <div className="col-md-12 col-sm-12 my-2">
              <p className={classes.label}>
                Charge Amount <span className="inputErrorTxt">*</span>
              </p>
              <input
                name="charge"
                className={classes.input}
                placeholder="Enter charge amount"
                onChange={handleChange}
                value={values.charge}
                maxLength="20"
                onKeyPress={e => {
                  if (e.key === '0' || parseInt(e.key)) {
                  } else {
                    e.preventDefault()
                  }
                }}
              />
              {touched.charge && errors.charge && (
                <p className="inputErrorTxt mb-0">{errors.charge}</p>
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
