import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  InputLabel,
  makeStyles,
  TextField,
  Tooltip,
} from '@material-ui/core';
import React, { useState } from 'react';
import { AssetUploader } from 'ui/components/AssetUploader';
import { AssetUploaderProvider } from 'ui/components/AssetUploader/AssetUploaderContext';
import { AwesomeIcon } from 'ui/components/Icons/Icon';

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(1),
  },
}));

export const CreateClient = ({ addClient = () => {} }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [facebookName, setFacebookName] = useState('');
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !file || loading || !facebookName) return;
    setLoading(true);

    const data = new FormData();
    data.append('name', name);
    data.append('facebookName', facebookName);
    data.append('file', file);
    try {
      await addClient(data);
      setLoading(false);
      // reset form
      setName('');
      setFacebookName('');
      setFile(null);
      handleClose();
    } catch (error) {
      setLoading(false);
    }
  };

  const updateImage = async (files) => {
    setFile(files[0])
    // const post = await putPost({ id, data });

 
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="create client" position="bottom">
        <Fab color="primary" onClick={handleOpen}>
          <AwesomeIcon size="lg" icon="plus" />
        </Fab>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aira-labelledby="create-client-dialog"
      >
        <DialogTitle id="create-client-dialog">Create Client</DialogTitle>
        <DialogContent style={{ minWidth: '350px' }}>
          <TextField
            className={classes.input}
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
            fullWidth
            label="name"
            type="text"
          />
          <TextField
            className={classes.input}
            onChange={(e) => setFacebookName(e.target.value)}
            value={facebookName}
            fullWidth
            label="Facebook page title"
            type="text"
          />
          {/* <TextField
            className={classes.input}
            onChange={(e) => setFacebookName(e.target.value)}
            value={facebookName}
            fullWidth
            label="Instagram username"
            type="text"
          /> */}
          <InputLabel style={{ margin: '16px 0 8px' }}>Profile Picture</InputLabel>
          <AssetUploaderProvider >
            <AssetUploader multiple={false} setFile={updateImage} />
          </AssetUploaderProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            startIcon={<AwesomeIcon icon="save" style={{ fontSize: '100%' }} />}
            color="primary"
            disabled={!name || loading}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
