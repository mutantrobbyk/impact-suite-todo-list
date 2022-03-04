import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const TodoDisplay = (props) => {
  const { title, id, tempId } = props.todo;
  const { deleteTodo } = props;
  const isTemp = id ? false : true
  return (
    <div>
      <ListItemButton >
        <ListItemIcon>
          <Checkbox onClick={() => deleteTodo((id || tempId), isTemp)}/>
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </div>
  );
};

export default TodoDisplay;
