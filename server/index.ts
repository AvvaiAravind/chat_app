import { configDotenv } from "dotenv";
import express from "express";
import { Server } from "socket.io";

configDotenv();
//creating web socket server

const PORT = process.env.PORT || 3000;

const app = express();

const expressServer = app.listen(PORT, () => {
  console.log(`Websocket server is running on http://localhost:${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5173", "http://192.168.0.112:5173/"],
    methods: ["GET", "POST"],
  },
});

const emitWithTimeout = (evnt: string, msg: string | null, timeout = 6000) => {
  io.emit(evnt, msg);
  setTimeout(()=> io.emit(evnt, null), timeout)
};

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.emit("welcome", "Welcome to chat App!");

  socket.broadcast.emit("message", `${socket.id.substring(0, 5)} connected`);

  socket.on("message", (data) => {
    console.log(socket.id.substring(0, 5), data);
    io.emit("message", `${socket.id.substring(0, 5)}:   ${data}`);
  });

  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", name);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
    socket.broadcast.emit(
      "message",
      `${socket.id.substring(0, 5)} disconnected`
    );
  });
});
