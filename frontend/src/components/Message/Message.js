import React, { useEffect } from "react";

export const Message = ({receivedMessage}) => {


  useEffect(() => {
    console.log(receivedMessage);
  }, [receivedMessage]);

  return (
    <div>
      <h2>Message: </h2>
      <p>{receivedMessage && receivedMessage}</p>
    </div>
  );
};
