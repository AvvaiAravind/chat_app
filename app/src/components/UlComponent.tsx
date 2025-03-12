import socket from "@src/services/ws";
import { useEffect, useState } from "react";

const UlComponent = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      try {
        if (event.data instanceof Blob) {
          console.log(event.data);
          const newMessage = await event.data.text();
          setMessages((prev) => [newMessage, ...prev]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    socket.onmessage = handleMessage;
    return () => {
      socket.onmessage = null;
    };
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <ul className="scrollbar-thin scrollbar-thumb-rounded-full mx-auto flex w-3/4 h-[calc(100%-7.5rem)] flex-grow flex-col-reverse overflow-y-auto">
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
