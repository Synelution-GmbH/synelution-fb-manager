import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useAssetUploaderDispatch } from './AssetUploaderContext';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '120px',
    height: '120px',
    position: 'relative',
    '& > .MuiCardContent-root': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      padding: theme.spacing(3),
      cursor: 'pointer',
    },
    '& img, & video': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  progress: {
    zIndex: 5,
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export const AssetPreview = ({
  path,
  loading,
  id,
  image,
  video,
  index,
  ...props
}) => {
  const { dispatch } = useAssetUploaderDispatch();
  const classes = useStyles();
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Grid
          item
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card
            className={classes.card}
            onClick={() =>
              dispatch({ type: 'set_payload', payload: { previewIndex: id } })
            }
          >
            <CardContent>
              {loading ? (
                <CircularProgress className={classes.progress} size={24} />
              ) : null}
              {image ? (
                <img style={{ opacity: loading ? '0.7' : 1 }} src={path} alt="" />
              ) : null}
              {video ? (
                <video style={{ opacity: loading ? '0.7' : 1 }} src={path} />
              ) : null}
            </CardContent>
          </Card>
        </Grid>
      )}
    </Draggable>
  );
};
