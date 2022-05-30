import React, { useEffect, useState } from "react";

export const Form = ({ room, socket, setMessageReceiver }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessageReceiver(message);
    });
  }, [socket, setMessageReceiver]);

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send message</button>
    </div>
  );
};
