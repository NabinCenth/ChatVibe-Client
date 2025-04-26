import React from 'react'
import "./Send.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
function Send() {
  return (
    <> <div className='send' >
     <div className='send-b'>Send</div>
        <FontAwesomeIcon icon={faPaperPlane} className='send-icon' />
        </div>
        
        </>
       
    
  )
}

export default Send