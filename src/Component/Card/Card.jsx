import React from 'react'
import './Card.css'
import{io} from 'socket.io-client'
function Card(props) {

  return (
    <div className='connect-btn' onClick={props.myhandle}>Start The chat</div>
  )
}

export default Card