import React, { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';

import { AwesomeIcon } from 'ui/components/Icons/Icon';

export const DeleteButton = ({ onClick }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <IconButton
        onClick={handleOpen}
        variant="rounded"
        aria-label="delete"
        color="secondary"
      >
        <AwesomeIcon icon="trash-alt" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aira-labelledby="create-client-dialog"
      >
        <DialogContent>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO D:</Button>
          <Button
            startIcon={
              <AwesomeIcon icon="trash-alt" style={{ fontSize: '100%' }} />
            }
            color="secondary"
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
