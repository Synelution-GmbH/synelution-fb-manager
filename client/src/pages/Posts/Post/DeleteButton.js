import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
} from '@material-ui/core';

import { AwesomeIcon } from 'ui/components/Icons/Icon';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.error.main,

    '&:hover': {
      backgroundColor: 'rgba(244, 67, 54, 0.04)',
    },
  },
}));
export const DeleteButton = ({ onClick = () => {}, text = '', ...props }) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <IconButton
        {...props}
        onClick={handleOpen}
        variant="rounded"
        aria-label="delete"
        className={classes.button}
        color="secondary"
      >
        <AwesomeIcon icon="trash-alt" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aira-labelledby="create-client-dialog"
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          {text ? <DialogContentText>{text}</DialogContentText> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO D:</Button>
          <Button
            startIcon={
              <AwesomeIcon icon="trash-alt" style={{ fontSize: '100%' }} />
            }
            color="primary"
            className={classes.button}
            onClick={() => {
              onClick();
              handleClose();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
