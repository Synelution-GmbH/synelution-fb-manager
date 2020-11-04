import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useAuth } from 'services';
import { useSocket } from 'services/socket-provider';

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: theme.palette.success.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export const ChangeImageButton = ({ id, onSave = () => {}, ...props }) => {
  const classes = useStyles();
  const socket = useSocket();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState();
  const [loading, setLoading] = useState();
  const { user } = useAuth();

  const handleSubmit = () => {
    if (!text) return;
    setLoading(true);
    const clientName = user.username;
    const clientEmail = user.email;
    socket.emit(
      'client change',
      { id, imageChanges: { text }, clientName, clientEmail },
      (e) => {
        setText('');
        handleClose();
        onSave();
        setLoading(false);
      }
    );
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button {...props} onClick={handleOpen}>
        {props.children}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Bild Korrekturen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bitte beschreiben Sie Ihre Änderungswünsche zur Abbildung im unten
            angezeigten Textfeld.
          </DialogContentText>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Änderungswünsche"
            multiline
            rows={3}
            fullWidth
            margin="dense"
            variant="outlined"
            focused
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button
            disabled={loading || !text}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Speichern
            {loading ? (
              <CircularProgress className={classes.buttonProgress} size={24} />
            ) : null}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
