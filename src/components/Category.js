import React, { useEffect, useState, useContext } from "react";
import { TodosContext } from "../context/todosContext";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Todo from "./Todo";
import List from "@mui/material/List";
import Icon from "@mui/material/Icon";
import { green } from "@mui/material/colors";


/** 
  * This component will house the main todo section along with
  * any created categories and their subsequent todos.
*/
const Category = (props) => {
  const { staticCategory } = props;
  let [todoText, setTodoText] = useState('');

  const [state, dispatch] = useContext(TodosContext);
  
  useEffect(() => {
    if (staticCategory) {
      axios.get("/api/todos").then((result) => {
        dispatch({type: "GET_TODOS", payload: result.data});
      });
    }
  }, []);

  const addTodo = () => {
    if(!todoText) return;
    axios.post('/api/todo', {title: todoText}).then(result => {
      dispatch({type: "ADD_TODO", payload: result.data});
      setTodoText('');
    })
  }

  const deleteTodo = (id) => {
    axios.delete(`/api/todo/${id}`).then(result => {
      dispatch({type: "DELETE_TODO", payload: result.data});
    });
  }

  const captureTodoText = (e) => {
    setTodoText(e.target.value)
  }
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
        <TextField value={todoText} onChange={captureTodoText} id="standard-basic" label="Add a Todo" variant="standard" />
        <Icon onClick={addTodo} sx={{ color: green[500], maxWidth: 25 }}>add_circle</Icon>
      </Box>
      <List>
        {state.todos && state.todos.map((todo) => (
          <div key={todo.id}>
            <Todo deleteTodo={deleteTodo} todo={todo} />
          </div>
        ))}
      </List>
    </div>
  );
};

export default Category;
