import React, { useEffect, useState } from "react";
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
  let [todos, setTodos] = useState([]);
  let [todoText, setTodoText] = useState('');
  
  useEffect(() => {
    if (staticCategory) {
      axios.get("/api/todos").then((result) => {
        setTodos(result.data);
      });
    }
  }, []);

  const addTodo = () => {
    if(!todoText) return;
    axios.post('/api/todo', {title: todoText}).then(result => {
      setTodos(result.data);
      setTodoText('');
    })
  }

  const deleteTodo = (id) => {
    axios.delete(`/api/todo/${id}`).then(result => {
      setTodos(result.data);
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
        {todos.map((todo) => (
          <div key={todo.id}>
            <Todo deleteTodo={deleteTodo} todo={todo} />
          </div>
        ))}
      </List>
    </div>
  );
};

export default Category;
