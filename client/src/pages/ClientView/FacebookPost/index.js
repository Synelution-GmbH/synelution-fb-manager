import React from 'react';
import { Card, CardContent, styled } from '@material-ui/core';

const FB_CARD = styled(Card)({
  borderRadius: 'max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px',
  marginBottom: '16px',
});

export const FacebookPost = ({ content }) => {
  return (
    <FB_CARD>
      <CardContent>{content}</CardContent>
    </FB_CARD>
  );
};
