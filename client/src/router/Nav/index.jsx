import React from 'react';
import { AppBar, Avatar, Box, Button, Grid, Link } from '@material-ui/core';
import { useAuth } from 'services/auth-provider';
import { Link as RouterLink } from 'react-router-dom';

export const Nav = () => {
  const { logout, user } = useAuth();
  return (
    <AppBar position="static" style={{ marginBottom: '1rem' }}>
      <Box p={1} clone>
        <Grid container justify="space-between" alignItems="center">
          <Link component={RouterLink} to="/" color="inherit">
            Dashboard
          </Link>
          <Grid container style={{ width: 'auto' }} justify="flex-end">
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
            <Avatar>{user.username.slice(0, 1).toUpperCase()}</Avatar>
          </Grid>
        </Grid>
      </Box>
    </AppBar>
  );
};
