import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../state/AppContext";

export const Form = ({ socket, setMessageReceiver }) => {
  const [{ user, room }, dispatch] = useContext(AppContext);

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message === "") return;
    socket.emit("send_message", { message, room });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessageReceiver(msg);
    });
  }, [socket, setMessageReceiver, setMessage, message]);


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
