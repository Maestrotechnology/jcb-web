import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useOutletContext } from 'react-router-dom'
import { deleteDeviceService, listDeviceService } from '../../Services/Services'
import classes from './Admin.module.css'
import EditImage from '../../Assets/Icons/table_edit.png'
import DeleteImage from '../../Assets/Icons/table_delete.png'
import AddDeviceModal from '../../ModalComponents/AddDeviceModal'
import EditDeviceModal from '../../ModalComponents/EditDeviceModal'
import Loader from '../../Loader'
import ReactPaginate from 'react-paginate'
import LeftArrowImage from '../../Assets/Icons/paginate_left_arrow.png'
import RightArrowImage from '../../Assets/Icons/paginate_right_arrow.png'
import DeleteConfirmationModal from '../../ModalComponents/DeleteConfirmationModal'
export default function Devices() {
  const { searchData, isAddModal, setIsAddModal } = useOutletContext()
  const [isEditModal, setIsEditModal] = useState({ show: false, data: null })
  const [isLoader, setIsLoader] = useState(false)
  const [deviceData, setDeviceData] = useState([])
  const [page, setPage] = useState(0)
  const [isDelete, setIsDelete] = useState({ show: false, delete_id: '' })

  useEffect(() => {
    handleListDevice()
  }, [searchData])

  const handleListDevice = (pageNum = 1) => {
    setIsLoader(true)
    let formData = new FormData()
    formData.append('device_name', searchData ? searchData : '')
    formData.append('device_code', '')
    listDeviceService(formData, pageNum)
      .then(res => {
        setDeviceData(res.data)
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

  const handleDeleteDevice = delete_id => {
    setIsLoader(true)
    deleteDeviceService(parseInt(delete_id))
      .then(res => {
        toast(res.data, { type: 'success' })
        handleListDevice()
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
      {isAddModal.name === 'device' && isAddModal.show ? (
        <AddDeviceModal
          deviceData={deviceData}
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
        <EditDeviceModal
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
          handleDeleteDevice={handleDeleteDevice}
          delete_id={isDelete.delete_id}
        />
      ) : null}

      <Table striped bordered responsive className="mt-4">
        <thead className={classes.tableResponsive}>
          <tr className="text-center">
            <th>S.No</th>
            <th>Date</th>
            <th>Device Name</th>
            <th>Device Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={classes.tableBody}>
          {deviceData?.items?.map((ele, index) => (
            <tr key={ele.device_id} className="text-center">
              <td>{(deviceData.page - 1) * deviceData.size + (index + 1)}</td>
              <td>{ele.created_at}</td>
              <td>{ele.device_name}</td>
              <td>{ele.device_code}</td>
              <td>
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
                        delete_id: ele.device_id,
                      }
                    })
                  }}
                />
              </td>
            </tr>
          ))}
          {deviceData?.items?.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No Data Found
              </td>
            </tr>
          ) : null}
        </tbody>
      </Table>

      {deviceData?.total > 10 ? (
        <div className={classes.paginateContainer}>
          <ReactPaginate
            previousLabel={<img src={LeftArrowImage} alt="left" />}
            nextLabel={<img src={RightArrowImage} alt="right" />}
            breakLabel="..."
            pageCount={Math.ceil(deviceData.total) / 10}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={({ selected }) => handleListDevice(selected + 1)}
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
