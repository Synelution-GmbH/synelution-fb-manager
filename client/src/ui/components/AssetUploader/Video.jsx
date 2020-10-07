import React, { useEffect, useRef, useState } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { AwesomeIcon } from 'ui/components/Icons/Icon';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: '0.3s',
  },
  button: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
    opacity: 0,
    visibility: 'hidden',
    transition: '0.3s',
    color: '#fff',
  },
  videoContainer: {
    zIndex: 99,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    background: '#000',
    '&:hover .MuiIconButton-root': {
      opacity: 1,
      visibility: 'visible',
    },
    '&:hover video': {
      opacity: 0.7,
    },
  },
}));
export const Video = (props) => {
  const ref = useRef();
  const [playing, setPlaying] = useState('init');
  const classes = useStyles();

  useEffect(() => {
    if (!ref.current || playing === 'init') return;
    if (playing) ref.current.pause();
    else ref.current.play();
  }, [playing]);
  return (
    <div className={classes.videoContainer}>
      <video ref={ref} className={classes.video} loop {...props}></video>
      <IconButton
        className={classes.button}
        onClick={(e) => {
          e.stopPropagation();
          setPlaying(!playing);
        }}
      >
        <AwesomeIcon icon={playing ? 'play' : 'pause'} />
      </IconButton>
    </div>
  );
};
