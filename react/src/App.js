
import { useState } from 'react';
import './App.css';
import io from "socket.io-client";
import Chat from "./components/Chat";


const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a chat</h3>
          <input type='text' placeholder='john...' value={username} onChange={(event) => setUsername(event.target.value)}></input>
          <input type="text" placeholder='Room Id' value={room} onChange={(event) => setRoom(event.target.value)}></input>
          <button onClick={() => joinRoom()}> Join a Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}


    </div>
  );
}

export default App;
