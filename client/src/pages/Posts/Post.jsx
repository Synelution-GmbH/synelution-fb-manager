import React, { useEffect, useState } from 'react';
import { Grid, InputAdornment, TextField } from '@material-ui/core';
import { Editor } from 'ui/components/Editor';
import { AssetUploader } from 'ui/components/AssetUploader';
import dayjs from 'dayjs';
import { FORMAT } from 'config';
import { DatePicker } from '@material-ui/pickers';
import { DeleteButton } from './DeleteButton';
import { useSocket } from 'services/socket-provider';

export const Post = ({ date, budget, content, asset, id, type, removePost }) => {
  const [post, setPost] = useState({ budget, date });
  const socket = useSocket();
  useEffect(() => {
    setPost({ ...post, date });
  }, [date]);

  useEffect(() => {
    socket.emit('join editor', id);

    return () => socket.emit('leave editor', id);
  }, []);
  console.log(post);
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={10}>
        <Grid container>
          <TextField
            label="Budget"
            variant="outlined"
            onChange={(e) => setPost({ ...post, budget: e.target.value })}
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
              setPost({ ...post, date: value });
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
        <Editor
          onChange={({ operations, selection }) => {
            socket.emit('editor change', { id, operations, selection });
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <AssetUploader />
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
