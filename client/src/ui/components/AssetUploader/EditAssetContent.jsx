import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  IconButton,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { logDOM } from '@testing-library/react';
import React, { useRef, useState } from 'react';
import { EditorClient } from '../EditorClient';
import { AwesomeIcon } from '../Icons/Icon';
import { useAssetUploader } from './AssetUploaderContext';
import { useAssetUploaderDispatch } from './AssetUploaderContext';

const useStyles = makeStyles((theme) => ({
  dialog: {
    '& .MuiDialog-paper': {
      overflow: 'visible',
      maxWidth: '548px',
    },
    '& .editor': {
      minHeight: '80px',
    },
  },
  label: {
    margin: '16px 0 8px',
    display: 'block',
  },
}));

export const EditAssetContent = ({
  handleEdit,
  name,
  className,
  buttonComponent,
}) => {
  const { dispatch } = useAssetUploaderDispatch();
  const { assets } = useAssetUploader();
  const classes = useStyles();
  const asset = assets[name] ? assets[name] : {};
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState(asset.link || '');
  const linkSaveTimeout = useRef();
  // const [text, setText] = useState(content);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    handleEdit({ assets: Object.values(assets) });
    handleClose();
  };

  return (
    <>
      {buttonComponent ? (
        buttonComponent({
          onClick: (e) => {
            e.stopPropagation();
            handleOpen();
          },
          children: <AwesomeIcon icon="pen" />,
        })
      ) : (
        <IconButton
          className={className}
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          <AwesomeIcon icon="pen" />
        </IconButton>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.dialog}
        onBackdropClick={(e) => {
          console.log(e);
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <DialogTitle>Carousel Post Text</DialogTitle>
        <DialogContent style={{ overflow: 'visible' }}>
          <FormLabel className={classes.label} style={{ marginTop: 0 }}>
            Title
          </FormLabel>
          <EditorClient
            content={asset.title || ''}
            onSave={({ serializedValue }) => {
              dispatch({
                type: 'update_text',
                payload: { name, title: serializedValue },
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

          <FormLabel className={classes.label}>Text</FormLabel>
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

          <TextField
            className={classes.label}
            label="Link"
            value={link}
            fullWidth
            variant="outlined"
            helperText={
              <a style={{ wordBreak: 'break-all' }} href={link}>
                {link}
              </a>
            }
            onChange={(e) => {
              clearTimeout(linkSaveTimeout.current);
              const value = e.target.value;
              linkSaveTimeout.current = setTimeout(() => {
                dispatch({
                  type: 'update_text',
                  payload: { name, link: value },
                });
              }, [300]);
              setLink(value);
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
