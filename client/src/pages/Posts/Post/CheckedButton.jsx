import { Avatar, Button, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';
import { useAuth } from 'services';
import { AwesomeIcon } from 'ui/components/Icons/Icon';

const useStyles = makeStyles((theme) => ({
  button: ({ checked }) => ({
    backgroundColor: checked
      ? theme.palette.success.main
      : theme.palette.error.main,
    '&:hover': {
      backgroundColor: checked
        ? theme.palette.success.dark
        : theme.palette.error.dark,
    },
  }),
  avatar: ({ checked }) => ({
    backgroundColor:
      (checked ? theme.palette.success.main : theme.palette.error.main) +
      '!important',
    cursor: 'default',
  }),
}));

export const CheckedButton = ({ checked, onClick, ...props }) => {
  const { user } = useAuth();

  const classes = useStyles({ checked });
  return user.role === 'proofreader' ? (
    <Tooltip title="set as read and corrected" placement="bottom">
      <Button
        {...props}
        className={classes.button}
        onClick={onClick}
        variant="contained"
        color="primary"
        startIcon={<AwesomeIcon icon={checked ? 'check-circle' : 'times-circle'} />}
      >
        {checked ? 'verified' : 'verify now!'}
      </Button>
    </Tooltip>
  ) : (
    <Tooltip title={checked ? 'approved' : 'not approved'} placement="bottom">
      <Avatar {...props} className={classes.avatar} variant="rounded">
        <AwesomeIcon icon={checked ? 'check-circle' : 'times-circle'} />
      </Avatar>
    </Tooltip>
  );
};
