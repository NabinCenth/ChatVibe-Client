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
  useEffect(()=>{
    console.log("hello from use effec3333");
    socket?.on("connect",()=>{
      socket?.on("message",(message)=>{
        console.log("message from server",message);
        Addreceivemsg(message);
        
      })
    console.log("connected to server",message);
  })},[handleClick]);

const getmsgfromsender=(message)=>{
  console.log("message from sender",message);
  setMessage(message);
  socket.emit("message",message);
}
const [isstarted,setIsStarted]=useState(true);
const[isown,setIsOwn]=useState(true);


  return (
    <>
{isstarted?<Card setIsStarted={setIsStarted} myhandle={handleClick}/>:null}
      <Title className="title"/>
      <Container handlemsgfromsender={getmsgfromsender} handlemsgremote={receivemsg} currentu={isown}  whosemsg={setIsOwn}/>
    </>
  )
  }

export default App
