import React from 'react'

function ReceiveMsg(props) {
  return (
    <> <div className="containerR"> 
    <div className="Namer">Ram</div>
    <div className='ReceiveMsg'>{props.msg}</div>
      <div className="Timestampr">9:30pm</div>
      </div>
    
       </>
  )
}

export default ReceiveMsg