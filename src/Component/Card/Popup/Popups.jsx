import React from 'react'
import "./Popups.css"
const Popups = (props) => {
  return (
    <div className={props.className}>{props.message}</div>
  )
}

export default Popups
