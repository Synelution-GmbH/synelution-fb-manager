import React from 'react';
import { Asset } from './Asset';
import { AssetCarousel } from './Carousel';
import { Gallery } from './Gallery';

export const AssetPicker = ({ assets, assetOrder, ...props }) => {
  if (!assets || assets.length <= 0) return null;
  if (assets.length === 1) return <Asset {...props} asset={assets[0]} />;

  const isCarousel = assets.filter((asset) => asset.content);
  if (isCarousel.length > 0)
    return <AssetCarousel {...props} assetOrder={assetOrder} assets={assets} />;

  return <Gallery {...props} assetOrder={assetOrder} assets={assets} />;
};
