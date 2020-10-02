import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Editor } from 'ui/components/Editor';
import { AssetUploader } from 'ui/components/AssetUploader';

export const Post = () => {
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12}>
        <Typography>Budget:</Typography>
        <Typography>Online am:</Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Editor />
      </Grid>
      <Grid item xs={12} md={4}>
        <AssetUploader />
      </Grid>
    </Grid>
  );
};
