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
export default function OperatorMappingListModal({
  show,
  close,
  handleListVehicle,
  vehicle_id,
}) {
  const [isLoader, setIsLoader] = useState(false)
  const [operatorMappingListData, setOperatorMappingListData] = useState([])
  const [selectedOperator, setSelectedOperator] = useState('')
  useEffect(() => {
    OperatorMappingList()
  }, [])

  const OperatorMappingList = () => {
    setIsLoader(true)
    operatorMappingListService()
      .then(res => {
        setOperatorMappingListData(res.data)
      })
      .catch(err => {
        if (err?.response?.data?.detail) {
          toast(err.response.data.detail[0].msg, { type: 'error' })
        } else {
          toast('Something went wrong!!', { type: 'error' })
        }
      })
      .finally(() => setIsLoader(false))
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

  const handleOperatorMappingList = () => {
    setIsLoader(true)
    let formData = new FormData()
    formData.append('vehicle_id', parseInt(vehicle_id))
    formData.append('operator_id', parseInt(selectedOperator))
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
      .finally(() => setIsLoader(false))
  }

  return (
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
              value={operatorMappingListData?.find(
                e => e.operator_id === selectedOperator
              )}
              styles={customStyles}
              options={operatorMappingListData}
              getOptionLabel={e => e.operator_name}
              getOptionValue={e => e.operator_name}
              key={operatorMappingListData !== '' ? Math.random() : '123'}
              onChange={e => {
                if (e !== null) {
                  setSelectedOperator(e.operator_id)
                } else {
                  setSelectedOperator('')
                }
              }}
            />
          </div>
          <div className="col-md-12 d-flex justify-content-end mt-2">
            <button className="cancelBtn" onClick={close}>
              Cancel
            </button>
            <button className="saveBtn" onClick={handleOperatorMappingList}>
              Save
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
