import React from 'react'
import classes from './ActiveInactiveToggle.module.css'
export default function ActiveInactiveToggle({
  id,
  isChecked = false,
  handleChange,
}) {
  return (
    <>
      <input
        key={id}
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          handleChange({
            status: !isChecked,
          })
        }}
        className={classes.activeToggle}
      />
    </>
  )
}
