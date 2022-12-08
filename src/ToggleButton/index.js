import React from 'react'
import classes from './Toggle.module.css'
export default function Toggle({ id, isChecked = false, handleChange }) {
  console.log(isChecked, id, '===toggle')
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
        className={classes.input}
      />
    </>
  )
}
