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
