import io from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("websocket connected");
});

socket.on("message",(data: any) => {
  console.log("Message", data);
});

socket.on("disconnected",() => {
  console.log("websocket disconnected");
});


export default socket;
