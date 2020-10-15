import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useQueryCache } from 'react-query';
import { useSocket } from 'services/socket-provider';
import { AwesomeIcon } from 'ui/components/Icons/Icon';

const useStyles = makeStyles((theme) => ({
  button: ({ success }) =>
    success
      ? {
          backgroundColor: theme.palette.success.main,
          '&:hover': {
            backgroundColor: theme.palette.success.dark,
          },
        }
      : null,
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
    // background: theme.palette.action.disabled,
  },
}));

export const FreigebenBtn = ({ approved, id, QUERY }) => {
  const cache = useQueryCache();
  const socket = useSocket();
  const [loading, setLoading] = useState();
  const classes = useStyles({ success: approved });

  useEffect(() => {
    setLoading(false);
  }, [approved]);

  return (
    <>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<AwesomeIcon icon="check-circle" />}
        disabled={loading}
        onClick={() => {
          setLoading(true);
          socket.emit(
            'client change',
            {
              id,
              approved: !approved,
            },
            (e) => {
              // setLoading(false);
              cache.invalidateQueries(QUERY);
            }
          );
        }}
      >
        {approved ? 'Freigegeben' : 'Freigeben'}
        {loading ? (
          <CircularProgress className={classes.buttonProgress} size={24} />
        ) : null}
      </Button>
    </>
  );
};