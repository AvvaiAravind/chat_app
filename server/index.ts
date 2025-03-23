import { configDotenv } from "dotenv";
import express from "express";
import { Server } from "socket.io";
import { UsersStateType } from "./types/types";
import {
  activeUser,
  buildMsg,
  getAllActiveRoom,
  getUser,
  getUsersInRoom,
  userLeavesApp,
} from "./utils/utils";

configDotenv();
//creating web socket server

const PORT = process.env.PORT || 3000;
const ADMIN = "Admin";

const app = express();

const expressServer = app.listen(PORT, () => {
  console.log(`Websocket server is running on http://localhost:${PORT}`);
});

//  state

export const UsersState: UsersStateType = {
  users: [],
  setUsers: function (updatedUsers) {
    this.users = updatedUsers;
  },
};

const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production" ? false : ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  // welcome for the user
  socket.emit("notification", "Welcome to the Chat App");

  socket.on("enterRoom", ({ name, room }) => {
    // leave previous room
    const prevRoom = getUser(socket.id)?.room;
    if (prevRoom) {
      socket.leave(prevRoom);
      io.to(prevRoom).emit("notification", `${name} left ${prevRoom}`);
    }

    const user = activeUser(socket.id, name, room);
    // cannot update previous room users list until after the state update in acitve user
    if (prevRoom) {
      io.to(prevRoom).emit("userList", {
        users: getUsersInRoom(prevRoom),
      });
    }

    // join room
    socket.join(user.room);

    //  to user who joined
    socket.emit("currentRoom", user.room);

    // everyone else
    socket.broadcast
      .to(user.room)
      .emit("notification", `${user.name} joined ${user.room}`);

    io.to(user.room).emit("userList", {
      users: getUsersInRoom(user.room),
    });

    io.emit("roomList", {
      rooms: getAllActiveRoom(),
    });
  });

  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    userLeavesApp(socket.id);

    if (user) {
      io.to(user.room).emit("notification", `${user.name} left the app`);

      io.to(user.room).emit("userList", {
        users: getUsersInRoom(user.room),
      });
    }
    console.log(`User ${socket.id} disconnected`);
  });

  // handle chat message

  socket.on("message", ({ id, message, name }) => {
    
    if (!message) {
      console.log(message) 
      return
    }
    const room = getUser(socket.id)?.room;
    if (room) {
      io.to(room).emit("message", buildMsg(id, name, message, room));
    }
  });

  // listening for activity
  socket.on("activity", ( name ) => {
    const room = getUser(socket.id)?.room;
    if (!name) {
      console.log(name);
      return;
    }
    if (room) {
      socket.broadcast.to(room).emit("notification", `${name} is typing`);
    }
  });
});
