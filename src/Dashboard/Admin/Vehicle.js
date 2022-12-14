import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import classes from './Admin.module.css'
import EditImage from '../../Assets/Icons/table_edit.png'
import DeleteImage from '../../Assets/Icons/table_delete.png'
import OperatorImage from '../../Assets/Icons/operator.png'
import Toggle from '../../ToggleButton'
import {
  changeVehiclePermissionService,
  deleteVehicleService,
  listVehicleService,
  vehicleChangeStatusService,
} from '../../Services/Services'
import toast from 'react-hot-toast'
import Loader from '../../Loader'
import ReactPaginate from 'react-paginate'
import LeftArrowImage from '../../Assets/Icons/paginate_left_arrow.png'
import RightArrowImage from '../../Assets/Icons/paginate_right_arrow.png'
import { useOutletContext } from 'react-router-dom'
import AddVehicleModal from '../../ModalComponents/AddVehicleModal'
import EditVehicleModal from '../../ModalComponents/EditVehicleModal'
import OperatorMappingListModal from '../../ModalComponents/OperatorMappingListModal'
import DeleteConfirmationModal from '../../ModalComponents/DeleteConfirmationModal'
import ActiveInactiveToggle from '../../ActiveInactiveToggle/ActiveInactiveToggle'
import { handleAmountStyle } from '../../Utilities/Constants'

