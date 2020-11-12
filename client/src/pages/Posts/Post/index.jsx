import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Grid, InputAdornment, TextField } from '@material-ui/core';

import { DeleteButton } from './DeleteButton';
import { useSocket } from 'services/socket-provider';
import { EditorClient } from 'ui/components/EditorClient';
import { putPost } from 'services';
import { useQueryCache } from 'react-query';
import { CheckedButton } from './CheckedButton';

import { PostDatePicker } from './PostDatePicker';
import { ClientToolbox } from './ClientToolbox';
import { Asset } from './Asset';
import { AssetUploaderProvider } from 'ui/components/AssetUploader/AssetUploaderContext';

export const useUpdate = () => {
  const cache = useQueryCache();

  const updateCache = ({ QUERY, index, update }) => {
    cache.setQueryData(QUERY, (old) => {
      if (!old) return [update];
      old[index] = { ...old[index], ...update };
      return old;
    });
  };

  return { updateCache, cache };
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'update_post':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export const Post = ({
  approved,
  clientCorrected,
  imageChanges,
  date,
  budget,
  content,
  assets = [],
  assetOrder = [],
  id,
  checked,
  removePost,
  QUERY,
  index,
  from,
  to,
}) => {
  const { updateCache } = useUpdate();
  // const [post, setPost] = useState({
  //   budget,
  //   date,
  //   content,
  //   assets,
  //   assetOrder,
  //   checked,
  // });
  const [post, dispatch] = useReducer(reducer, {
    budget,
    date,
    content,
    assets,
    assetOrder,
    checked,
  });
  const socket = useSocket();
  const saveTimeout = useRef();
  useEffect(() => {
    socket.emit('join editor', id);

    return () => socket.emit('leave editor', id);
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    socket.on('update post', ({ id: sId, data }) => {
      if (id !== sId) return;
      dispatch({ type: 'update_post', payload: data });
      updateCache({ QUERY, index, update: data });
    });
  }, []);

  const updatePost = (update) => {
    dispatch({ type: 'update_post', payload: update });
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      if (post.checked && !update.checked) {
        update.checked = false;
      }
      socket.emit('update post', { id, ...update });
      updateCache({ QUERY, index, update });
    }, 500);
  };
  // console.log('post');
  // console.log(post);
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
          <ClientToolbox
            approved={approved}
            clientCorrected={clientCorrected}
            imageChanges={imageChanges}
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
      <AssetUploaderProvider handleDragEnd={updatePost}>
        <Asset
          assets={post.assets}
          assetOrder={post.assetOrder}
          id={id}
          updatePost={updatePost}
        />
      </AssetUploaderProvider>
    </Grid>
  );
};

Post.defauftProps = {
  date: '',
  budget: '',
  content: '',
  asset: '',
};
