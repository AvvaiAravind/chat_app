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
  socket.on("message", (data) => {
    console.log(socket.id.substring(0, 5),data);
    io.emit("message", `${socket.id.substring(0, 5)} ${data}`);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Websocket server is running on http://localhost:${PORT}`);
});
