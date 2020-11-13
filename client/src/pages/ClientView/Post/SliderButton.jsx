import { makeStyles } from '@material-ui/core';
import React from 'react';
import { AwesomeIcon } from 'ui/components/Icons/Icon';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '48px',
    height: '48px',
    backgroundColor: '#e4e6eb',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: ({ right }) => ({
    cursor: 'pointer',
    padding: '16px',
    position: 'absolute',
    right: right ? 0 : 'auto',
    left: right ? 'auto' : 0,
    top: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    opacity: 0.6,
    transition: '0.25s',

    '&:hover': {
      transform: right ? 'translateX(6px)' : 'translateX(-6px)',
      opacity: 1,
    },

    '& svg': {
      fontSize: '24px',
    },
  }),

  exitButton: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    zIndex: 100,
    cursor: 'pointer',
    '& svg': {
      fontSize: '24px',
    },
  },
}));

export const ExitButton = (props) => {
  const classes = useStyles();

  return (
    <div {...props} className={classes.button + ' ' + classes.exitButton}>
      <AwesomeIcon icon={`times`} />
    </div>
  );
};

export const SliderButton = ({ direction = 'right', ...props }) => {
  const classes = useStyles({ right: direction === 'right' });
  return (
    <div {...props} className={classes.buttonContainer}>
      <div className={classes.button}>
        <AwesomeIcon icon={`chevron-${direction}`} />
      </div>
    </div>
  );
};
