import { useState } from "react";
import { io, Socket } from "socket.io-client";
import "./App.css";
import { useEffect } from "react";
import Title from "./Component/Head/Title";
import Container from "./Component/Board/Container";
import Card from "./Component/Card/Card";
import Popups from "./Component/Card/Popup/Popups"; 
function App() {
  const [users, setUsers] = useState("");
  const [nameexit, setNameExit] = useState(false);
  const[namepopup,setNamePopup]=useState(false);
  const [showPopup ,setShowPopup]=useState(true);
  const [exitPhase, setExitPhase] = useState(false);
  const [ServerRoomName, setServerRoomName] = useState("");
  const [room, setRoom] = useState("");
  const [Name, setName] = useState("");
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [emptymsg, setEmptyMsg] = useState(true);
  const roomname = (roomname) => {
    if (roomname.trim() == "") {
      setRoom("General");
    alert("You haven't entered a room name. You'll be added to the general room by default.");

      return;
    }
    setRoom(roomname);
    console.log("room name from app", roomname);
  };
  const handleClick = (name,roomname) => {
    if (name.trim() == "") {
      alert("Please enter your name");
      return;
    }
    

    setIsStarted(false);
    const tempSocket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
    });
    tempSocket.on("connect", () => {
      console.log("name in socket", name);
      console.log("room in socket", room);
      tempSocket.emit("name", name,roomname);//added the room and name
      socket?.on("name", (name) => {
        console.log("name from server", name);
      });
      // socket?.emit("room", room, roomCallback);
    });
    setName(name);
    setSocket(tempSocket);
  };

  //REcived message in array
  const [receivemsg, setReceiveMsg] = useState([]);
  const Addreceivemsg = (message) => {
    setReceiveMsg((prev) => [...prev, { text: message, isOwn: false }]);
  };
  // ADD All messages in array
  const [allmessages, setAllMessages] = useState([]);
  const addAllMessages = (message, isOwn, time, name) => {
    if (message == "") {
      return;
    }
    setAllMessages((prev) => [
      ...prev,
      { text: message, isOwn: isOwn, time: time, name: name },
    ]);
  };
  //use effect for the name 
  useEffect(()=>{
     // Set exit phase after 3s
  if(namepopup){      setTimeout(() => {
      setNameExit(true);
   
    }, 3000);

    // Fully remove popup after 4s
    setTimeout(() => {
      console.log("name exit phase", nameexit);
      setNamePopup(false);
            setUsers("");
            console.log("name popup", namepopup);
    }, 4000);   
    }
  }, [namepopup,socket]);
  //use effect for socket connection

  useEffect(() => {
    // attaching the popupof room
   if (room){
    setTimeout(() => {
  setExitPhase(true);
  console.log("exit phase", exitPhase);
}, 3000);
    setTimeout(() => {
      setShowPopup(false);

    }, 4000);
   }
   //listing for the new joined users
     socket?.on("users-name", (name) => {
     setUsers(name);           // Set name immediately
setNamePopup(true); // Show popup immediately
  
    }
  
   
  ); 

  
   //connecting to socket
    console.log("hello from use effec3333");
    socket?.on("connect", () => {
      socket?.on("name", (name) => {
        console.log("name from server", name);
      });
      socket?.on("message", (Remotemessageobj) => {
        console.log("message from server", Remotemessageobj);
        setEmptyMsg(false);
        Addreceivemsg(Remotemessageobj.text);
        addAllMessages(
          Remotemessageobj.text,
          false,
          Remotemessageobj.time,
          Remotemessageobj.name
        );
      });
      console.log("connected to server", message);
    });
      
  }, [socket]);
  //get time
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  const getmsgfromsender = (messages) => {
    console.log("message from sender", messages);
    setEmptyMsg(false);
    const Remotemessageobj = {
      room: room,
      name: Name,
      text: messages,
      time: getCurrentTime(),
    };
    setMessage(Remotemessageobj);
    console.log("name from sender", Remotemessageobj);
    console.log("room from sender", room);
    socket.emit("message", Remotemessageobj);
  };
  const [isstarted, setIsStarted] = useState(true);
  const [isown, setIsOwn] = useState(true);
//getting callback from room 
const roomCallback=(roomname)=>{
if (roomname.trim() === "") {
      setServerRoomName("General");
}

else {
      setServerRoomName(roomname);
    }
  }
  return (
    <>
      {isstarted ? (
        <Card
          setIsStarted={setIsStarted}
          handleRoomName={roomname}
          myhandle={handleClick}
        />
      ) : (
        <>
       {showPopup?<Popups className={exitPhase ? "container-hide " : " container-show"} message={`🎉 Welcome ${Name} to the "${room}" room!`} />:null}
          {namepopup ?
          <Popups 
          className={nameexit ? "container-hide " : " container-show"} 
          message={`👋 ${users} just joined the room!`}
          />
          : null}
          <Title className="title" />
          <Container
            handlemsgfromsender={getmsgfromsender}
            printmsg={allmessages}
            handlesavemsg={addAllMessages}
            handlemsgremote={receivemsg}
            currentu={isown}
            whosemsg={setIsOwn}
            handlemyname={Name}
            isemptymsg={emptymsg}
          />
        </>
      )}
    </>
  );
}

export default App;
