import io from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
});

/* socket.on("connect", () => {
  console.log("websocket connected", socket.id);
});

socket.on("notification", (data: string) => {
  console.log("Notification", data);
});

socket.on("message", (data: string) => {
  console.log("Message", data);
});

socket.on("activity", (name: string) => {
  console.log("Activity:", `${name}`);
});

socket.on("disconnect", (reason: string) => {
  console.log("websocket disconnected", reason);
}); */

export default socket;
