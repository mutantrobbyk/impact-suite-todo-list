import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import Typography from "@mui/material/Typography";

const TodoContainer = () => {
  const card = (staticCategory) => (
    <React.Fragment>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Todos
        </Typography>
        <Todo staticCategory={staticCategory} />
    </React.Fragment>
  );

  return (
      <div style={{marginLeft: 100}}>
            {card(true)}
      </div>
  );
};

export default TodoContainer;
