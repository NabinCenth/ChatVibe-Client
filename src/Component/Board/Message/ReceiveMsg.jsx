import React from 'react'

function ReceiveMsg(props) {
  return (
    <> <div className="containerR"> 
    <div className="Namer">{props.handlenamerev}</div>
    <div className='ReceiveMsg'>{props.msg}</div>
      <div className="Timestampr">{props.handletime}</div>
      </div>
    
       </>
  )
}

export default ReceiveMsg