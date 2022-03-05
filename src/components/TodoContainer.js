import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import Typography from "@mui/material/Typography";

const TodoContainer = () => {
  const card = () => (
    <React.Fragment>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        Todos
      </Typography>
      <Todo />
    </React.Fragment>
  );

  return <div style={{ marginLeft: 100, width: "50vw" }}>{card()}</div>;
};

export default TodoContainer;
