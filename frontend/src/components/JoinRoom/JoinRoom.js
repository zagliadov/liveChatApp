import React from "react";
import { useNavigate } from "react-router-dom";

export const JoinRoom = ({
  user,
  setUser,
  room,
  name,
  setRoom,
  setName,
  socket,
}) => {
  let navigate = useNavigate();

  const joinRoom = () => {
    socket.emit("user_joined", { name, room }, (data) => {
      if (typeof data === "string") {
        console.error(data);
      } else {
        setUser({
          name: name,
          room: room,
          id: data.userId,
        });
        console.log(data)
        socket.on('new_message', (data) => {
          console.log(data, 'hello')
        })
        navigate("/chat");
      }
    });
  };
  return (
    <>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <input type="text" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join Room</button>
    </>
  );
};
