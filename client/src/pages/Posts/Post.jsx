import React, { useEffect, useRef, useState } from 'react';
import { Grid, InputAdornment, TextField } from '@material-ui/core';
import { Editor } from 'ui/components/Editor';
import { AssetUploader } from 'ui/components/AssetUploader';
import dayjs from 'dayjs';
import { FORMAT } from 'config';
import { DatePicker } from '@material-ui/pickers';
import { DeleteButton } from './DeleteButton';
import { useSocket } from 'services/socket-provider';
import { EditorClient } from 'ui/components/EditorClient';
import { useAuth, putPost } from 'services';

export const Post = ({ date, budget, content, asset, id, type, removePost }) => {
  const { user } = useAuth();
  const [post, setPost] = useState({ budget, date, content, asset });
  const socket = useSocket();
  const saveTimeout = useRef();
  useEffect(() => {
    setPost({ ...post, date });
  }, [date]);

  useEffect(() => {
    socket.emit('join editor', id);
    socket.on('update post', (data) => {
      setPost({ ...post, ...data });
    });

    return () => socket.emit('leave editor', id);
  }, []);

  const updatePost = (update) => {
    setPost({ ...post, ...update });
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      socket.emit('update post', { id, ...update });
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
        <EditorClient
          id={id}
          user={user}
          content={post.content}
          // onChange={({ operations, selection }) => {
          //   socket.emit('editor change', { id, operations, selection });
          // }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <AssetUploader previewImage={post.asset} setFile={updateImage} />
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
