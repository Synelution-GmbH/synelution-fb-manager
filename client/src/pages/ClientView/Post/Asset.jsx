import React from 'react';
import { Video } from 'ui/components/AssetUploader/Video';

export const Asset = ({ asset, className }) => {
  return asset && asset.path ? (
    asset.image ? (
      <img className={className} src={asset.path} alt="" />
    ) : (
      <Video
        className={className}
        containerStyles={{ position: 'relative', marginBottom: '8px' }}
        src={asset.path}
      ></Video>
    )
  ) : null;
};
