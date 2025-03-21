import socket from "@src/services/io";
import { useEffect, useState } from "react";

const UlComponent = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [notification, setNotification] = useState<string[]>([]);

  const handleMessage = (message: string) => {
    setMessages((prev) => [message, ...prev]);
  };

  const handleNotification = (message: string) => {
    setNotification((prev) => [message, ...prev]);

    setTimeout(() => {
      setNotification((prev) => prev.filter((m) => m !== message));
    }, 3000);
  };

  const handleActivity = (message: string) => {
    const msg = `${message} is typing`;
    setNotification((prev) => [msg, ...prev]);

    setTimeout(() => {
      setNotification((prev) => prev.filter((m) => m !== msg));
    }, 3000);
  };

  useEffect(() => {
    socket.on("message", handleMessage);
    socket.on("notification", handleNotification);
    socket.on("activity", handleActivity);
    socket.on("disconnect", handleNotification);
    return () => {
      socket.off("message", handleMessage);
      socket.off("notification", handleNotification);
      socket.off("activity", handleActivity);
      socket.off("disconnect", handleNotification);
    };
  }, []);

  return (
    <>
      <ul className="scrollbar-thumb-rounded-full mx-auto scrollbar-thin flex h-[calc(100%-7.5rem)] w-3/4 flex-grow flex-col-reverse overflow-y-auto">
        {messages.length > 0 &&
          messages.map((msg, index) => (
            <li key={index} className="">
              {msg}
            </li>
          ))}
      </ul>
      <p className="grid">
        {notification.map((m) => (
          <span>{m}</span>
        ))}
      </p>
    </>
  );
};

export default UlComponent;
