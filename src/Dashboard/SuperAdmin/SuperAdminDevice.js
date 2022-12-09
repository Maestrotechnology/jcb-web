import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import classes from './SuperAdmin.module.css'
import * as Yup from 'yup'
import { NAME_REGEX } from '../../Utilities/Constants'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import ReactPaginate from 'react-paginate'
import { deleteDeviceService, listDeviceService } from '../../Services/Services'
import Loader from '../../Loader'
import DeleteConfirmationModal from '../../ModalComponents/DeleteConfirmationModal'
import toast from 'react-hot-toast'
import EditImage from '../../Assets/Icons/table_edit.png'
import DeleteImage from '../../Assets/Icons/table_delete.png'
import EditDeviceModal from '../../ModalComponents/EditDeviceModal'
import LeftArrowImage from '../../Assets/Icons/paginate_left_arrow.png'
import RightArrowImage from '../../Assets/Icons/paginate_right_arrow.png'
const wrokReportSchema = Yup.object({
  device_name: Yup.string().matches(NAME_REGEX, 'Enter valid vehicle name'),
})

export default function SuperAdminDevice() {
  useEffect(() => {
    handleSuperAdminListDevice()
  }, [])
  const [isEditModal, setIsEditModal] = useState({ show: false, data: null })
  const [page, setPage] = useState(0)
  const maxDate = new Date()
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      device_name: '',
      fromDate: '',
      toDate: '',
      deviceData: [],
      isDelete: { show: false, delete_id: '' },
      isLoader: false,
    },
    validationSchema: wrokReportSchema,
    validate: () => {
      let err = {}
      if (Date.parse(values.fromDate) > Date.parse(values.toDate)) {
        err.toDate = 'To date must be before from date'
      }
      return err
    },
    onSubmit: values => {
      handleSuperAdminListDevice(1, values)
    },
  })

  const handleSuperAdminListDevice = (pageNum = 1, data) => {
    setFieldValue('isLoader', true)
    let formData = new FormData()
    formData.append('device_name', data?.device_name ? data?.device_name : '')
    formData.append('device_code', '')
    listDeviceService(formData, pageNum)
      .then(res => {
        setFieldValue('deviceData', res.data)
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

  const handleSuperAdminDeleteDevice = delete_id => {
    setFieldValue('isLoader', true)
    deleteDeviceService(parseInt(delete_id))
      .then(res => {
        toast(res.data, { type: 'success' })
        handleSuperAdminListDevice()
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
      {values.isDelete.show ? (
        <DeleteConfirmationModal
          show={values.isDelete.show}
          close={() =>
            setFieldValue('isDelete', {
              ...values.isDelete,
              show: false,
            })
          }
          handleSuperAdminDeleteDevice={handleSuperAdminDeleteDevice}
          delete_id={values.isDelete.delete_id}
        />
      ) : null}
      <div className={classes.conatiner}>
        <p className={classes.title}>Devices</p>
        <div className="row">
          <div className="col-md-4 col-lg-3 col-sm-6 col-12 my-2">
            <p className={classes.label}>Device Name</p>
            <input
              name="device_name"
              className={classes.input}
              placeholder="Enter device name"
              onChange={handleChange}
              value={values.device_name}
              maxLength="15"
            />
            {touched.device_name && errors.device_name && (
              <p className="inputErrorTxt">{errors.device_name}</p>
            )}
          </div>

          <div className="col-md-4 col-lg-3 col-sm-6 col-12 my-2">
            <p className={classes.label}>From Date</p>
            <input
              type="date"
              name="fromDate"
              className={classes.input}
              value={values.fromDate}
              onChange={handleChange}
              max={dayjs(maxDate).format('YYYY-MM-DD')}
            />
            {touched.fromDate && errors.fromDate && (
              <p className="inputErrorTxt">{errors.fromDate}</p>
            )}
          </div>

          <div className="col-md-4 col-lg-3 col-sm-6 col-12 my-2">
            <p className={classes.label}>To Date</p>
            <input
              type="date"
              name="toDate"
              className={classes.input}
              value={values.toDate}
              onChange={handleChange}
              max={dayjs(maxDate).format('YYYY-MM-DD')}
            />
            {touched.toDate && errors.toDate && (
              <p className="inputErrorTxt">{errors.toDate}</p>
            )}
          </div>
          <div className="col-md-12 my-2 d-flex justify-content-end align-items-center">
            <button className="cancelBtn" onClick={resetForm}>
              Reset
            </button>
            <button className="saveBtn" onClick={handleSubmit}>
              Search
            </button>
          </div>
        </div>
        <Table striped bordered hover responsive className="mt-4">
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
            {values?.deviceData?.items?.map((ele, index) => (
              <tr key={ele.device_id} className="text-center">
                <td>
                  {(values?.deviceData.page - 1) * values?.deviceData.size +
                    (index + 1)}
                </td>
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
                      setFieldValue('isDelete', {
                        show: true,
                        delete_id: ele.device_id,
                      })
                    }}
                  />
                </td>
              </tr>
            ))}
            {values?.deviceData?.items?.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No Data Found
                </td>
              </tr>
            ) : null}
          </tbody>
        </Table>

        {values?.deviceData?.total > 10 ? (
          <div className={classes.paginateContainer}>
            <ReactPaginate
              previousLabel={<img src={LeftArrowImage} alt="left" />}
              nextLabel={<img src={RightArrowImage} alt="right" />}
              breakLabel="..."
              pageCount={Math.ceil(values?.deviceData?.total) / 10}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              onPageChange={({ selected }) =>
                handleSuperAdminListDevice(selected + 1)
              }
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
      </div>
    </>
  )
}
