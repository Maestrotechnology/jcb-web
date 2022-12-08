import React from 'react'
import classes from './Error.module.css'
import NetworkErrorGif from '../Assets/Images/network_error.gif'
export default function ErrorElement() {
  return (
    <div className={classes.errorTxt}>
      <img
        src={NetworkErrorGif}
        alt="network error"
        className={classes.networkErrorImg}
      />
      Network Error !!!
    </div>
  )
}
