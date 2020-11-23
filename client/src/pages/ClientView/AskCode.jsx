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
  const [loading, setLoading] = useState('');
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
        const res = await checkCode({ code: 'check', id });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);
  useEffect(() => {
    if (!user) return handleOpen();
  }, [user]);

  return (
    <Dialog
      open={open}
      onBackdropClick={(e) => {
        e.preventDefault();
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Geben Sie Ihren Code ein ԅ(≖‿≖ԅ)</DialogTitle>
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
  );
};
