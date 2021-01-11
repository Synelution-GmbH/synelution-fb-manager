import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { useAuth, checkCode } from 'services';
import { useQueryCache } from 'react-query';
import { Loader } from 'ui/components/Loader';

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: theme.palette.success.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));
export const AskCode = ({ id, QUERY }) => {
  const classes = useStyles();
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const cache = useQueryCache();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) return setError('Geben Sie einen Code ein');
    setLoading(true);
    try {
      const res = await checkCode({ code, id });
      cache.setQueryData(QUERY, () => res.queryData);
      setUser({ ...res.code, username: res.code.name, role: 'guest' });
      handleClose();
      setLoading(false);
    } catch (e) {
      setError(e.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await checkCode({ code: 'check', id });
        cache.setQueryData(QUERY, () => res.queryData);
        setUser({ ...res.code, username: res.code.name, role: 'guest' });
        handleClose();
        setLoading(false);
        console.log(res);
      } catch (error) {
        console.log(error);
        setLoading(false);
        if (!user) return handleOpen();
      }
    })();
  }, []);
  useEffect(() => {
    // if (!user) return handleOpen();
  }, [user]);
  console.log(loading);
  return (
    <>
      <Loader loading={loading} />
      <Dialog
        open={open}
        onBackdropClick={(e) => {
          e.preventDefault();
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            Geben Sie Ihren Code ein{' '}
            {process.env.NODE_ENV === 'development' ? 'ԅ(≖‿≖ԅ)' : ''}
          </DialogTitle>
          <DialogContent>
            <TextField
              value={code}
              onChange={(e) => setCode(e.target.value)}
              label="Code"
              fullWidth
              margin="dense"
              variant="outlined"
              focused
              autoFocus
              error={error ? true : false}
              helperText={error}
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={code ? false : true || loading}
              color="primary"
              onClick={handleSubmit}
            >
              Absenden
              {loading ? (
                <CircularProgress className={classes.buttonProgress} size={24} />
              ) : null}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
