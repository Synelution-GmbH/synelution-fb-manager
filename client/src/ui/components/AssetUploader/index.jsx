import {
  Box,
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
import { useAssetUploaderDispatch } from './AssetUploaderContext';
import { useAssetUploader } from './AssetUploaderContext';
import { AssetPreview } from './AssetPreview';
import { Droppable } from 'react-beautiful-dnd';
export * from './AssetUploaderContext';

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
  const { dispatch } = useAssetUploaderDispatch();
  const { previewIndex, assets } = useAssetUploader();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      console.log(acceptedFiles);
      acceptedFiles.forEach((file) => {
        console.log(file);

        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = async () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
          console.log(file.name);
          const mp4 = file.type.search('mp4') !== -1;
          dispatch({
            type: 'add_asset',
            payload: { name: file.name, path: binaryStr, image: !mp4, video: mp4 },
          });
          setDataUrl(binaryStr);
        };
        // reader.readAsArrayBuffer(file);
        reader.readAsDataURL(file);
      });
    },
    [setFile, setDataUrl]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 10,
    multiple: true,
  });

  const classes = useStyles({ isDragActive, hide: previewIndex });

  // useEffect(() => {
  //   if (!previewIndex || !assets[previewIndex].path) return;
  //   const preview = assets[previewIndex];
  //   if (preview.image) return setImage(preview.path);
  //   if (preview.video) return setVideo(preview.path);
  // }, [previewIndex]);

  return (
    <>
      <Card
        className={classes.root}
        style={
          previewIndex && assets[previewIndex].image
            ? { backgroundImage: `url(${assets[previewIndex].path})` }
            : null
        }
        {...getRootProps()}
      >
        {previewIndex && assets[previewIndex].video ? (
          <Video src={assets[previewIndex].path}></Video>
        ) : null}
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

export const AssetUploaderList = () => {
  const { assets, assetOrder } = useAssetUploader();

  return (
    <Box clone pt={1}>
      <Droppable
        droppableId={'sheet-dont-matter'}
        direction="horizontal"
        type="column"
      >
        {(provided) => (
          <Grid
            ref={provided.innerRef}
            {...provided.droppableProps}
            container
            spacing={1}
          >
            {assetOrder.map((assetId, i) => {
              const asset = assets[assetId];
              return <AssetPreview index={i} key={asset.id} {...asset} />;
            })}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </Box>
  );
};
