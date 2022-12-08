import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import classes from './Admin.module.css'
import EditImage from '../../Assets/Icons/table_edit.png'
import DeleteImage from '../../Assets/Icons/table_delete.png'
import Toggle from '../../ToggleButton'
import toast from 'react-hot-toast'
import Loader from '../../Loader'
import ReactPaginate from 'react-paginate'
import LeftArrowImage from '../../Assets/Icons/paginate_left_arrow.png'
import RightArrowImage from '../../Assets/Icons/paginate_right_arrow.png'
import {
  changePermissionService,
  deleteOperatorService,
  listOperatorService,
} from '../../Services/Services'
import { useOutletContext } from 'react-router-dom'
import AddOperatorModal from '../../ModalComponents/AddOperatorModal'
import EditOperatorModal from '../../ModalComponents/EditOperatorModal'
import DeleteConfirmationModal from '../../ModalComponents/DeleteConfirmationModal'
export default function Operator() {
  const { searchData, isAddModal, setIsAddModal } = useOutletContext()
  const [isEditModal, setIsEditModal] = useState({ show: false, data: null })
  const [isLoader, setIsLoader] = useState(false)
  const [operatorData, setOperatorData] = useState([])
  const [page, setPage] = useState(0)
  const [isDelete, setIsDelete] = useState({ show: false, delete_id: '' })

  useEffect(() => {
    handleListOperator()
  }, [searchData])

  const handleListOperator = (pageNum = 1) => {
    setIsLoader(true)
    let formData = new FormData()
    formData.append('operator_name', searchData ? searchData : '')
    listOperatorService(formData, pageNum)
      .then(res => {
        setOperatorData(res.data)
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
    formData.append('operator_id', parseInt(id))
    formData.append('permission_status', status === true ? 1 : 0)
    changePermissionService(formData)
      .then(res => {
        toast(res.data, { type: 'success' })
        handleListOperator()
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

  const handleDeleteOperator = delete_id => {
    setIsLoader(true)
    deleteOperatorService(delete_id)
      .then(res => {
        toast(res.data, { type: 'success' })
        handleListOperator()
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
      {isAddModal.name === 'operator' && isAddModal.show ? (
        <AddOperatorModal
          handleListOperator={handleListOperator}
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
        <EditOperatorModal
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
          handleDeleteOperator={handleDeleteOperator}
          delete_id={isDelete.delete_id}
        />
      ) : null}

      <Table striped bordered hover responsive>
        <thead className={classes.tableResponsive}>
          <tr className="text-center">
            <th>S.No</th>
            <th>Operator Name</th>
            <th>Contact</th>
            <th>Join Date</th>
            <th>Address</th>
            <th>Change Vehicle Charge</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={classes.tableBody}>
          {operatorData?.items?.map((ele, index) => (
            <tr className="text-center">
              <td>
                {(operatorData.page - 1) * operatorData.size + (index + 1)}
              </td>
              <td>
                {ele.operator_name.length > 30
                  ? ele.operator_name.substring(0, 25) + '...'
                  : ele.operator_name}
              </td>
              <td>{ele.mobile_no}</td>
              <td>{ele.joined_date}</td>
              <td>
                {ele.address.length > 70
                  ? ele.address.substring(0, 70) + '...'
                  : ele.address}
              </td>
              <td>
                <Toggle
                  id={index}
                  isChecked={ele?.permission_status === 0 ? false : true}
                  handleChange={({ status }) => {
                    handleChangePermissionStatus(ele.operator_id, status)
                  }}
                />
              </td>
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
                        delete_id: ele.operator_id,
                      }
                    })
                  }}
                />
              </td>
            </tr>
          ))}
          {operatorData?.items?.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No Data Found
              </td>
            </tr>
          ) : null}
        </tbody>
      </Table>
      {operatorData?.total > 10 ? (
        <div className={classes.paginateContainer}>
          <ReactPaginate
            previousLabel={<img src={LeftArrowImage} alt="left" />}
            nextLabel={<img src={RightArrowImage} alt="right" />}
            breakLabel="..."
            pageCount={Math.ceil(operatorData.total) / 10}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={({ selected }) => handleListOperator(selected + 1)}
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
