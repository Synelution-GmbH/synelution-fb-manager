import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AwesomeIcon } from '../Icons/Icon';

import { Video } from './Video';

const useStyles = makeStyles((theme) => ({
  root: () => ({
    overflow: 'hidden',
    position: 'relative',
    paddingTop: '100%',
    '& > .MuiCardContent-root': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      padding: theme.spacing(3),
    },
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }),
  upload: ({ isDragActive, hide }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    border: `2px dashed ${
      isDragActive ? theme.palette.primary.main : theme.palette.grey[200]
    }`,
    backgroundColor: theme.palette.grey[50],
    padding: theme.spacing(3),
    transition: '0.3s',
    opacity: hide && !isDragActive ? 0 : 1,

    '& .svg-inline--fa': {
      transition: '0.3s',
      fontSize: '38px',
      marginBottom: theme.spacing(2),
      color: isDragActive ? theme.palette.primary.main : theme.palette.grey[400],
    },
  }),
}));

export const AssetUploader = ({
  setFile = () => {},
  setDataUrl = () => {},
  preview = null,
  children,
}) => {
  const [image, setImage] = useState();
  const [video, setVideo] = useState();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        setImage(binaryStr);
        setDataUrl(binaryStr);
      };
      // reader.readAsArrayBuffer(file);
      reader.readAsDataURL(file);
    },
    [setFile, setDataUrl]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });

  const classes = useStyles({ isDragActive, hide: image || video, image });

  useEffect(() => {
    if (!preview || !preview.path) return;
    if (preview.image) return setImage(preview.path);
    if (preview.video) return setVideo(preview.path);
  }, [preview]);
  console.log(image);
  return (
    <>
      <Card
        className={classes.root}
        style={image ? { backgroundImage: `url(${image})` } : null}
        {...getRootProps()}
      >
        {video ? <Video src={video}></Video> : null}
        <CardContent>
          <Paper
            className={classes.upload}
            variant="outlined"
            elevation={0}
            color="secondary"
          >
            <Grid
              container
              justify="center"
              alignContent="center"
              style={{ height: '100%' }}
            >
              <input {...getInputProps()} />
              <AwesomeIcon icon="cloud-upload-alt" />
              <Grid container justify="center">
                {isDragActive ? (
                  <Typography align="center">Drop the files here ...</Typography>
                ) : (
                  <Typography align="center">
                    Drag 'n' drop some files here, or click to select files
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
        </CardContent>
        {children}
      </Card>
    </>
  );
};
