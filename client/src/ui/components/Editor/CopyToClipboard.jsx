import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { AwesomeIcon } from '../Icons/Icon';
import { askClipboardPermissions } from './helper';

const setToClipboard = (blob) => {
  const data = [new window.ClipboardItem({ [blob.type]: blob })];
  return navigator.clipboard.write(data);
};

const getPngBlob = ({ src }) =>
  new Promise((resolve, reject) => {
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    const img = new Image();
    console.log('asd');
    img.onload = () => {
      c.height = img.height;
      c.width = img.width;
      ctx.drawImage(img, 0, 0);
      const newName = src.replace(/\.\w{1,}$/g, '.png');
      console.log(newName);
      c.toBlob(
        function (blob) {
          resolve(blob);
        },
        'image/png',
        1
      );
    };
    img.src = src;
  });

export const CopyToClipboard = ({ value, ...props }) => {
  const [copied, setCopied] = useState(false);
  const saveToClipboard = async (e) => {
    e.stopPropagation();
    const permission = await askClipboardPermissions();
    try {
      if (value.search(/\.(gif|jpe?g|bmp)$/g) !== -1) {
        const blob = await getPngBlob({ src: value });
        await setToClipboard(blob);
      } else if (value.search(/\.(png)$/g) !== -1) {
        const res = await fetch(value);
        const blob = await res.blob();
        await setToClipboard(blob);
      } else {
        await navigator.clipboard.writeText(value);
      }
      setCopied(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (copied)
      setTimeout(() => {
        setCopied(false);
      }, 1000);
  }, [copied]);

  return (
    <Button
      {...props}
      color="primary"
      onClick={saveToClipboard}
      variant="contained"
      size="medium"
      style={{ padding: '8px 16px' }}
      endIcon={<AwesomeIcon icon="copy" style={{ marginLeft: '8px' }} />}
    >
      {copied ? 'Copied' : 'Copy'}
    </Button>
  );
};
