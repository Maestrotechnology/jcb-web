import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import toast from 'react-hot-toast'
import ReactSelect from 'react-select'
import {
  operatorMappingListService,
  operatorVehicleMappingService,
} from '../Services/Services'
import classes from './Modal.module.css'
import CancelImage from '../Assets/Icons/rounded_cancel.png'
import Loader from '../Loader'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const operatorMappingSchema = Yup.object({
  selectedOperator: Yup.string().required('Operator is Required'),
})

export default function OperatorMappingListModal({
  show,
  close,
  handleListVehicle,
  vehicle_id,
}) {
  useEffect(() => {
    OperatorMappingList()
  }, [])

  const { handleSubmit, errors, values, touched, setFieldValue } = useFormik({
    initialValues: {
      mapping_vehicle_id: vehicle_id,
      operatorMappingList: [],
      selectedOperator: '',
      isLoader: false,
    },
    validationSchema: operatorMappingSchema,
    onSubmit: values => {
      handleOperatorMappingList(values)
    },
  })

  const OperatorMappingList = () => {
    setFieldValue('isLoader', true)
    operatorMappingListService()
      .then(res => {
        setFieldValue('operatorMappingList', res.data)
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

  const handleOperatorMappingList = data => {
    setFieldValue('isLoader', true)
    let formData = new FormData()
    formData.append('vehicle_id', parseInt(data.mapping_vehicle_id))
    formData.append('operator_id', parseInt(data.selectedOperator))
    operatorVehicleMappingService(formData)
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

  return (
    <>
      <Loader isLoader={values.isLoader} />
      <Modal size="md" show={show} centered>
        <Modal.Body>
          <div className={classes.titleContainer}>
            <p className={classes.title}>Operator Mapping</p>
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
                Select Operator <span className="inputErrorTxt">*</span>
              </p>
              <ReactSelect
                className="basic-single"
                classNamePrefix="select"
                name="color"
                placeholder="Select Operator..."
                isClearable={true}
                value={values?.operatorMappingList?.find(
                  e => e.operator_id === values.selectedOperator
                )}
                styles={customStyles}
                options={values.operatorMappingList}
                getOptionLabel={e => e.operator_name}
                getOptionValue={e => e.operator_name}
                key={values.operatorMappingList !== '' ? Math.random() : '123'}
                onChange={e => {
                  if (e !== null) {
                    setFieldValue('selectedOperator', e.operator_id)
                  } else {
                    setFieldValue('selectedOperator', '')
                  }
                }}
              />
              {touched.selectedOperator && errors.selectedOperator && (
                <p className="inputErrorTxt mb-0">{errors.selectedOperator}</p>
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
