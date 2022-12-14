import React from 'react'
import { Modal } from 'react-bootstrap'
import CancelImage from '../Assets/Icons/rounded_cancel.png'
import classes from './Modal.module.css'
import ImageNotFound from '../Assets/Images/Image_not_available.png'
export default function ViewImagesModal({ show, close, imageUrl }) {
  return (
    <Modal centered size="lg" show={show}>
      <Modal.Body className="d-flex justify-content-center position-relative">
        <img
          src={CancelImage}
          className={classes.cancelIcon}
          onClick={close}
          alt="cancel icon"
        />
        <img src={ImageNotFound} className={classes.viewImg} alt="view icon" />
      </Modal.Body>
    </Modal>
  )
}
