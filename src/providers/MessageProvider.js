import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";

import { AuthContext } from "./AuthProvider";

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);
  const { isAuthenticated, authToken } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated && authToken) {
      socket.current = new WebSocket(`ws://localhost:8000/ws/${authToken}`);

      socket.current.onopen = () => {
        console.log("WebSocket connection opened");
      };

      socket.current.onmessage = (event) => {
        const message = event.data;
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      socket.current.onclose = () => {
        console.log("WebSocket connection closed");
      };

      return () => {
        socket.current.close();
      };
    }
  }, [isAuthenticated, authToken]);

  const sendMessage = (message, receiver) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      const messageData = {
        message: message,
        receiver: receiver,
      };
      socket.current.send(JSON.stringify(messageData));
    }
  };

  return (
    <MessageContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageProvider, MessageContext };
