import { configDotenv } from "dotenv";
import { WebSocketServer } from "ws";

configDotenv();
//creating web socket server
const PORT = parseInt(process.env.PORT || "3000", 10);

const server = new WebSocketServer({ port: PORT });

server.on("connection", (socket) => {
  socket.on("message", (message) => {
    const b = Buffer.from(message.toString());
    console.log(`Received: ${b}`);
    socket.send(message);
  });
});

server.on("listening", () => {
  console.log(`Websocket server is running on ws://localhost:${PORT}`);
});
