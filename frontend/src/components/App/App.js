import React from "react";
import { JoinRoom } from "../JoinRoom/JoinRoom";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { io } from "socket.io-client";

export const App = () => {
  const socket = io.connect("http://localhost:8080");


  return (
    <Container maxWidth="sm">
      <Routes>
        <Route path="/" element={<JoinRoom socket={socket} />} />
        <Route
          path="/chat"
          element={<ChatRoom socket={socket} />}
        />
      </Routes>
    </Container>
  );
};
