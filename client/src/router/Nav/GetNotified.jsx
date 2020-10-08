import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useAuth } from 'services';
import { urlBase64ToUint8Array } from 'utils';
import axios from 'axios';

const options = {
  userVisibleOnly: true,
  applicationServerKey: urlBase64ToUint8Array(
    'BODI-sL_suVRxxD-ek-DvGQ2yBNTa1pyKpdxpc2jrk_g1C3BJhhn56gNYRPkSKdx1E0k354xlu-v_29PnVEeGKU'
  ),
};
export const GetNotified = () => {
  const { user } = useAuth();

  useEffect(() => {
    window.addEventListener('load', async function () {
      console.log('hi');
      const registration = await navigator.serviceWorker.ready;
      console.log(registration);
      // console.log(registration.pushManager.permissionState());
    });
  }, []);
  const handleClick = async () => {
    const registration = await navigator.serviceWorker.ready;
    console.log('registering push');
    const subscription = await registration.pushManager.subscribe(options);
    console.log('Registered push');
    console.log(subscription);
    console.log(user);
    axios.post('/subscription', subscription);
    // window.ServiceWorkerRegistration.pushManager
    //       .subscribe(options)
    //       .then(function (pushSubscription) {
    //         console.log('works');
    // });
  };

  return user.role === 'proofreader' ? (
    <Button onClick={handleClick}>enable notifications</Button>
  ) : null;
};
