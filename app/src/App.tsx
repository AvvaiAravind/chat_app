import { useRef, useState } from "react";
import ChatComponent from "./components/ChatComponent";
import FormComponent from "./components/FormComponent";
import InfoForm from "./components/InfoForm";

function App() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const roomRef = useRef<HTMLInputElement | null>(null);
  const [user, setUser] = useState<string>("");

  return (
    <main className="flex h-screen flex-grow flex-col">
      <InfoForm nameRef={nameRef} roomRef={roomRef} />
      <ChatComponent user={user} />
      <FormComponent nameRef={nameRef} roomRef={roomRef} setUser={setUser} />
    </main>
  );
}

export default App;
