import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditModal = (props) => {
  const { updateTodo, isTemp } = props;
  const { title, id, tempId } = props.todo;
  const [open, setOpen] = useState(false);
  const [newText, setNewText] = useState(title);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const idVariable = isTemp ? "tempId" : "id";
  const body = {
    [idVariable]: id || tempId,
    title: newText,
  };
  return (
    <div>
      <Button onClick={handleOpen}>Edit Todo</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            id="standard-basic"
            label="Change The Title"
            variant="standard"
          />
          <Button
            onClick={() => {
              updateTodo(id || tempId, body, isTemp);
              handleClose();
            }}
          >
            Update Todo
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;
