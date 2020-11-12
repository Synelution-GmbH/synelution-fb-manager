export function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const isIE = () => {
  var ua = navigator.userAgent;
  /* MSIE used to detect old browsers and Trident used to newer ones*/
  var is_ie = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
  return is_ie;
};
export const IE = isIE();

export const getErrorText = (error) => {
  switch (error) {
    case 'invalidDate':
      return 'Invalid Date';
    case 'minDate':
    case 'maxDate':
      return 'Date not in current range';

    default:
      return null;
  }
};

export const setQueryFocusHandler = (queryFocus) => {
  let timeout;
  const checkRefetch = () => {
    // const userLeftTab = window.localStorage.getItem('userLeftTab') || 0;
    // return parseInt(userLeftTab) + 1000 * 5 <= Date.now();
    const dontRefetch = window.localStorage.getItem('dont-refetch');
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      window.localStorage.removeItem('dont-refetch');
    }, 1000);
    return !dontRefetch;
  };
  const handleFocus = (e) => {
    console.log('focus');
    if (checkRefetch()) {
      console.log('its okay to refetch');
      queryFocus(e);
    } else {
      console.log('god no dont do it');
    }
  };

  // const handleBlur = function () {
  //   console.log('blur');
  //   window.localStorage.setItem('userLeftTab', Date.now());
  // };

  const handleVisibilityChange = function (e) {
    console.log('visible');
    if (document.visibilityState === 'visible') {
      handleFocus(e);
    }
  };

  if (typeof window !== 'undefined' && window.addEventListener) {
    // window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus, false);
    window.addEventListener('visibilitychange', handleVisibilityChange, false);
  }

  return () => {
    // window.removeEventListener('blur', handleBlur);
    clearTimeout(timeout);
    window.removeEventListener('focus', handleFocus);
    window.removeEventListener('visibilitychange', handleVisibilityChange);
  };
};
