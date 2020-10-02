import React from 'react';
import { CircularProgress, Box, Grid } from '@material-ui/core';

export const Loader = ({ loading }) => {
  return (
    <Box clone bgcolor="primary.main">
      <Grid
        container
        style={{
          height: '100vh',
          color: 'white',
          position: 'fixed',
          top: 0,
          opacity: loading ? 1 : 0,
          visibility: loading ? 'visible' : 'hidden',
          transition: '0.5s',
          zIndex: 10000,
        }}
        justify="center"
        alignItems="center"
      >
        <CircularProgress color="inherit" />
      </Grid>
    </Box>
  );
};
