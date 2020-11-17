import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  Slider,
} from '@material-ui/core';
import { Asset } from './Asset';
import { mapToObject } from 'utils';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { SliderButton } from './SliderButton';
import { ExitButton } from './SliderButton';

const useStyles = makeStyles((theme) => ({
  gallery: {
    position: 'relative',
    marginBottom: '6px',

    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    '& .MuiGrid-item': {
      cursor: 'pointer',
      position: 'relative',
      paddingRight: '1.5px',
      paddingLeft: '1.5px',
      '&:first-child': {
        marginBottom: '3px',
        paddingLeft: '0px',
      },
      '&:nth-child(2)': {
        paddingLeft: '0px',
      },
      '& .content-sizer': {
        position: 'relative',
        width: '100%',
        paddingTop: '50%',
      },
      '&:last-child': {
        paddingRight: 0,
      },
    },
  },

  slider: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  slide: {
    maxWidth: '1200px',
    maxHeight: '90vh',
    userSelect: 'none',
    '& img': {
      objectFit: 'contain',
    },
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    fontSize: '2rem',
    fontWeight: 500,
    color: '#fff',
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
  },
}));

const preloadImages = (...args) => {
  const images = [];
  for (var i = 0; i < args.length; i++) {
    images[i] = new Image();
    images[i].src = args[i];
  }
  return images;
};

export const Gallery = ({ assets, assetOrder, ...props }) => {
  const classes = useStyles();

  const [sliderIndex, setSliderIndex] = useState(assetOrder[0]);
  const [open, setOpen] = useState(false);

  const assetsM = useMemo(() => mapToObject(assets, (asset) => asset, 'name'), [
    assets,
  ]);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => {
      const indexNext = assetOrder[getNewSlideIndex('right')];
      const indexPrev = assetOrder[getNewSlideIndex('left')];
      const images = preloadImages(
        assetsM[indexNext].path,
        assetsM[indexPrev].path
      );
      console.log(images);
    }, 200);
  }, [open, sliderIndex]);

  const getNewSlideIndex = (direction) => {
    const numSlides = assetOrder.length;
    const increment = direction === 'right' ? 1 : -1;
    return (assetOrder.indexOf(sliderIndex) + increment + numSlides) % numSlides;
  };

  const slideChange = (direction) => {
    const newIndex = getNewSlideIndex(direction);
    setSliderIndex(assetOrder[newIndex]);
  };

  return (
    <>
      <Grid container className={classes.gallery}>
        {assetOrder.map((asset, i) => {
          const smallImg = i > 0 && assets.length >= 3;
          const smallerImg = assets.length >= 4;
          if (i >= 4) return null;
          return (
            <Grid
              key={asset}
              item
              xs={smallImg ? (smallerImg ? 4 : 6) : 12}
              onClick={() => {
                setSliderIndex(asset);
                setOpen(true);
              }}
            >
              <div
                className="content-sizer"
                style={{ paddingTop: smallImg ? '100%' : '50%' }}
              >
                <Asset asset={assetsM[asset]} smallImg={smallImg} {...props} />
                {assets.length > 4 && i === 3 ? (
                  <div className={classes.slider + ' ' + classes.overlay}>
                    <span>+{assets.length - 3}</span>
                  </div>
                ) : null}
              </div>
            </Grid>
          );
        })}
      </Grid>
      <Modal
        onClose={() => setOpen(false)}
        className={classes.slider}
        disableAutoFocus
        open={open}
      >
        <>
          <ExitButton onClick={() => setOpen(false)} />
          <SliderButton direction={'left'} onClick={() => slideChange('left')} />
          <Slide className={classes.slide} path={assetsM[sliderIndex].path} />
          <SliderButton onClick={() => slideChange('right')} />
        </>
      </Modal>
    </>
  );
};

const Slide = ({ path, ...props }) => {
  return <img {...props} src={path} alt="" />;
};
