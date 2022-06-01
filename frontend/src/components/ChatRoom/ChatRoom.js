import React, { useState, useContext, useCallback } from "react";
import { AppContext } from "../../state/AppContext";
import { ActionType } from "../../state/actions";
import { useEffect } from "react";
import { Form } from "../Form/Form";
import { useNavigate } from "react-router-dom";
import { Message } from "../Message/Message";

export const ChatRoom = ({ socket }) => {
  const [{ user }, dispatch] = useContext(AppContext);
  const navigate = useNavigate();
  const [messageReceiver, setMessageReceiver] = useState("");

  let name = localStorage.getItem("name"),
    room = localStorage.getItem("room");

  useEffect(() => {
    if (!name || !room) return;

    dispatch({
      type: ActionType.SET_NAME,
      payload: name,
    });
    dispatch({
      type: ActionType.SET_ROOM,
      payload: room,
    });
  }, [dispatch, name, room]);

  const joinRoom = useCallback(() => {
    if (!name && !room) return;

    socket.emit("user_joined", { name, room }, (data) => {
      dispatch({
        type: ActionType.SET_USER,
        payload: data,
      });
    });
    navigate("/chat");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  useEffect(() => {
    joinRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinRoom]);

  const handleClick = () => {
    console.log(user, name, room);
  };

  useEffect(() => {}, [socket, setMessageReceiver]);

  return (
    <>
      <Form socket={socket} setMessageReceiver={setMessageReceiver} />
      <Message messageReceiver={messageReceiver} />
      <button onClick={() => handleClick()}>click</button>
    </>
  );
};
