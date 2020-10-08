import React, { useEffect, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const MessageBox = ({
  text,
  toggle,
  severity = 'error',
  autoHideDuration = 30000,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!text) return;
    setOpen(true);
    // eslint-disable-next-line
  }, [toggle]);
  const handleClose = () => setOpen(false);

  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  );
};
