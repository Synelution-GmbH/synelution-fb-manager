import React, { useEffect, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const MessageBox = ({ text, toggle, severity = 'error' }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!text) return;
    setOpen(true);
  }, [toggle]);
  const handleClose = () => setOpen(false);

  return (
    <Snackbar open={open} autoHideDuration={30000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  );
};
