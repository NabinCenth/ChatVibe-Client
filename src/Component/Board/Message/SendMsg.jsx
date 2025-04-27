import React from 'react'

function SendMsg(props) {

  return (<>
  
   <div className="containerS"> 
  <div className='SendMsg'> {props.msg}</div>
    <div className="Timestamps">{props.handletime}</div>
    </div>
  
     </>
    
  )
}

export default SendMsg