import React from 'react'
import "./Container.css"
import Name from './Name/Name'
import Footer from '../footer/Footer'
import ReceiveMsg from './Message/ReceiveMsg';
import SendMsg from './Message/SendMsg';
import { useState } from 'react';
import { useEffect } from 'react';

function Container(props) {

const [sendMsg1,setSendMsg]=useState("");
const getsendMsg=(msg)=>{
  setSendMsg(msg);
  addMessage(msg);
  console.log("sendmsg",sendMsg1);
   
}

const [messages,setMessages]=useState([]);
const addMessage = (message) => {
  setMessages((prev) => [...prev, { text:message, isOwn: true }]);
  setSendMsg("");
  console.log("sendmsg in map",message);
   // Clear input
};
  return (<>
  
  <div className='Container-b'>
    <div className='Name-1'><Name/> </div>
  <div className='MsgWindow-b'> <ReceiveMsg/>   
  {/* Mounting the message from receiver */}
  {props.handlemsgremote.map((msg,index)=>{
    return(
      <ReceiveMsg key={index} msg={msg.text} />
    ) 
  })}
  {/* //mounting the message from sender to receiver   */}
  {messages.map((msg, index) => {
  console.log("Current message:", msg);

  return msg.isOwn ? (
    <SendMsg key={index} msg={msg.text} />
  ) : (
    <ReceiveMsg key={index} msg={msg.text} />
  );
})}
        
      
         </div>
  <div className='footer'>
    <Footer handlesendmsg={getsendMsg} whosemsg1={props.whosemsg}  handlemsgfromsender={props.handlemsgfromsender}/></div>
  
  </div> 

  
  
    </>
    
  )
}

export default Container