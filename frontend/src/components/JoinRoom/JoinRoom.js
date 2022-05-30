import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  Button,
  InputLabel,
  Input,
  FormHelperText,
  Box
} from "@mui/material";

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
        console.log(data);
        socket.on("new_message", (data) => {
          console.log(data, "hello");
        });
        navigate("/chat");
      }
    });
  };
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <FormControl>
        <InputLabel htmlFor="my-name">Enter your name</InputLabel>
        <Input
          id="my-name"
          aria-describedby="my-helper-text"
          onChange={(e) => setName(e.target.value)}
        />
        <FormHelperText id="my-helper-text">
          The name you enter will be visible to other users.
        </FormHelperText>
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="room">Enter room name</InputLabel>
        <Input
          id="room"
          aria-describedby="my-helper-text"
          onChange={(e) => setRoom(e.target.value)}
        />
        <FormHelperText id="my-helper-text">
          Enter the name of the room to create or connect
        </FormHelperText>
      </FormControl>
      <Button onClick={joinRoom} variant="outlined">
        Join room
      </Button>
    </Box>
  );
};
