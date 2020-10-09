import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { AssetUploader } from 'ui/components/AssetUploader';
import dayjs from 'dayjs';
import { DatePicker } from '@material-ui/pickers';
import { DeleteButton } from './DeleteButton';
import { useSocket } from 'services/socket-provider';
import { EditorClient } from 'ui/components/EditorClient';
import { CopyToClipboard } from 'ui/components/Editor/CopyToClipboard';
import { useAuth, putPost } from 'services';
import { useQueryCache } from 'react-query';
import { AwesomeIcon } from 'ui/components/Icons/Icon';

const useStyles = makeStyles((theme) => ({
  clipboardButton: {
    zIndex: 100,
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

export const Post = ({
  date,
  budget,
  content,
  asset,
  id,
  checked,
  removePost,
  QUERY,
}) => {
  const cache = useQueryCache();
  const { user } = useAuth();
  const [post, setPost] = useState({ budget, date, content, asset });
  const socket = useSocket();
  const saveTimeout = useRef();
  const classes = useStyles();

  // const updatePost = () => {
  //   cache.seQueryData(QUERY, (old) => {
  //     console.log(old);
  //   });
  // }

  // useEffect(() => {
  //   setPost({ ...post, date });
  // }, [date]);

  useEffect(() => {
    socket.emit('join editor', id);
    socket.on('update post', ({ id: sId, data }) => {
      if (id !== sId) return;
      setPost({ ...post, ...data });
      console.log(data);
      cache.invalidateQueries(QUERY);
    });

    return () => socket.emit('leave editor', id);
  }, []);

  const updatePost = (update) => {
    setPost({ ...post, ...update });
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      socket.emit('update post', { id, ...update });
      cache.invalidateQueries(QUERY);
    }, 300);
  };

  const updateImage = async (file) => {
    const data = new FormData();
    data.append('file', file);
    const post = await putPost({ id, data });
    updatePost({ asset: post.asset });
  };

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={10}>
        <Grid container>
          <TextField
            label="Budget"
            variant="outlined"
            onChange={(e) => updatePost({ budget: e.target.value })}
            value={post.budget}
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
          />

          <DatePicker
            mask="__.__.____"
            disableToolbar
            label="Online am"
            variant="outlined"
            value={post.date}
            defaultValue={'Date'}
            onChange={(value) => {
              updatePost({ date: dayjs(value).valueOf() });
            }}
            renderInput={(props) => (
              <TextField
                {...props}
                helperText=""
                variant="outlined"
                style={{ marginLeft: '8px' }}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Grid container justify="flex-end">
          <DeleteButton
            onClick={() => {
              removePost(id);
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <EditorClient id={id} user={user} content={post.content}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={
              <AwesomeIcon icon={checked ? 'check-circle' : 'times-circle'} />
            }
            style={{ marginRight: '8px' }}
          >
            {checked ? 'checked' : 'not checked'}
          </Button>
        </EditorClient>
      </Grid>
      <Grid item xs={12} md={4}>
        <AssetUploader preview={post.asset} setFile={updateImage}>
          {post.asset && post.asset.path ? (
            <CopyToClipboard
              className={classes.clipboardButton}
              value={window.location.origin + post.asset.path}
            />
          ) : null}
        </AssetUploader>
      </Grid>
    </Grid>
  );
};

Post.defauftProps = {
  date: '',
  budget: '',
  content: '',
  asset: '',
};
