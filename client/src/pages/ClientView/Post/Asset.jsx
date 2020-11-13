import React from 'react';

export const Asset = ({ asset, className, smallImg }) => {
  return asset && asset.path ? (
    asset.image ? (
      <img className={className} src={smallImg ? asset.thumb : asset.path} alt="" />
    ) : (
      <video className={className} src={asset.path}></video>
    )
  ) : null;
};
