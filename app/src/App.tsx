import FormComponent from "./components/FormComponent";
import UlComponent from "./components/UlComponent";

function App() {
  return (
    <div className="flex-grow flex flex-col h-screen gap-y-5">
      <UlComponent />
      <FormComponent />
    </div>
  );
}

export default App;
