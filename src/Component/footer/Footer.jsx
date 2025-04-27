import React from 'react'
import "./Send.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Footer=(props)=>{
  
  const [message,setMessage]=useState("");
  const handleChange=(e)=>{
   if(e.target.value==""){
    return ;
   }
    return( setMessage(e.target.value)) ;
   
  };
  const handleClick=()=>{

    props.handlesendmsg(message);
    props.handlemsgfromsender(message);
    props.whosemsg1(true);
    console.log(message);
    setMessage("");
  };
return(
  <> 
  <input className=' input-b' value={message}  onChange={handleChange}  /> 
  <div className='send' >
     <div className='send-b' onClick={handleClick} >Send</div>
        <FontAwesomeIcon icon={faPaperPlane} className='send-icon' />
        </div>
  </>
)
};

export default Footer;