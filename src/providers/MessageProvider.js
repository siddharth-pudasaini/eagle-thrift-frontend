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
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => {
          const filteredMessages = prevMessages.filter(
            (msg) => msg.conversation_id !== message.conversation_id
          );
          return [...filteredMessages, message];
        });
      };

      socket.current.onclose = (event) => {
        if (event.wasClean) {
          console.log(
            `WebSocket closed cleanly, code=${event.code} reason=${event.reason}`
          );
        } else {
          console.error("WebSocket connection closed unexpectedly");
        }
      };

      socket.current.onerror = (error) => {
        console.error("WebSocket error", error);
      };

      return () => {
        if (socket.current) {
          socket.current.close();
        }
      };
    }
  }, [isAuthenticated, authToken]);

  const sendMessage = (message, listingId) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      const messageData = {
        message: message,
        listing_id: listingId,
        token: authToken,
      };
      socket.current.send(JSON.stringify(messageData));
    } else {
      console.error("WebSocket connection is not open");
    }
  };

  return (
    <MessageContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageProvider, MessageContext };
