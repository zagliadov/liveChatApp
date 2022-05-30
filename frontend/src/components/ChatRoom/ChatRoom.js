import React, { useEffect } from "react";
import { Form } from "../Form/Form";
import { Message } from "../Message/Message";

export const ChatRoom = ({
  socket,
  user,
  room,
  setMessageReceiver,
  messageReceiver,
}) => {
  const handleClick = () => {
    console.log(socket)
  };



  return (
    <>
      <Form
        room={room}
        socket={socket}
        setMessageReceiver={setMessageReceiver}
      />
      <Message messageReceiver={messageReceiver} />
      <button onClick={() => handleClick()}>click</button>
    </>
  );
};
