import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

var socket = io();
const SocketContext = createContext(socket);
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = (props) => {
  return (
    <>
      <SocketContext.Provider value={socket} {...props} />
    </>
  );
};
