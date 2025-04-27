import React from 'react'

function SendMsg(props) {
  return (<>
  
   <div className="containerS"> 
  <div className='SendMsg'> {props.msg}</div>
    <div className="Timestamps">9:30pm</div>
    </div>
  
     </>
    
  )
}

export default SendMsg