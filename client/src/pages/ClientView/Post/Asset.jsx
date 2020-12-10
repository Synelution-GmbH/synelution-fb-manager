import React from 'react';
import { useObjectFitPolyfill } from 'utils';
import { Video } from 'ui/components/AssetUploader/Video';


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
      <Video
        className={className}
        containerStyles={{ position: 'relative', marginBottom: '8px' }}
        src={asset.path}
      ></Video>
    )
  ) : null;
};