export default function Vehicle() {
  const { searchData, isAddModal, setIsAddModal } = useOutletContext()
  const [isEditModal, setIsEditModal] = useState({ show: false, data: null })
  const [isLoader, setIsLoader] = useState(false)
  const [vehicleData, setVehicleData] = useState([])
  const [page, setPage] = useState(0)
  const [isOperatorMappingList, setIsOperatorMappingList] = useState({
    show: false,
    vehicleId: '',
  })
  const [isDelete, setIsDelete] = useState({ show: false, delete_id: '' })

  useEffect(() => {
    handleListVehicle()
  }, [searchData])

  const handleListVehicle = (pageNum = 1) => {
    setIsLoader(true)
    let formData = new FormData()
    formData.append('vehicle_no', searchData ? searchData : '')
    listVehicleService(formData, pageNum)
      .then(res => {
        setVehicleData(res.data)
        setPage(pageNum - 1)
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

  const handleChangePermissionStatus = (id, status) => {
    setIsLoader(true)
    let formData = new FormData()
    formData.append('vehicle_id', parseInt(id))
    formData.append('permission_status', status === true ? 1 : 0)
    changeVehiclePermissionService(formData)
      .then(res => {
        toast(res.data, { type: 'success' })
        handleListVehicle()
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

  const handleDeleteVehicle = delete_id => {
    setIsLoader(true)
    let formData = new FormData()
    formData.append('vehicle_id', parseInt(delete_id))
    deleteVehicleService(formData)
      .then(res => {
        toast(res.data, { type: 'success' })
        handleListVehicle()
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

  const handleChangeStatus = (id, status) => {
    setIsLoader(true)
    let formData = new FormData()
    formData.append('vehicle_id', id)
    formData.append('status', status ? 1 : 0)
    vehicleChangeStatusService(formData)
      .then(res => {
        toast(res.data, { type: 'success' })
        handleListVehicle()
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

      {isAddModal.name === 'vehicle' && isAddModal.show ? (
        <AddVehicleModal
          handleListVehicle={handleListVehicle}
          show={isAddModal.show}
          close={() =>
            setIsAddModal({
              show: false,
              name: '',
            })
          }
        />
      ) : null}

      {isEditModal.show ? (
        <EditVehicleModal
          show={isEditModal.show}
          close={() =>
            setIsEditModal(prev => {
              return {
                ...prev,
                show: false,
              }
            })
          }
          editData={isEditModal.data}
          handleListVehicle={handleListVehicle}
        />
      ) : null}

      {isOperatorMappingList.show ? (
        <OperatorMappingListModal
          show={isOperatorMappingList.show}
          close={() =>
            setIsOperatorMappingList(prev => {
              return {
                ...prev,
                show: false,
              }
            })
          }
          handleListVehicle={handleListVehicle}
          vehicle_id={isOperatorMappingList.vehicleId}
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
          handleDeleteVehicle={handleDeleteVehicle}
          delete_id={isDelete.delete_id}
        />
      ) : null}

      <Table striped bordered responsive>
        <thead className={classes.tableResponsive}>
          <tr className="text-center">
            <th>S.No</th>
            <th>Vehicle Name</th>
            <th>Vehicle Type</th>
            <th>Vehicle Number</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Change Vehicle Charge</th>
            <th>Operator Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={classes.tableBody}>
          {vehicleData?.items?.map((ele, index) => (
            <tr className="text-center">
              <td>{(vehicleData.page - 1) * vehicleData.size + (index + 1)}</td>
              <td>{ele.vehicle_name}</td>
              <td>{ele.vehicle_name}</td>
              <td>{ele.vehicle_no}</td>
              <td>{ele.created_at}</td>
              <td>
                {ele.charge_type !== ''
                  ? `₹ ${handleAmountStyle(ele.charge_amount)}.00 - (${
                      ele.charge_type
                    })`
                  : ele.charge_amount}
              </td>
              <td>
                <Toggle
                  id={index}
                  isChecked={ele?.permission_status === 0 ? false : true}
                  handleChange={({ status }) => {
                    handleChangePermissionStatus(ele.vehicle_id, status)
                  }}
                />
              </td>
              <td>{ele.operator_name || '-'}</td>
              <td>
                <ActiveInactiveToggle
                  id={index}
                  isChecked={ele?.status === 0 ? false : true}
                  handleChange={({ status }) => {
                    handleChangeStatus(ele.vehicle_id, status)
                  }}
                />
              </td>
              <td>
                <img
                  className={classes.actionIcons}
                  src={OperatorImage}
                  alt="operator icon"
                  onClick={() => {
                    setIsOperatorMappingList({
                      show: true,
                      vehicleId: ele.vehicle_id,
                    })
                  }}
                />
                <img
                  className={classes.actionIcons}
                  src={EditImage}
                  alt="edit icon"
                  onClick={() =>
                    setIsEditModal(prev => {
                      return {
                        show: true,
                        data: ele,
                      }
                    })
                  }
                />
                <img
                  className={classes.actionIcons}
                  src={DeleteImage}
                  alt="delete icon"
                  onClick={() => {
                    setIsDelete(prev => {
                      return {
                        show: true,
                        delete_id: ele.vehicle_id,
                      }
                    })
                  }}
                />
              </td>
            </tr>
          ))}
          {vehicleData?.items?.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center">
                No Data Found
              </td>
            </tr>
          ) : null}
        </tbody>
      </Table>
      {vehicleData?.total > 10 ? (
        <div className={classes.paginateContainer}>
          <ReactPaginate
            previousLabel={<img src={LeftArrowImage} alt="left" />}
            nextLabel={<img src={RightArrowImage} alt="right" />}
            breakLabel="..."
            pageCount={Math.ceil(vehicleData.total) / 10}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={({ selected }) => handleListVehicle(selected + 1)}
            forcePage={page}
            containerClassName={'pagination m-0'}
            pageClassName={'page-item'}
            pageLinkClassName={
              'page-link text-secondary rounded-circle bg-light pt-1 pb-1 ps-2 pe-2 ms-1 me-1 border-0 shadow-none'
            }
            previousClassName={'page-item'}
            previousLinkClassName={
              'page-link border-0 text-dark rounded-circle p-1 bg_orange shadow-none me-1'
            }
            nextClassName={'page-item '}
            nextLinkClassName={
              'page-link border-0 text-dark bg_orange p-1 rounded-circle shadow-none ms-1'
            }
            activeClassName={'active'}
          />
        </div>
      ) : null}
    </>
  )
}
