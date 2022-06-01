import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ActionType } from "../../state/actions";
import { AppContext } from "../../state/AppContext";
import {
  FormControl,
  Button,
  InputLabel,
  Input,
  FormHelperText,
  Box,
} from "@mui/material";

export const JoinRoom = ({ socket }) => {
  const [{ name, room }, dispatch] = useContext(AppContext);
  let navigate = useNavigate();

  const joinRoom = () => {
    if (!name || !room) return;
    socket.emit("user_joined", { name, room }, (data) => {
      dispatch({
        type: ActionType.SET_USER,
        payload: data,
      });
    });
    socket.on('greeting_message', (message) => console.log(message))
    navigate("/chat");
  };

  const inputName = (e) => {
    dispatch({
      type: ActionType.SET_NAME,
      payload: e.target.value,
    });
  };

  const inputRoom = (e) => {
    dispatch({
      type: ActionType.SET_ROOM,
      payload: e.target.value,
    });
  };

  useEffect(() => {
    localStorage.removeItem('name');
    localStorage.removeItem('room');
  }, [])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        paddingTop: "100px",
      }}
    >
      <FormControl sx={{ padding: "10px" }}>
        <InputLabel htmlFor="my-name">Enter your name</InputLabel>
        <Input
          id="my-name"
          aria-describedby="my-helper-text"
          onChange={(e) => inputName(e)}
        />
        <FormHelperText id="my-helper-text">
          The name you enter will be visible to other users.
        </FormHelperText>
      </FormControl>

      <FormControl sx={{ padding: "10px" }}>
        <InputLabel htmlFor="room">Enter room name</InputLabel>
        <Input
          id="room"
          aria-describedby="my-helper-text"
          onChange={(e) => inputRoom(e)}
        />
        <FormHelperText id="my-helper-text">
          Enter the name of the room to create or connect
        </FormHelperText>
      </FormControl>
      <Button onClick={() => joinRoom()} variant="outlined">
        Join room
      </Button>
    </Box>
  );
};
