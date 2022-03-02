import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const Todo = (props) => {
  const { title, description, id } = props.todo;
  const { deleteTodo } = props;
  return (
    <div>
      <ListItemButton >
        <ListItemIcon>
          <Checkbox onClick={() => deleteTodo(id)}/>
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </div>
  );
};

export default Todo;
