import { useState } from "react";
import FormComponent from "./components/FormComponent";
import UlComponent from "./components/UlComponent";

function App() {
 const [isActivity, setIsActivity] = useState<boolean>(false)
  return (
    <div className="flex-grow flex flex-col h-screen gap-y-5">
      <UlComponent isActivity={isActivity} />
      <FormComponent setIsActivity={setIsActivity} />
    </div>
  );
}

export default App;
