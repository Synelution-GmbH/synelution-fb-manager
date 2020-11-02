import React from 'react';

export const Asset = ({ asset, className }) => {
  return asset && asset.path ? (
    asset.image ? (
      <img className={className} src={asset.path} alt="" />
    ) : (
      <video className={className} src={asset.path}></video>
    )
  ) : null;
};
