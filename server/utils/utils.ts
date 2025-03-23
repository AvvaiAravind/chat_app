import { UsersState } from "..";

export const buildMsg = (
  id: string,
  name: string,
  msg: string,
  room: string
) => {
  console.log(msg);
  return {
    id,
    name,
    message: msg,
    room,
    time: new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date()),
  };
};

export const activeUser = (id: string, name: string, room: string) => {
  const user = { id, name, room };

  UsersState.setUsers([
    ...UsersState.users.filter((user) => user.id !== id),
    user,
  ]);
  return user;
};

export const userLeavesApp = (id: string) => {
  UsersState.setUsers(UsersState.users.filter((user) => user.id !== id));
};

export const getUser = (id: string) => {
  return UsersState.users.find((u) => u.id === id);
};

export const getUsersInRoom = (room: string) => {
  return UsersState.users.filter((u) => u.room === room);
};

export const getAllActiveRoom = () => {
  return Array.from(new Set(UsersState.users.map((u) => u.room)));
};
