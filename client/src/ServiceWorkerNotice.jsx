import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useServiceWorker } from 'services/service-worker-provider';

export const ServiceWorkerNotice = () => {
  const [open, setOpen] = useState(false);
  const { update } = useServiceWorker();

  useEffect(() => {
    (async function () {
      console.log('should work now');
      if (update) setOpen(true);
    })();
  }, [update]);

  if (!open) return null;
  return (
    <Dialog
      open={open}
      onBackdropClick={(e) => {
        e.preventDefault();
      }}
    >
      <DialogTitle>
        Es wurde eine neue Version gefunden!
        <br />
      </DialogTitle>
      <DialogContent dividers>
        <Typography>
          Um Ihnen die bestmögliche Erfahrung zu bieten, bitten wir sie diesen
          Anweisungen zu folgen:
          <br />
          <br />
          1.) Schließen Sie alle anderen Tabs dieser Seite.
          <br />
          2.) Laden Sie die Seite neu.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            window.location.reload(true);
          }}
        >
          Neu laden
        </Button>
      </DialogActions>
    </Dialog>
  );
};
