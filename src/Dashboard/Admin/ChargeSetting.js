import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useOutletContext } from 'react-router-dom'
import Loader from '../../Loader'
import AddChargeSettingModal from '../../ModalComponents/AddChargeSettingModal'
import {
  deleteVehicleChargeService,
  listVehicleChargeService,
} from '../../Services/Services'
import classes from './Admin.module.css'
import DeleteImage from '../../Assets/Icons/table_delete.png'
import DeleteConfirmationModal from '../../ModalComponents/DeleteConfirmationModal'
export default function ChargeSetting() {
  const { isAddModal, setIsAddModal } = useOutletContext()
  const [isLoader, setIsLoader] = useState(false)
  const [chargeSettingData, setChargeSettingData] = useState([])
  const [isDelete, setIsDelete] = useState({ show: false, delete_id: '' })

  useEffect(() => {
    handleListChargeSetting()
  }, [])

  const handleListChargeSetting = () => {
    setIsLoader(true)
    listVehicleChargeService()
      .then(res => {
        setChargeSettingData(res.data)
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

  const handleDeleteChargeSetting = delete_id => {
    setIsLoader(true)
    deleteVehicleChargeService(parseInt(delete_id))
      .then(res => {
        toast(res.data, { type: 'success' })
        handleListChargeSetting()
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
    <>
      <Loader isLoader={isLoader} />

      {isAddModal.name === 'charge_setting' && isAddModal.show ? (
        <AddChargeSettingModal
          handleListChargeSetting={handleListChargeSetting}
          show={isAddModal.show}
          close={() =>
            setIsAddModal({
              show: false,
              name: '',
            })
          }
        />
      ) : null}

      {isDelete.show ? (
        <DeleteConfirmationModal
          show={isDelete.show}
          close={() =>
            setIsDelete(prev => {
              return {
                ...prev,
                show: false,
              }
            })
          }
          handleDeleteChargeSetting={handleDeleteChargeSetting}
          delete_id={isDelete.delete_id}
        />
      ) : null}

      <Table striped bordered responsive className="mt-4">
        <thead className={classes.tableResponsive}>
          <tr className="text-center">
            <th>S.No</th>
            <th>Date</th>
            <th>Charge Type</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={classes.tableBody}>
          {chargeSettingData?.map((ele, index) => (
            <tr key={ele.charge_id} className="text-center">
              <td>{index + 1}</td>
              <td>{ele.created_at}</td>
              <td>{ele.charge_type}</td>
              <td>{ele.amount}</td>
              <td>
                <img
                  className={classes.actionIcons}
                  src={DeleteImage}
                  alt="delete icon"
                  onClick={() => {
                    setIsDelete(prev => {
                      return {
                        show: true,
                        delete_id: ele.charge_id,
                      }
                    })
                  }}
                />
              </td>
            </tr>
          ))}
          {chargeSettingData?.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No Data Found
              </td>
            </tr>
          ) : null}
        </tbody>
      </Table>
    </>
  )
}
