import { configDotenv } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

configDotenv();
//creating web socket server

const PORT = process.env.PORT || 3000;

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production" ? false : ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  // welcome for the user
  socket.emit("notification", "Welcome to the chat!");

  // notify others about the new user
  socket.broadcast.emit("notification", `${socket.id.substring(0, 5)} joined`);

  // handle chat message

  socket.on("message", (data) => {
    console.log(socket.id.substring(0, 5), data);

    io.emit("message", `${socket.id.substring(0, 5)} ${data}`);
  });

  // listening for activity
  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", `${name} is typing...`);
  });

  // listening  for disconnection

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);

    // broadcast to all the user when someone disconnect
    socket.broadcast.emit("notification", `${socket.id.substring(0, 5)} left`);
  });

  // error handling
  socket.on("error", (err) => {
    console.error(`Socket error on ${socket.id}:`, err);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Websocket server is running on http://localhost:${PORT}`);
});
