import socket from "@src/services/io";
import { useEffect, useState } from "react";

const UlComponent = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const handleMessage = (message: string) => {
      setMessages((prev) => [message, ...prev]);
    };
    socket.on("message", handleMessage);
    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <ul className="scrollbar-thumb-rounded-full mx-auto scrollbar-thin flex h-[calc(100%-7.5rem)] w-3/4 flex-grow flex-col-reverse overflow-y-auto">
      {messages.length > 0 &&
        messages.map((msg, index) => (
          <li key={index} className="">
            {msg}
          </li>
        ))}
    </ul>
  );
};

export default UlComponent;
