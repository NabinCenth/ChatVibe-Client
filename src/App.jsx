import { useState } from 'react'
import{io} from 'socket.io-client'
import './App.css'
import { useEffect } from 'react';
import Title from './Component/Head/Title';
import Container from './Component/Board/Container';
function App() {
useEffect(()=>{
  // const Socket= io('http://localhost:3000');

},[]);
  return (
    <>
      <Title className="title"/>
      <Container/>
    </>
  )
}

export default App
