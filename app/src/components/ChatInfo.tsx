import socket from "@src/services/io";
import { useEffect, useState } from "react";

type Notification = {
  id: string;
  message: string;
};

export type UserType = {
  id: string;
  name: string;
  room: string;
};

type ChatInfoProps = {
  currentRoom: string;
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>;
};

const ChatInfo = ({currentRoom, setCurrentRoom}: ChatInfoProps) => {
  const [notification, setNotification] = useState<Notification[]>([]);
  const [userList, setUserList] = useState<UserType[]>([]);
  const [allRooms, setAllRooms] = useState<string[]>([]);

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

  const handleUserList = ({ users }: { users: UserType[] }) => {
    setUserList(users);
  };

  const handleRoom = (room: string) => {
    setCurrentRoom(room);
  };

  const handleAllRooms = ({ rooms }: { rooms: string[] }) => {
    setAllRooms(rooms);
  };

  useEffect(() => {
    socket.on("notification", handleNotification);
    socket.on("activity", handleActivity);
    socket.on("disconnect", handleNotification);
    socket.on("userList", handleUserList);
    socket.on("currentRoom", handleRoom);
    socket.on("roomList", handleAllRooms);

    return () => {
      socket.off("notification", handleNotification);
      socket.off("activity", handleActivity);
      socket.off("disconnect", handleNotification);
      socket.off("userList", handleUserList);
      socket.off("currentRoom", handleRoom);
      socket.off("roomList", handleAllRooms);
    };
  }, []);

  return (
    <div className="flex w-1/4 flex-col items-stretch justify-between space-y-2 bg-neutral-900 px-2 py-2 pt-2 text-white flex-none">
      <h1 className="text-center text-2xl">{currentRoom}</h1>
      <article className="w-full flex-1 rounded-2xl border border-white">
        <h3 className="border-b text-center">Users in this room</h3>
        <div className="scrollbar-thumb-rounded-full scrollbar-thin flex h-3/4 flex-col overflow-auto p-2 scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
          {userList.map((m) => (
            <span key={m.id} className="text-center text-white">
              {m.name}
            </span>
          ))}
        </div>
      </article>
      <article className="w-full flex-1 rounded-2xl border border-white">
        <h3 className="border-b text-center">Active rooms</h3>
        <div className="scrollbar-thumb-rounded-full scrollbar-thin flex h-3/4 flex-col overflow-auto p-2 scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
          {allRooms.map((m) => (
            <span key={m} className="text-center text-white">
              {m}
            </span>
          ))}
        </div>
      </article>
      <article className="w-full flex-1 rounded-2xl border border-white">
        <h3 className="border-b text-center">Chat Activity & Info</h3>
        <div className="scrollbar-thumb-rounded-full scrollbar-thin flex h-3/4 flex-col overflow-auto p-2 scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
          {notification.map((m) => (
            <span key={m.id} className="text-center text-white">
              {m.message}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
};

export default ChatInfo;
