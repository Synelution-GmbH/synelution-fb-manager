import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';

export const CodeDialog = ({ open, setOpen, onSubmit, initialState }) => {
  const [state, setState] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    const clearData = await onSubmit(state);
    if (clearData) setState(initialState);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onBackdropClick={(e) => {
        console.log(e);
        e.preventDefault();
      }}
    >
      <DialogTitle>Please Add the contact data for the Code</DialogTitle>
      <DialogContent>
        <TextField
          value={state.name}
          onChange={handleOnChange}
          label="Name"
          fullWidth
          margin="dense"
          focused
          autoFocus
          name="name"
        />
        <TextField
          value={state.email}
          onChange={handleOnChange}
          label="Email"
          fullWidth
          margin="dense"
          name="email"
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          disabled={!state.name || !state.email}
          color="primary"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
