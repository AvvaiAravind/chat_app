import socket from "@src/services/io";
import { useEffect, useState } from "react";

type UlComponentProps = {
  isActivity: boolean;
};

const UlComponent = ({ isActivity }: UlComponentProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [info, setInfo] = useState<string>("");

  useEffect(() => {
    const handleMessage = (message: string) => {
      setMessages((prev) => [message, ...prev]);
    };
    socket.on("message", handleMessage);
    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  socket.on("activity", (name) => {
    setInfo(`${name} is typing`);
  });

  return (
    <>
      {isActivity && <p className="activity">{info}</p>}

      <ul className="scrollbar-thumb-rounded-full mx-auto scrollbar-thin flex h-[calc(100%-7.5rem)] w-3/4 flex-grow flex-col-reverse overflow-y-auto">
        {messages.length > 0 &&
          messages.map((msg, index) => (
            <li key={index} className="">
              {msg}
            </li>
          ))}
      </ul>
    </>
  );
};

export default UlComponent;
