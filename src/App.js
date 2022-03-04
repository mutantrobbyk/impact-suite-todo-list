import "./App.css";
import TodoContainer from "./components/TodoContainer";
import NavBar from "./components/NavBar";
import { TodosContextProvider } from "./context/todosContext";

function App() {
  return (
    <div className="App">
      <NavBar />
      <TodosContextProvider>
        <TodoContainer />
      </TodosContextProvider>
    </div>
  );
}

export default App;
