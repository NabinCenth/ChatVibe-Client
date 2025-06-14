import { useState } from "react";
import { io, Socket } from "socket.io-client";
import "./App.css";
import { useEffect } from "react";
import Title from "./Component/Head/Title";
import Container from "./Component/Board/Container";
import Card from "./Component/Card/Card";
function App() {
  const [room, setRoom] = useState("");
  const [Name, setName] = useState("");
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [emptymsg, setEmptyMsg] = useState(true);
  const roomname = (roomname) => {
    if (roomname.trim() == "") {
      alert(
        "You Havent Entered Room Name So you will be added to general room"
      );
      return;
    }
    setRoom(roomname);
    console.log("room name from app", roomname);
  };
  const handleClick = (name) => {
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
      tempSocket.emit("name", name);
      socket?.on("name", (name) => {
        console.log("name from server", name);
      });
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
  useEffect(() => {
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
      name: Name,
      text: messages,
      time: getCurrentTime(),
    };
    setMessage(Remotemessageobj);
    console.log("name from sender", Remotemessageobj);
    console.log("room from sender", room);
    socket.emit("room", room);
    socket.emit("message", Remotemessageobj);
  };
  const [isstarted, setIsStarted] = useState(true);
  const [isown, setIsOwn] = useState(true);

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
