import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../state/AppContext";
import { ActionType } from "../../state/actions";

export const Form = ({ socket, setReceivedMessage }) => {

  const [{ room }, dispatch] = useContext(AppContext);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message === "") return;
    socket.emit("send_message", { message, room });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setReceivedMessage(msg)
    });
  }, [socket, setReceivedMessage]);


  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => sendMessage()}>Send message</button>
    </div>
  );
};
