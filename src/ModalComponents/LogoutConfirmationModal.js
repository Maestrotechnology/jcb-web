import React from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '../Utilities/Cookies'

export default function LogoutConfirmationModal({ show, close }) {
  const navigate = useNavigate()
  const handleLogout = () => {
    setCookie('jcbLoginData', null, null)
    close()
    window.location.reload()
  }

  return (
    <Modal centered size="sm" show={show}>
      <Modal.Body>
        <p className="mb-0 text-center">Are you sure want to logout ? </p>
        <div className="col-md-12 d-flex justify-content-around mt-3">
          <button className="cancelBtn w-50" onClick={close}>
            No
          </button>
          <button className="saveBtn w-50" onClick={handleLogout}>
            Yes
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
