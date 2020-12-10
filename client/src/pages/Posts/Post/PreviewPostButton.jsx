import React, { useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  makeStyles,
  DialogTitle,
  Tooltip,
  DialogContent,
} from '@material-ui/core';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { InstagramView } from 'pages/ClientView/Post/InstagramView';
import { FacebookView } from 'pages/ClientView/Post/FacebookView';
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { getClient } from 'services';

const useStyles = makeStyles((theme) => ({
  dialog: ({ type }) => ({
    '& > .MuiDialog-container > .MuiPaper-root': {
      width: '100%',
      maxWidth: type === 'fb' ? '580px!important' : '680px!important',
      backgroundColor: '#fff',
    },
  }),
}));

const PostView = ({ type, date, ...props }) => {
  const dateFormatted = useMemo(() => dayjs(date).format('D. MMMM'), [date]);
  const { isLoading, data } = useQuery(props.client, () =>
    getClient({ slug: props.client })
  );

  const client = !isLoading && data ? data : {};
  return type === 'fb' ? (
    <FacebookView
      {...props}
      client={client}
      dateFormatted={dateFormatted}
      type={type}
    />
  ) : (
    <InstagramView
      {...props}
      client={client}
      dateFormatted={dateFormatted}
      type={type}
    />
  );
};

export const PreviewPostButton = ({ post, ...props }) => {
  const params = useParams();
  const classes = useStyles({ type: params.type });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Tooltip title="Preview Post" placement="top">
        <Button
          style={{ marginRight: '8px' }}
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          <AwesomeIcon icon="eye" />
        </Button>
      </Tooltip>

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
        <DialogTitle>Post Preview</DialogTitle>
        <DialogContent>
          <PostView
            {...props}
            {...post}
            {...params}
            editorComponent={
              <p style={{ padding: '20px', margin: '-20px -4px -8px' }}>
                {post.content}
              </p>
            }
          />
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
