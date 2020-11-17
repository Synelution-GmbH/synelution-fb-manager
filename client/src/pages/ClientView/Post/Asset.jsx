import React from 'react';
import { useObjectFitPolyfill } from 'utils';

export const Asset = ({ asset, className, smallImg, ...props }) => {
  return asset && asset.path ? (
    asset.image ? (
      <img
        {...props}
        className={className}
        src={smallImg ? asset.thumb : asset.path}
        alt=""
      />
    ) : (
      <video className={className} src={asset.path}></video>
    )
  ) : null;
};
