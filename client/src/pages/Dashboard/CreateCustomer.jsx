import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  Grid,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { AssetUploader } from 'ui/components/AssetUploader';
import { AwesomeIcon } from 'ui/components/Icons/Icon';

export const CreateCustomer = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !file) return;
    setLoading(true);

    const data = new FormData();
    data.append('name', name);
    data.append('file', file);

    axios.post('/clients', data, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  };
  return (
    <>
      <Fab color="primary" onClick={() => setOpen(true)}>
        <AwesomeIcon size="lg" icon="plus" />
      </Fab>

      <Dialog open={open} aira-labelledby="create-customer-dialog">
        <DialogTitle id="create-customer-dialog">Create Customer</DialogTitle>
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
          <Button onClick={() => setOpen(false)} color="error">
            Cancel
          </Button>
          <Button
            startIcon={<AwesomeIcon icon="save" style={{ fontSize: '100%' }} />}
            color="primary"
            diabled={!name || loading}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
