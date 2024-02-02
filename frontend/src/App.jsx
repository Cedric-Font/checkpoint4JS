import "./App.css";
import ToDoWrapper from "./components/ToDoWrapper/ToDoWrapper";
import NavBar from "./components/navBar/NavBar";

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <ToDoWrapper />
    </div>
  );
}
