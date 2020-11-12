import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import { EditorClient } from '../EditorClient';
import { AwesomeIcon } from '../Icons/Icon';
import { useAssetUploader } from './AssetUploaderContext';
import { useAssetUploaderDispatch } from './AssetUploaderContext';

const useStyles = makeStyles((theme) => ({
  dialog: {
    '& .MuiDialog-paper': {
      overflow: 'visible',
    },
    '& .editor': {
      minHeight: '150px',
    },
  },
}));

export const EditAssetContent = ({ handleEdit, name, className }) => {
  const { dispatch } = useAssetUploaderDispatch();
  const { assets } = useAssetUploader();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const [text, setText] = useState(content);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const asset = assets[name] ? assets[name] : {};
  const handleSubmit = () => {
    handleEdit({ assets: Object.values(assets) });
    handleClose();
  };

  return (
    <>
      <IconButton
        className={className}
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        <AwesomeIcon icon="pen" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.dialog}
        onBackdropClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DialogTitle>Carousel Post Text</DialogTitle>
        <DialogContent style={{ overflow: 'visible' }}>
          <EditorClient
            content={asset.content || ''}
            onSave={({ serializedValue }) => {
              dispatch({
                type: 'update_text',
                payload: { name, content: serializedValue },
              });
            }}
            saveDelay={500}
            editorProps={{
              style: {
                maxWidth: '500px',
                width: '100vw',
              },
            }}
          />
          <div></div>
          {/* <TextField
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
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={!asset.content}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
