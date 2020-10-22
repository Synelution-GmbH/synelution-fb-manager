import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from 'services';
import { MessageBox } from './MessageBox';
import { Button } from '@material-ui/core';

export const NotifyProofreaderBtn = ({ data }) => {
  const { user } = useAuth();
  const [info, setInfo] = useState({ toggle: false, text: '' });
  const handleClick = async () => {
    try {
      await axios.post('/subscription/send', {
        title: `fb-tool notification!`,
        timestamp: Date.now(),
        body: `${user.username} requests proofread`,
        ...data,
      });
      setInfo({ toggle: true, text: 'successfully send', severity: 'success' });
    } catch (e) {
      console.log(e);
      setInfo({ toggle: true, text: 'something went wrong D:', severity: 'error' });
    }
  };

  return (
    <>
      <MessageBox {...info} />
      {user.role === 'worker' ? (
        <Button
          style={{ justifySelf: 'flex-end' }}
          variant="contained"
          color="secondary"
          onClick={handleClick}
        >
          send to project lead
        </Button>
      ) : null}
    </>
  );
};
