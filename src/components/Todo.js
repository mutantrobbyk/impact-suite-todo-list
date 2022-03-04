import React, { useEffect, useState, useContext } from "react";
import { TodosContext } from "../context/todosContext";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TodoDisplay from "./TodoDisplay";
import List from "@mui/material/List";
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";
import { green } from "@mui/material/colors";
import { addLocalTodo, deleteLocalTodo, batchLoadObject } from "../localStorageFunctions";
import { isEmpty } from 'lodash'

const Todo = (props) => {
  let [todoText, setTodoText] = useState("");
  let [isOffline, setIsOffline] = useState(false);
  let [tempTest, setTempTest] = useState(false)

  const [state, dispatch] = useContext(TodosContext);

  useEffect(() => {
    if (!isOffline) {
      axios.get("/api/todos").then((result) => {
        dispatch({ type: "GET_TODOS", payload: result.data });
      });
    }
  }, []);

  const addTodo = () => {
    if (!todoText) return;
    if (isOffline) {
      addLocalTodo(todoText, state.todos);
      setTodoText("");
    } else {
      axios.post("/api/todo", { title: todoText }).then((result) => {
        dispatch({ type: "ADD_TODO", payload: result.data });
        setTodoText("");
      });
    }
  };

  const deleteTodo = (id, isTemp) => {
    console.log("HIT BABY")
    if (isOffline) {
      deleteLocalTodo(id, isTemp);
      //TODO FIX THIS, ITS JANKY, FIGURE OUT ANOTHER WAY TO REFRESH STATE
      setTempTest(!tempTest)
    } else {
      axios.delete(`/api/todo/${id}`).then((result) => {
        dispatch({ type: "DELETE_TODO", payload: result.data });
      });
    }
  };

  const captureTodoText = (e) => {
    setTodoText(e.target.value);
  };

  const goOffline = () => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
    localStorage.setItem("deleteList", JSON.stringify([]));
    setIsOffline(!isOffline);
  };

  const goOnline = () => {
    setIsOffline(!isOffline);
    const itemsToBatchLoad = batchLoadObject()
    if (isEmpty(itemsToBatchLoad.deletedTodos) && isEmpty(itemsToBatchLoad.addedTodos)) return;
    axios.post('/api/batchedTodos', itemsToBatchLoad).then(result => {
      dispatch({ type: "GET_TODOS", payload: result.data });
    })
  };

  let todos = isOffline
    ? JSON.parse(localStorage.getItem("todos"))
    : state.todos;

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 0.5, width: "20ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={todoText}
          onChange={captureTodoText}
          id="standard-basic"
          label="Add a Todo"
          variant="standard"
        />
        <Icon onClick={addTodo} sx={{ color: green[500], maxWidth: 25 }}>
          add_circle
        </Icon>
      </Box>
      <List>
        {todos &&
          todos.map((todo) => (
            <div key={todo.id || todo.tempId}>
              <TodoDisplay deleteTodo={deleteTodo} todo={todo} />
            </div>
          ))}
      </List>
      <Switch
        label="Go Offline"
        onChange={isOffline ? () => goOnline() : () => goOffline()}
      />
    </div>
  );
};

export default Todo;
