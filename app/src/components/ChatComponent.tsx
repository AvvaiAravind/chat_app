import socket from "@src/services/io";
import { useEffect, useRef, useState } from "react";
import ChatInfo from "./ChatInfo";

export type MessageType = {
  id: string;
  name: string;
  room: string;
  time: string;
  message: string;
};

type ChatProps = {
  user: string;
};

const ChatComponent = ({ user }: ChatProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>("");

  const messagesEndRef = useRef<HTMLUListElement | null>(null);

  const handleMessage = (data: MessageType) => {
    setMessages((prev) => [data, ...prev]);
  };

  useEffect(() => {
    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    setMessages([]);
  }, [currentRoom]);

  // Scroll to bottom when messages change
 useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = 0; // Since flex-col-reverse makes new messages appear at the top
    }
  }, [messages]);

  return (
    <div className="flex h-full w-full overflow-hidden">
      <ChatInfo currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} />
      <ul ref={messagesEndRef} className="scrollbar-thumb-rounded-full scrollbar-thin flex w-3/4 flex-1 flex-col-reverse gap-y-4 overflow-y-scroll bg-neutral-600 p-2 scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
        {messages.length > 0 &&
          messages.map((msg) => (
            <li
              key={msg.time}
              className={`flex w-1/2 flex-col rounded-xl border text-white ${user === msg.id ? "self-end" : "self-start"}`}
            >
              <div className="flex w-full justify-between rounded-t-xl bg-rose-600 p-1">
                <span>{user === msg.id ? "You" : msg.name}</span>
                <span>{msg.time}</span>
              </div>
              <div className="inline-block w-full p-1">{msg.message}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ChatComponent;
