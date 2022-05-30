import React, { useState } from "react";
import { JoinRoom } from "../JoinRoom/JoinRoom";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { io } from "socket.io-client";

export const App = () => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState({});
  const [messageReceiver, setMessageReceiver] = useState("");
  const socket = io.connect("http://localhost:8080");


  return (
    <Container maxWidth="sm">
      <Routes>
        <Route
          path="/"
          element={
            <JoinRoom
              room={room}
              user={user}
              setUser={setUser}
              setRoom={setRoom}
              name={name}
              setName={setName}
              socket={socket}
            />
          }
        />
        <Route
          path="/chat"
          element={
            <ChatRoom
              socket={socket}
              user={user}
              messageReceiver={messageReceiver}
              room={room}
              setMessageReceiver={setMessageReceiver}
            />
          }
        />
      </Routes>
    </Container>
  );
};
