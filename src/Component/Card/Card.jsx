import React from 'react'
import './Card.css'
import{io} from 'socket.io-client'
function Card(props) {
 const [name,setName]=React.useState("");
 const [roomname,setRoomName]=React.useState("");
 const handlesend=()=>{
  console.log("name from card",name);
  props.myhandle(name,roomname);
  if (name.trim() === "") {
    return;
  }
      props.handleRoomName(roomname);


 }
const handleChange=(e)=>{
  setName(e.target.value);
}
  return (<> <div className="ContainerC">  
  <div className="Card">
  <div className="Card-header">Join the Vibe</div>
    <input type="text" className="NameREQ" placeholder='Enter Your Name' onChange={handleChange} />
    <input type="text" className="roomreq" placeholder='Enter Room Name' onChange={(e)=>{ setRoomName(e.target.value)}} />
     <div className='connect-btn' onClick={handlesend}>Start The Chat</div></div>
      
    </div> 
    </>
  )
}

export default Card