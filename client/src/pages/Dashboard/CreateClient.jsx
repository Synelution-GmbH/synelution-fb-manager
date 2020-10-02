import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
  Tooltip,
} from '@material-ui/core';
import React, { useState } from 'react';
import { AssetUploader } from 'ui/components/AssetUploader';
import { AwesomeIcon } from 'ui/components/Icons/Icon';

export const CreateClient = ({ addClient = () => {} }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !file || loading) return;
    setLoading(true);

    const data = new FormData();
    data.append('name', name);
    data.append('file', file);
    try {
      // const { data: client } = await axios.post('/clients', data, {
      //   headers: { 'content-type': 'multipart/form-data' },
      // });
      await addClient(data);
      setLoading(false);
      // reset form
      setName('');
      setFile(null);
      handleClose();
    } catch (error) {
      setLoading(false);
    }
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
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
            fullWidth
            label="name"
            type="text"
          />
          <AssetUploader setFile={setFile} />
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
