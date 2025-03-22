import socket from "@src/services/io";
import { useEffect, useState } from "react";

type Notification = {
  id: string; // Unique identifier (e.g., username or socket id)
  message: string;
};

const UlComponent = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [notification, setNotification] = useState<Notification[]>([]);

  const handleMessage = (message: string) => {
    setMessages((prev) => [message, ...prev]);
  };

  const handleNotification = (message: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setNotification((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setNotification((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  const handleActivity = (msg: string) => {
    const existingNotification = notification.find((n) => n.message === msg);

    if (!existingNotification) {
      const id = `${msg}-typing`;
      setNotification((prev) => [...prev, { id, message: msg }]);

      setTimeout(() => {
        setNotification((prev) => prev.filter((n) => n.id !== id));
      }, 3000);
    }
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
            <li key={index + msg} className="">
              {msg}
            </li>
          ))}
      </ul>
      <p className="mb-4 grid h-4">
        {notification.map((m) => (
          <span key={m.id}>{m.message}</span>
        ))}
      </p>
    </>
  );
};

export default UlComponent;
