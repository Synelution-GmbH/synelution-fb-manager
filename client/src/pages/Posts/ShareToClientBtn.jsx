import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { askClipboardPermissions } from 'ui/components/Editor/helper';

import { postClientLink } from 'services/client-link-api';
import { useAuth } from 'services';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: `0 ${theme.spacing(1)}px`,
    display: 'flex',
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.success.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  button: ({ copied }) => ({
    backgroundColor: copied
      ? theme.palette.success.main
      : theme.palette.secondary.main,
  }),
}));

export const ShareToClientButton = ({ data }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const classes = useStyles({ copied });

  const saveToClipboard = async (value) => {
    await askClipboardPermissions();
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      let link = '';
      if (copied) {
        link = copied;
      } else {
        const res = await postClientLink(data);
        link = window.location.origin + '/preview/' + res.uuid;
      }

      await saveToClipboard(link);
      setLoading(false);
      setCopied(link);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    setCopied(false);
  }, [data.from, data.to, data.type, data.client]);

  return user.role === 'proofreader' ? (
    <div className={classes.wrapper}>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        startIcon={<AwesomeIcon icon={copied ? 'check-circle' : 'link'} />}
        onClick={handleClick}
        disabled={loading}
      >
        {copied ? 'copy again' : 'Get Link for Client'}
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  ) : null;
};
