import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
      if (!('serviceWorker' in navigator)) return;
      console.log('should work now 2');
      const registration = await navigator.serviceWorker.ready;
      if (!registration.waiting) return;
      if (update) setOpen(true);
    })();
  }, [update]);

  // useEffect(() => {
  //   if (!('serviceWorker' in navigator)) return;
  // }, []);

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
          onClick={async () => {
            const registration = await navigator.serviceWorker.ready;
            if (!registration.waiting) return window.location.reload();
            navigator.serviceWorker.addEventListener('controllerchange', () => {
              console.log('controllerchange');
              window.location.reload();
              // if (!refreshing) {
              // refreshing = true;
              // }
            });
            registration.waiting.postMessage('SKIP_WAITING');

            // window.location.reload(true);
          }}
        >
          Neu laden
        </Button>
      </DialogActions>
    </Dialog>
  );
};
