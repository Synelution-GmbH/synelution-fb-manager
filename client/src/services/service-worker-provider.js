import React, { createContext, useContext, useState, useEffect } from 'react';
import * as serviceWorker from '../serviceWorker';

const ServiceWorkerContext = createContext();
export const useServiceWorker = () => useContext(ServiceWorkerContext);

export const ServiceWorkerProvider = (props) => {
  const [state, setState] = useState({ update: false });

  useEffect(() => {
    serviceWorker.register({
      onUpdate: (registration) => {
        console.log(registration);
        console.log('update available');
        setState({ ...state, update: true });
      },
      onSuccess: (registration) => {
        console.log(registration);
        console.log('success');
      },
    });
  }, []);

  console.log(state);
  return (
    <>
      <ServiceWorkerContext.Provider value={state} {...props} />
    </>
  );
};
