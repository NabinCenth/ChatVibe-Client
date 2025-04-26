import React from 'react'
import "./Container.css"
import Name from './Name/Name'

import Input from '../footer/Input';
import Send from '../footer/Send';
import ReceiveMsg from './Message/ReceiveMsg';
import SendMsg from './Message/SendMsg';



function Container() {
  return (<>
  <div className='Container-b'>
    <div className='Name-1'><Name/> </div>
  <div className='MsgWindow-b'> <ReceiveMsg/> <ReceiveMsg/><ReceiveMsg/> <SendMsg/> </div>
  <div className='footer'>
    <Input className="input-b"/> <Send className="send-b"/></div>
  
  </div> 

  
  
    </>
    
  )
}

export default Container