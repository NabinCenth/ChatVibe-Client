import React from 'react'
import "./Container.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import Name from './Name/Name'
import MsgWindow from './MsgContainer/MsgWindow'
function Container() {
  return (<>
  <div className='Container-b'>
    <div className='Name-1'><Name/> </div>
  <div className='MsgWindow-b'><MsgWindow/> </div>
  </div> 

  <div> </div>
  
    </>
    
  )
}

export default Container