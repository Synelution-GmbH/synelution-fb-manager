import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import React, { useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AwesomeIcon } from '../Icons/Icon';
import { useAssetUploaderDispatch } from './AssetUploaderContext';
import { EditAssetContent } from './EditAssetContent';

const useStyles = makeStyles((theme) => ({
  card: ({ active }) => ({
    width: '120px',
    height: '120px',
    position: 'relative',
    // outlineColor: active ? theme.palette.primary.main : 'transparent',
    // outlineWidth: '2px',
    // outlineStyle: 'solid',
    boxShadow: active ? '0 0 0 2px' + theme.palette.primary.main : '',
    transition: '0.3s',

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

    '& .options': {
      transition: '0.3s',
      position: 'absolute',
      opacity: 0,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 4,
    },
    '&:hover .options': {
      opacity: 1,
    },
  }),
  progress: {
    zIndex: 5,
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  delete: {
    position: 'absolute',
    right: '8px',
    top: '8px',
    fontSize: '14px',
    zIndex: 10,
    color: '#fff',
    cursor: 'pointer',
  },
  edit: {
    position: 'absolute',
    left: '8px',
    bottom: '8px',
    fontSize: '14px',
    zIndex: 10,
    color: '#fff',
    cursor: 'pointer',
  },
}));

export const AssetPreview = ({
  path,
  loading,
  name,
  image,
  video,
  index,
  active,
  thumb,
  handleDelete = () => {},
  handleEdit = () => {},
  ...props
}) => {
  const { dispatch } = useAssetUploaderDispatch();
  const classes = useStyles({ active });
  const ref = useRef();
  return (
    <Draggable draggableId={name} index={index}>
      {(provided) => (
        <Grid
          {...props}
          item
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card
            className={classes.card}
            ref={ref}
            // variant={active ? 'outlined' : null}
            onClick={() => {
              ref.current.parentNode.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
              });
              dispatch({ type: 'set_payload', payload: { previewIndex: name } });
            }}
          >
            <CardContent>
              {loading ? (
                <CircularProgress className={classes.progress} size={24} />
              ) : null}
              {image ? (
                <img
                  style={{ opacity: loading ? '0.7' : 1 }}
                  src={thumb || path}
                  alt=""
                />
              ) : null}
              {video ? (
                <video style={{ opacity: loading ? '0.7' : 1 }} src={path} />
              ) : null}
            </CardContent>
            <div className="options">
              <AwesomeIcon
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'delete_asset', payload: { name } });
                  handleDelete(props._id);
                }}
                className={classes.delete}
                icon="times"
              />
              <EditAssetContent
                className={classes.edit}
                name={name}
                handleEdit={handleEdit}
              />
            </div>
          </Card>
        </Grid>
      )}
    </Draggable>
  );
};
