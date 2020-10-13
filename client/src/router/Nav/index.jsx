import React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  makeStyles,
} from '@material-ui/core';
import { useAuth } from 'services/auth-provider';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import { GetNotified } from './GetNotified';

const useStyles = makeStyles((theme) => ({
  appBar: ({ type }) => ({
    marginBottom: '1rem',
    background: type ? theme.palette[type] : theme.palette.primary.main,
    transition: '0.3s',
  }),
}));

const extensionLink = {
  chrome:
    'https://chrome.google.com/webstore/detail/grammar-and-spell-checker/oldceeleldhonbafppcapldpdifcinji',
  firefox:
    'https://addons.mozilla.org/en-GB/firefox/addon/languagetool/?utm_source=external-ltp-homepage',
};

const getBrowser = () => {
  var isFirefox = typeof InstallTrigger !== 'undefined';
  if (isFirefox) return 'firefox';
  return 'chrome';
};
export const Nav = () => {
  const { logout, user } = useAuth();
  let dateParams = useRouteMatch('/:client/posts/:type');

  const classes = useStyles({ type: dateParams && dateParams.params.type });
  return (
    <AppBar position="static" className={classes.appBar}>
      <Box p={1} clone>
        <Grid container justify="space-between" alignItems="center">
          <div>
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              style={{ marginRight: '8px' }}
            >
              Dashboard
            </Link>
          </div>
          <Grid container style={{ width: 'auto' }} justify="flex-end">
            <GetNotified color="inherit" />
            <Button
              onClick={() => window.open(extensionLink[getBrowser()], '_blank')}
              color="inherit"
            >
              Install Spellchecker
            </Button>
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
