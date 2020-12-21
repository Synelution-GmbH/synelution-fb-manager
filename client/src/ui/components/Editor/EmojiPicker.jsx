import React, { useState } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import data from 'emoji-mart/data/facebook.json';
import { NimblePicker } from 'emoji-mart';
import {
  Avatar,
  Box,
  ClickAwayListener,
  Grow,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import { AwesomeIcon } from '../Icons/Icon';
import { Drag } from './Drag';
import { animated } from 'react-spring';

const useStyles = makeStyles((theme) => ({
  avatar: {
    overflow: 'visible',
  },
  closePicker: {
    position: 'absolute',
    top: '18px',
    left: '100%',
    width: '30px',
    cursor: 'pointer',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    padding: '6px 8px',
    borderBottomRightRadius: '4px',
    borderTopRightRadius: '4px',
    color: '#fff',
    display: 'flex',
    transition: '0.3s',
    '&:hover ': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  picker: ({ open }) => ({
    top: '100%',
    position: 'absolute',
    opacity: open ? 1 : 0,
    visibility: open ? 'visible' : 'hidden',
    zIndex: open ? 100 : 10,

    '& .emoji-mart': {
      boxShadow:
        '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)!important',
      border: 'none',
      padding: theme.spacing(1),
    },
    '& .emoji-mart-anchor': {
      cursor: 'pointer',
    },

    '& .emoji-mart .emoji-mart-emoji': {
      cursor: 'pointer',
    },
    '& .emoji-mart .emoji-mart-emoji span': {
      cursor: 'pointer',
    },
  }),
}));

export const EmojiePicker = React.memo(
  ({ onSelect, className, renderPicker = true, ...props }) => {
    const [open, setOpen] = useState();
    const classes = useStyles({ open });

    return (
      <>
        {/* <ClickAwayListener onClickAway={() => setOpen(false)}> */}
        <div>
          <Avatar
            {...props}
            className={classes.avatar + ' ' + className}
            variant="rounded"
            onClick={() => setOpen(!open)}
          >
            <AwesomeIcon icon={open ? 'times' : 'smile'} />
          </Avatar>

          <Drag className={classes.picker}>
            {({ setTransform }) =>
              renderPicker ? (
                <div
                  style={{
                    transition: '0.3s',
                    opacity: open ? 1 : 0,
                    transform: open ? 'scale(1)' : 'scale(0.8)',
                    transformOrigin: 'center top',
                  }}
                >
                  <Tooltip title="close" placement="top">
                    <div
                      className={classes.closePicker}
                      onClick={() => setOpen(false)}
                    >
                      <AwesomeIcon icon="times" />
                    </div>
                  </Tooltip>
                  <Tooltip title="reset position">
                    <div
                      className={classes.closePicker}
                      style={{ top: '50px' }}
                      onClick={() => setTransform(0, 0)}
                    >
                      <AwesomeIcon icon="redo" />
                    </div>
                  </Tooltip>
                  <Picker onSelect={onSelect} />
                </div>
              ) : null
            }
          </Drag>
        </div>
        {/* </ClickAwayListener> */}
      </>
    );
  }
);

const Picker = React.memo(({ onSelect }) => {
  return (
    <NimblePicker
      notFoundEmoji="sob"
      title="Emojies"
      set="facebook"
      data={data}
      onSelect={(emoji) => {
        onSelect(emoji.native);
        // setOpen(false);
      }}
      // onClick={(emoji) => {
      //   console.log(emoji);
      //   onSelect(emoji.native);
      //   setOpen(false);
      // }}
    />
  );
});
