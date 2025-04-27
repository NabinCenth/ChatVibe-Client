import React from 'react'
import "./Container.css"
import Name from './Name/Name'
import Footer from '../footer/Footer'
import ReceiveMsg from './Message/ReceiveMsg';
import SendMsg from './Message/SendMsg';
import { useState } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { useRef } from 'react';


function Container(props) {
  //gettime
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  //Auto scroll to bottom
  const messagesRef = useRef(null);
useEffect(() => {
  if (messagesRef.current) {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }
}, [props.printmsg]);
const [sendMsg1,setSendMsg]=useState("");
const getsendMsg=(msg)=>{
  setSendMsg(msg);
  addMessage(msg);
  console.log("sendmsg",sendMsg1);
   
}
 const mounter=(whosemsg,msg,time)=>{
console.log("whosemsg",whosemsg);
console.log("what msg",msg);
console.log("time",getCurrentTime());

return whosemsg? ( <SendMsg msg={msg} handletime={getCurrentTime()}/>):(<ReceiveMsg msg={msg} handletime={time}/>)
}

const [messages,setMessages]=useState([]);
const addMessage = (message) => {
  props.handlesavemsg(message,true);
  setMessages((prev) => [...prev, { text:message, isOwn: true }]);
  setSendMsg("");
  console.log("sendmsg in map",message);
   // Clear input
};
  return (<>
  

      <div className='Container-b'>
    <div className='Name-1'><Name/> </div>
  <div className='MsgWindow-b' ref={messagesRef}>   
  {/* Mounting the message from receiver */}
<SendMsg msg="HI"/>
<ReceiveMsg msg="Hello"/>
  {props.printmsg.map((msg, index) => (
    console.log("msg",msg),
              <Fragment key={index}>{mounter(msg.isOwn, msg.text,msg.time)}</Fragment>
            ))}
  
   
    </div>   
       
  <div className='footer'>
    <Footer handlesendmsg={getsendMsg} whosemsg1={props.whosemsg}  handlemsgfromsender={props.handlemsgfromsender}/></div>
  
  </div> 

  

  
  
    </>
    
  )
}

export default Container