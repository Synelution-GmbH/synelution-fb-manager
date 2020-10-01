import {
  Box,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AwesomeIcon } from '../Icons/Icon';

const useStyles = makeStyles((theme) => ({
  root: ({ image }) => ({
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

    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }),
  upload: ({ isDragActive, image }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    border: `2px dashed ${
      isDragActive ? theme.palette.primary.main : theme.palette.grey[200]
    }`,
    backgroundColor: theme.palette.grey[50],
    padding: theme.spacing(3),
    transition: '0.3s',
    opacity: image && !isDragActive ? 0 : 1,

    '& .svg-inline--fa': {
      transition: '0.3s',
      fontSize: '38px',
      marginBottom: theme.spacing(2),
      color: isDragActive ? theme.palette.primary.main : theme.palette.grey[400],
    },
  }),
}));

export const AssetUploader = ({ setFile = () => {} }) => {
  const [image, setImage] = useState();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setFile(file);
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        setImage(binaryStr);
      };
      // reader.readAsArrayBuffer(file);
      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });

  const classes = useStyles({ isDragActive, image });

  return (
    <>
      <Card className={classes.root} {...getRootProps()}>
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
      </Card>
    </>
  );
};
