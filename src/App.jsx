import { useState } from 'react'
import{io, Socket} from 'socket.io-client'
import './App.css'
import { useEffect } from 'react';
import Title from './Component/Head/Title';
import Container from './Component/Board/Container';
import Card from './Component/Card/Card';
function App() {
  const[socket,setSocket]=useState(null);
  const [message,setMessage]=useState("");
  const handleClick=()=>{
    setIsStarted(false);
   setSocket(io("http://192.168.1.65:3000",{
      transports:["websocket"]
     }) ) 
  }
  //REcived message in array
  const [receivemsg,setReceiveMsg]=useState([]);
  const Addreceivemsg=(message)=>{
    setReceiveMsg((prev)=>([...prev,{text:message,isOwn:false}])); 
  }
  // ADD All messages in array
  const [allmessages,setAllMessages]=useState([]);
  const addAllMessages=(message,isOwn,time)=>{
    if(message==""){
      return ;
    }
    setAllMessages((prev)=>([...prev,{text:message,isOwn:isOwn,time:time}])); 
  }
  useEffect(()=>{
    console.log("hello from use effec3333");
    socket?.on("connect",()=>{
      socket?.on("message",(Remotemessageobj)=>{
        console.log("message from server",Remotemessageobj);
        Addreceivemsg(Remotemessageobj.text);
        addAllMessages(Remotemessageobj.text,false,Remotemessageobj.time);
        
      })
    console.log("connected to server",message);
  })},[handleClick]);
  //get time
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
const getmsgfromsender=(messages)=>{
  console.log("message from sender",messages);
  const Remotemessageobj={
    text:messages,
    time:getCurrentTime()
  }
  setMessage(Remotemessageobj);
  socket.emit("message",Remotemessageobj);
}
const [isstarted,setIsStarted]=useState(true);
const[isown,setIsOwn]=useState(true);


  return (
    <>
{isstarted?<Card setIsStarted={setIsStarted} myhandle={handleClick}/>:null}
      <Title className="title"/>
      <Container handlemsgfromsender={getmsgfromsender} printmsg={allmessages} handlesavemsg={addAllMessages}  handlemsgremote={receivemsg} currentu={isown}  whosemsg={setIsOwn}/>
    </>
  )
  }

export default App
