import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'services';
import { urlBase64ToUint8Array } from 'utils';
import axios from 'axios';
import { AwesomeIcon } from 'ui/components/Icons/Icon';

const options = {
  userVisibleOnly: true,
  applicationServerKey: urlBase64ToUint8Array(
    'BODI-sL_suVRxxD-ek-DvGQ2yBNTa1pyKpdxpc2jrk_g1C3BJhhn56gNYRPkSKdx1E0k354xlu-v_29PnVEeGKU'
  ),
};
const requestPermission = () =>
  new Promise((resolve, reject) => {
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === 'granted') {
      resolve('granted');
    }

    // Otherwise, we need to ask the user for permission
    else {
      Notification.requestPermission()
        .then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === 'granted') {
            new Notification('Thanks you will be notified!');
            resolve('granted');
          }
        })
        .catch((e) => {
          console.log(e);
          reject('denied');
        });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  });

export const GetNotified = (props) => {
  const { user } = useAuth();
  const [enabled, setEnabled] = useState();

  useEffect(() => {
    (async function () {
      if (Notification.permission !== 'granted') return;
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) return setEnabled(true);
    })();
  }, []);
  const handleClick = async () => {
    try {
      await requestPermission();
      const registration = await navigator.serviceWorker.ready;
      console.log('registering push');
      const subscription = await registration.pushManager.subscribe(options);
      console.log('Registered push');
      axios.post('/subscription', subscription);
    } catch (e) {
      console.log(e);
    }
  };

  return user.role === 'proofreader' ? (
    <Button
      {...props}
      onClick={handleClick}
      startIcon={<AwesomeIcon icon={enabled ? 'bell' : 'bell-slash'} />}
    >
      {enabled ? 'notifications enabled' : 'enable notifications'}
    </Button>
  ) : null;
};
