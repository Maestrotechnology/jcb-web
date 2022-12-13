import React from 'react'
import { Modal } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

export default function DeleteConfirmationModal({
  show,
  close,
  handleDeleteVehicle,
  handleDeleteOperator,
  handleDeleteDevice,
  handleDeleteChargeSetting,
  handleSuperAdminDeleteCustomer,
  handleSuperAdminDeleteDevice,
  delete_id,
}) {
  const { pathname } = useLocation()

  const handleDelete = () => {
    if (pathname === '/admin_dashboard/vehicle_details') {
      handleDeleteVehicle()
    } else if (pathname === '/admin_dashboard/operator_details') {
      handleDeleteOperator(delete_id)
    } else if (pathname === '/admin_dashboard/device_details') {
      handleDeleteDevice(delete_id)
    } else if (pathname === '/admin_dashboard/charge_setting_details') {
      handleDeleteChargeSetting(delete_id)
    } else if (pathname === '/superadmin_dashboard') {
      handleSuperAdminDeleteCustomer(delete_id)
    } else if (pathname === '/superadmin_dashboard/devices') {
      handleSuperAdminDeleteDevice(delete_id)
    }
    close()
  }

  return (
    <Modal centered size="sm" show={show}>
      <Modal.Body>
        <p className="mb-0 text-center">Are you sure want to delete ? </p>
        <div className="col-md-12 d-flex justify-content-around mt-3">
          <button className="cancelBtn w-50" onClick={close}>
            No
          </button>
          <button className="saveBtn w-50" onClick={handleDelete}>
            Yes
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
