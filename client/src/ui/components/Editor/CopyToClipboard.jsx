import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { AwesomeIcon } from '../Icons/Icon';
import { askClipboardPermissions } from './helper';

export const CopyToClipboard = ({ value }) => {
  const [copied, setCopied] = useState(false);
  const saveToClipboard = async () => {
    await askClipboardPermissions();
    try {
      await navigator.clipboard.writeText(value);
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
