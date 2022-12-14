import React from 'react'
import { Modal } from 'react-bootstrap'
import classes from './Modal.module.css'
import CancelImage from '../Assets/Icons/rounded_cancel.png'
export default function ViewSuperAdminDeviceModal({ show, close, viewData }) {
  return (
    <Modal centered show={show} size="lg">
      <Modal.Body>
        <div className={classes.titleContainer}>
          <p className={classes.title}>Device</p>
          <img
            src={CancelImage}
            className={classes.cancelImage}
            onClick={close}
            alt="cancel icon"
          />
        </div>
        <div className="row border-top">
          <div className="col-md-4 col-lg-4 col-sm-12 my-2">
            <p className={classes.label + ' text-center'}>Device Name</p>
            <div className={classes.viewDeviceCard}>
              {viewData?.device_name}
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-sm-12 my-2">
            <p className={classes.label + ' text-center'}>Device Code</p>
            <div className={classes.viewDeviceCard}>
              {viewData?.device_code}
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-sm-12 my-2">
            <p className={classes.label + ' text-center'}>Date</p>
            <div className={classes.viewDeviceCard}>{viewData?.created_at}</div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
