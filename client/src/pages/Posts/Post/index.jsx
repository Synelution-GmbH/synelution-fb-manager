import React, { useEffect, useRef, useState } from 'react';
import { Grid, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import { AssetUploader } from 'ui/components/AssetUploader';

import { DeleteButton } from './DeleteButton';
import { useSocket } from 'services/socket-provider';
import { EditorClient } from 'ui/components/EditorClient';
import { CopyToClipboard } from 'ui/components/Editor/CopyToClipboard';
import { putPost } from 'services';
import { useQueryCache } from 'react-query';
import { CheckedButton } from './CheckedButton';

import { PostDatePicker } from './PostDatePicker';

const useStyles = makeStyles((theme) => ({
  clipboardButton: {
    zIndex: 100,
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

export const useUpdate = () => {
  const cache = useQueryCache();

  const updateCache = ({ QUERY, index, update }) => {
    cache.setQueryData(QUERY, (old) => {
      old[index] = { ...old[index], ...update };
      return old;
    });
  };

  return { updateCache, cache };
};

export const Post = ({
  date,
  budget,
  content,
  asset,
  id,
  checked,
  removePost,
  QUERY,
  index,
  from,
  to,
}) => {
  const { updateCache } = useUpdate();
  const [post, setPost] = useState({ budget, date, content, asset, checked });
  const socket = useSocket();
  const saveTimeout = useRef();
  const classes = useStyles();

  useEffect(() => {
    socket.emit('join editor', id);
    socket.on('update post', ({ id: sId, data }) => {
      console.log(sId, data);
      if (id !== sId) return;
      setPost({ ...post, ...data });
      updateCache({ QUERY, index, update: data });
    });

    return () => socket.emit('leave editor', id);
    // eslint-disable-next-line
  }, []);

  const updatePost = (update) => {
    console.log(update);
    setPost({ ...post, ...update });
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      if (post.checked && !update.checked) {
        update.checked = false;
      }
      socket.emit('update post', { id, ...update });
      updateCache({ QUERY, index, update });
    }, 500);
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
          <PostDatePicker
            value={post.date}
            from={from}
            to={to}
            updatePost={updatePost}
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
        <EditorClient
          id={id}
          content={post.content}
          onSave={({ serializedValue }) => {
            const update = { id, content: serializedValue };
            if (post.checked) update.checked = false;
            socket.emit('update post', update);
            updateCache({ QUERY, index, update });
          }}
        >
          <CheckedButton
            checked={checked}
            style={{ marginRight: '8px' }}
            onClick={() => {
              updatePost({ checked: !checked });
            }}
          />
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
