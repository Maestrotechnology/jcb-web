import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import classes from './SuperAdmin.module.css'
import * as Yup from 'yup'
import { MOBILE_REGEX, NAME_REGEX } from '../../Utilities/Constants'
import { useFormik } from 'formik'
import {
  deleteCompanyAdminService,
  listCompanyAdminService,
} from '../../Services/Services'
import toast from 'react-hot-toast'
import AddSuperAdminCustomerModal from '../../ModalComponents/AddSuperAdminCustomerModal'
import ReactPaginate from 'react-paginate'
import LeftArrowImage from '../../Assets/Icons/paginate_left_arrow.png'
import RightArrowImage from '../../Assets/Icons/paginate_right_arrow.png'
import EditImage from '../../Assets/Icons/table_edit.png'
import DeleteImage from '../../Assets/Icons/table_delete.png'
import DeleteConfirmationModal from '../../ModalComponents/DeleteConfirmationModal'
import EditSuperAdminCustomerModal from '../../ModalComponents/EditSuperAdminCustomerModal'
const wrokReportSchema = Yup.object({
  customer_name: Yup.string().matches(NAME_REGEX, 'Enter valid customer name'),
  mobile_no: Yup.string().matches(MOBILE_REGEX, 'Enter valid mobile number'),
})

export default function SuperAdminHomeDashboard() {
  useEffect(() => {
    handleListCustomer()
  }, [])

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      customer_name: '',
      mobile_no: '',
      isLoader: false,
      isAddCustomer: false,
      customerData: [],
      isEdit: { show: false, data: null },
      isDelete: { show: false, delete_id: '' },
      page: 0,
    },
    validationSchema: wrokReportSchema,
    onSubmit: values => {
      handleListCustomer(1, values)
    },
  })

  const handleListCustomer = (PageNum = 1, data) => {
    setFieldValue('isLoader', true)
    let formData = new FormData()
    formData.append(
      'customer_name',
      data?.customer_name ? data?.customer_name : ''
    )
    if (data?.mobile_no) {
      formData.append('mobile_no', data?.mobile_no)
    }
    listCompanyAdminService(formData, PageNum)
      .then(res => {
        setValues({
          ...values,
          customerData: res.data,
          page: PageNum - 1,
        })
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

  const handleSuperAdminDeleteCustomer = delete_id => {
    setFieldValue('isLoader', true)
    deleteCompanyAdminService(parseInt(delete_id))
      .then(res => {
        toast(res.data, { type: 'success' })
        handleListCustomer()
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

  const handleResetForm = () => {
    setValues({
      ...values,
      customer_name: '',
      mobile_no: '',
    })
    handleListCustomer()
  }

  return (
    <>
      {values.isAddCustomer ? (
        <AddSuperAdminCustomerModal
          show={values.isAddCustomer}
          close={() => {
            setFieldValue('isAddCustomer', false)
          }}
          handleListCustomer={handleListCustomer}
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
          handleSuperAdminDeleteCustomer={handleSuperAdminDeleteCustomer}
          delete_id={values.isDelete.delete_id}
        />
      ) : null}

      {values.isEdit.show ? (
        <EditSuperAdminCustomerModal
          show={values.isEdit.show}
          close={() =>
            setFieldValue('isEdit', {
              ...values.isEdit,
              show: false,
            })
          }
          handleListCustomer={handleListCustomer}
          editData={values.isEdit.data}
        />
      ) : null}

      <div className={classes.conatiner}>
        <p className={classes.title}>Customer</p>
        <div className="row">
          <div className="col-md-4 col-lg-3 col-sm-6 col-12 my-2">
            <p className={classes.label}>Customer Name</p>
            <input
              name="customer_name"
              className={classes.input}
              placeholder="Enter customer name"
              onChange={handleChange}
              value={values.customer_name}
              maxLength="25"
            />
            {touched.customer_name && errors.customer_name && (
              <p className="inputErrorTxt">{errors.customer_name}</p>
            )}
          </div>

          <div className="col-md-4 col-lg-3 col-sm-6 col-12 my-2">
            <p className={classes.label}>Mobile No</p>
            <input
              name="mobile_no"
              className={classes.input}
              placeholder="Enter mobile no"
              onChange={handleChange}
              value={values.mobile_no}
              maxLength="10"
              onKeyPress={e => {
                if (e.key === '0' || parseInt(e.key)) {
                } else {
                  e.preventDefault()
                }
              }}
            />
            {touched.mobile_no && errors.mobile_no && (
              <p className="inputErrorTxt">{errors.mobile_no}</p>
            )}
          </div>

          <div className="col-md-12 d-flex justify-content-end align-items-center my-2">
            <button className="cancelBtn" onClick={handleResetForm}>
              Reset
            </button>
            <button className="saveBtn" onClick={handleSubmit}>
              Search
            </button>
            <button
              className={classes.addCustomerBtn}
              onClick={() => {
                setFieldValue('isAddCustomer', true)
              }}
            >
              Add
            </button>
          </div>
        </div>
        <Table striped bordered responsive className="mt-4">
          <thead className={classes.tableResponsive}>
            <tr className="text-center">
              <th>S.No</th>
              <th>Company Code</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={classes.tableBody}>
            {values?.customerData?.items?.map((ele, index) => (
              <tr key={ele.company_admin_id} className="text-center">
                <td>
                  {(values?.customerData?.page - 1) *
                    values?.customerData?.size +
                    (index + 1)}
                </td>
                <td>{ele?.company_code}</td>
                <td>{ele?.name}</td>
                <td>{ele?.mobile_no}</td>
                <td>{ele?.created_at}</td>
                <td>
                  <img
                    className={classes.actionIcons}
                    src={EditImage}
                    alt="edit icon"
                    onClick={() =>
                      setFieldValue('isEdit', {
                        show: true,
                        data: ele,
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
                        delete_id: ele.company_admin_id,
                      })
                    }}
                  />
                </td>
              </tr>
            ))}
            {values?.customerData?.items?.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No Data Found
                </td>
              </tr>
            ) : null}
          </tbody>
        </Table>
        {values?.customerData?.total > 10 ? (
          <div className={classes.paginateContainer}>
            <ReactPaginate
              previousLabel={<img src={LeftArrowImage} alt="left" />}
              nextLabel={<img src={RightArrowImage} alt="right" />}
              breakLabel="..."
              pageCount={Math.ceil(values?.customerData?.total) / 10}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              onPageChange={({ selected }) => handleListCustomer(selected + 1)}
              forcePage={values.page}
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
