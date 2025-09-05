import TextInput from "./components/ui/Input";


function App() {
  return (
  <div>
      <h1>My App</h1>
      <TextInput type="email" placeholder="Enter your email" className="mb-4"/>
      <form >
        <TextInput type="email" placeholder="Enter your email" className="mb-4"/>
      </form>
  </div>
);
}

export default App
