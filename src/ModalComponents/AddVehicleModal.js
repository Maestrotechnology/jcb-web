import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import classes from './Modal.module.css'
import CancelImage from '../Assets/Icons/rounded_cancel.png'
import ReactSelect from 'react-select'
import {
  createVehicleService,
  deviceMappingListService,
  listVehicleChargeService,
} from '../Services/Services'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  NAME_REGEX,
  SPECIAL_CHARACTER_REGEX,
  toInputUppercase,
  VEHICLE_NUMBER_REGEX,
} from '../Utilities/Constants'
import toast from 'react-hot-toast'
import Loader from '../Loader'

const vehicleSchema = Yup.object({
  vehicle_name: Yup.string()
    .matches(SPECIAL_CHARACTER_REGEX, 'Enter Valid vehicle name')
    .required('Vehicle name is required'),
  vehicle_type: Yup.string().matches(NAME_REGEX, 'Enter valid vehicle type'),
  vehicle_no: Yup.string()
    .matches(VEHICLE_NUMBER_REGEX, 'Enter valid vehicle no')
    .required('Vehicle no is required'),
})

export default function AddVehicleModal({ show, close, handleListVehicle }) {
  useEffect(() => {
    handleDeviceMappingList()
    handleChargeSettingList()
  }, [])

  const customStyles = {
    control: () => ({
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.2)',
      borderRadius: '5px',
      width: '100%',
      ':hover': {
        borderColor: 'none',
      },
    }),
    indicatorsContainer: () => ({
      display: 'none',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: 'black',
    }),
    input: (provided, state) => ({
      ...provided,
      color: 'black',
    }),
  }

  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } =
    useFormik({
      initialValues: {
        vehicle_name: '',
        vehicle_type: '',
        vehicle_no: '',
        deviceMappingListData: [],
        chargeSettingListData: [],
        selectedDevice: '',
        selectedChargeSetting: '',
        isLoader: false,
      },
      validationSchema: vehicleSchema,
      onSubmit: values => {
        handleCreateVehicle(values)
      },
    })

  const handleCreateVehicle = data => {
    setFieldValue('isLoader', true)
    let formData = new FormData()
    formData.append('vehicle_name', data.vehicle_name)
    formData.append('vehicle_number', data.vehicle_no)
    if (data.selectedChargeSetting) {
      formData.append('charge_setting_id', parseInt(data.selectedChargeSetting))
    }
    if (data.selectedDevice) {
      formData.append('device_id', parseInt(data.selectedDevice))
    }
    createVehicleService(formData)
      .then(res => {
        toast(res.data, { type: 'success' })
        handleListVehicle()
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

  const handleDeviceMappingList = () => {
    setFieldValue('isLoader', true)
    deviceMappingListService()
      .then(res => {
        setFieldValue('deviceMappingListData', res.data)
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

  const handleChargeSettingList = () => {
    setFieldValue('isLoader', true)
    listVehicleChargeService()
      .then(res => {
        setFieldValue('chargeSettingListData', res.data)
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
      <Modal show={show} size="xl" centered>
        <Modal.Body className={classes.modalContainer}>
          <div className={classes.titleContainer}>
            <p className={classes.title}>Vehicle</p>
            <img
              src={CancelImage}
              className={classes.cancelImage}
              onClick={close}
              alt="cancel icon"
            />
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4 col-sm-12 my-2">
              <p className={classes.label}>Select Device</p>
              <ReactSelect
                className="basic-single"
                classNamePrefix="select"
                name="color"
                placeholder="Select Device..."
                isClearable={true}
                value={values?.deviceMappingListData?.find(
                  e => e.device_id === values.selectedDevice
                )}
                styles={customStyles}
                options={values.deviceMappingListData}
                getOptionLabel={e => e.device_name}
                getOptionValue={e => e.device_name}
                key={
                  values.deviceMappingListData !== '' ? Math.random() : '123'
                }
                onChange={e => {
                  if (e !== null) {
                    setFieldValue('selectedDevice', e.device_id)
                  } else {
                    setFieldValue('selectedDevice', '')
                  }
                }}
              />
            </div>

            <div className="col-md-6 col-lg-4 col-sm-12 my-2">
              <p className={classes.label}>
                Vehicle Name <span className="inputErrorTxt">*</span>
              </p>
              <input
                name="vehicle_name"
                className={classes.input}
                placeholder="Enter vehicle name"
                onChange={handleChange}
                value={values.vehicle_name}
                maxLength="15"
              />
              {touched.vehicle_name && errors.vehicle_name && (
                <p className="inputErrorTxt">{errors.vehicle_name}</p>
              )}
            </div>

            <div className="col-md-6 col-lg-4 col-sm-12 my-2">
              <p className={classes.label}>Vehicle Type</p>
              <input
                name="vehicle_type"
                className={classes.input}
                placeholder="Enter vehicle type"
                onChange={handleChange}
                value={values.vehicle_type}
                maxLength="20"
              />
              {touched.vehicle_type && errors.vehicle_type && (
                <p className="inputErrorTxt">{errors.vehicle_type}</p>
              )}
            </div>

            <div className="col-md-6 col-lg-4 col-sm-12 my-2">
              <p className={classes.label}>
                Vehicle No <span className="inputErrorTxt">*</span>
              </p>
              <input
                name="vehicle_no"
                className={classes.input}
                placeholder="Enter vehicle name"
                onChange={handleChange}
                onInput={toInputUppercase}
                value={values.vehicle_no}
                maxLength="10"
              />
              {touched.vehicle_no && errors.vehicle_no && (
                <p className="inputErrorTxt">{errors.vehicle_no}</p>
              )}
            </div>

            <div className="col-md-6 col-lg-4 col-sm-12 my-2">
              <p className={classes.label}>Charge setting</p>
              <ReactSelect
                className="basic-single"
                classNamePrefix="select"
                name="color"
                placeholder="Select charge setting..."
                isClearable={true}
                value={values?.chargeSettingListData?.find(
                  e => e.charge_id === values.selectedChargeSetting
                )}
                styles={customStyles}
                options={values.chargeSettingListData}
                getOptionLabel={e => e.vehicle_charge}
                getOptionValue={e => e.vehicle_charge}
                key={
                  values.chargeSettingListData !== '' ? Math.random() : '123'
                }
                onChange={e => {
                  if (e !== null) {
                    setFieldValue('selectedChargeSetting', e.charge_id)
                  } else {
                    setFieldValue('selectedChargeSetting', '')
                  }
                }}
              />
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
    </>
  )
}
