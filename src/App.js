import "./App.css";
import CategoryContainer from "./components/CategoryContainer";
import NavBar from "./components/NavBar";
import { TodosContextProvider } from "./context/todosContext";

function App() {
  return (
    <div className="App">
      <NavBar />
      <TodosContextProvider>
        <CategoryContainer />
      </TodosContextProvider>
    </div>
  );
}

export default App;
