import React from 'react';

export const Message = ({messageReceiver}) => {

  return (
    <div>
      <h2>Message: </h2>
      <p>{messageReceiver}</p>
    </div>
  )
}