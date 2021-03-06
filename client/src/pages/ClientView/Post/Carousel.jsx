import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CardContent, makeStyles } from '@material-ui/core';
import { Asset } from './Asset';
import { isIE, mapToObject } from 'utils';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'scss/swiper.min.css';
import { SliderButton } from './SliderButton';
import { webkitLineClamp } from 'webkit-line-clamp';

SwiperCore.use([Navigation]);
const useStyles = makeStyles(() => ({
  gallery: {
    // position: 'relative',
    marginBottom: '6px',
    // overflow: 'hidden',

    '& .swiper-slide .img': {
      fontSize: 0,
    },
    '& .swiper-slide': {
      margin: '0 4px',
      width: '302px',
      borderRadius: 'max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px',
      overflow: 'hidden',
      border: '1px solid #e2e4e7',
    },
    '& .slide img': {
      objectFit: 'cover',
      cursor: 'pointer',
      position: 'relative',
      width: '302px',
      height: '302px',
    },
  },

  galleryWrapper: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
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

  link: {
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
    '&:active, &:visited': {
      color: 'inherit',
    },
  },

  slideContent: {
    height: '73px',
    boxSizing: 'border-box',
    padding: '8px 12px 11px',
    fontSize: '16px',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  text: {
    display: 'block',
    lineClamp: 1,
    lineHeight: 1.2308,
    display: '-webkit-box',
    boxOrient: 'vertical',
    overflow: 'hidden',
    fontSize: '.8125rem',
    margin: 0,
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
  },
  title: {
    lineHeight: '1.3333',
    fontSize: '.9375em',
    display: 'block',
    display: '-webkit-box',
    boxOrient: 'vertical',
    overflow: 'hidden',
    lineClamp: 2,
    fontWeight: 600,
    margin: 0,
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
  },

  sliderButton: {
    zIndex: 100,
    opacity: 1,
    backgroundColor: 'transparent',
    transform: 'translateX(0)!important',

    '& > div': {
      backgroundColor: '#fff',
      transition: '0.3s',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      '&:hover': {
        backgroundColor: '#e4e6eb',
      },
    },
  },
}));

export const AssetCarousel = ({ assets, assetOrder, ...props }) => {
  const classes = useStyles();
  const assetsM = useMemo(() => mapToObject(assets, (asset) => asset, 'name'), [
    assets,
  ]);
  const swiper = useRef();
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const settings = {
    loop: false,
    speed: 500,
    slidesPerView: 'auto',
    setWrapperSize: true,
  };

  const slideNext = () => {
    if (!swiper.current) return;
    swiper.current.slideNext();
    setIsStart(swiper.current.isBeginning);
    setIsEnd(swiper.current.isEnd);
  };
  const slidePrev = () => {
    if (!swiper.current) return;
    swiper.current.slidePrev();
    setIsStart(swiper.current.isBeginning);
    setIsEnd(swiper.current.isEnd);
  };

  return (
    <div style={{ paddingLeft: '10px' }}>
      <Swiper
        {...settings}
        simulateTouch={false}
        onSwiper={(newSwiper) => {
          swiper.current = newSwiper;
          setIsStart(swiper.current.isBeginning);
          setIsEnd(swiper.current.isEnd);
        }}
        className={classes.gallery}
      >
        {assetOrder.map((asset, i) => {
          return (
            <SwiperSlide
              href={assetsM[asset].link}
              target="_blank"
              rel="noreferrer noopener"
              tag={assetsM[asset].link ? 'a' : 'div'}
              key={asset}
              className={classes.link}
            >
              <Slide asset={assetsM[asset]} {...props} />
            </SwiperSlide>
          );
        })}
        <SliderButton
          className={classes.sliderButton}
          direction={'left'}
          onClick={slidePrev}
          style={{
            opacity: !isStart ? 1 : 0,
            visibility: !isStart ? 'visible' : 'hidden',
          }}
        />
        <SliderButton
          className={classes.sliderButton}
          direction={'right'}
          onClick={slideNext}
          style={{
            opacity: isEnd ? 0 : 1,
            visibility: !isEnd ? 'visible' : 'hidden',
          }}
        />
      </Swiper>
    </div>
  );
};

const Slide = ({ asset, path, ...props }) => {
  const classes = useStyles();
  const slideRef = useRef();
  useEffect(() => {
    if (!isIE()) return;
    webkitLineClamp(slideRef.current.querySelector(`.${classes.title}`), 2);
    webkitLineClamp(slideRef.current.querySelector(`.${classes.text}`), 1);
  }, []);

  return (
    <>
      <div className="img">
        <Asset asset={asset} {...props} />
      </div>
      <div ref={slideRef} className={classes.slideContent}>
        <p className={classes.title}>{asset.title}</p>
        <p className={classes.text}>{asset.content}</p>
      </div>
    </>
  );
};
