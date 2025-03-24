import io from "socket.io-client";

const getBaseUrl = () => {
  let URL = "";
  if (import.meta.env.MODE === "production") {
    console.log(import.meta.env.MODE);
    URL = import.meta.env.VITE_SERVER_URL;
  }
  console.log(URL, " URl");
  return URL;
};

const serverUrl = getBaseUrl();
const socket = io(serverUrl, {
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
