import React, { useState } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import data from 'emoji-mart/data/facebook.json';
import { NimblePicker } from 'emoji-mart';
import { Avatar, Box, Grow, makeStyles } from '@material-ui/core';
import { AwesomeIcon } from '../Icons/Icon';

const useStyles = makeStyles((theme) => ({
  avatar: {
    overflow: 'visible',
  },
  picker: ({ open }) => ({
    top: '100%',
    position: 'absolute',
    opacity: open ? 1 : 0,
    visibility: open ? 'visible' : 'hidden',

    '& .emoji-mart': {
      boxShadow:
        '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)!important',
      border: 'none',
      padding: theme.spacing(1),
    },
    '& .emoji-mart-anchor': {
      cursor: 'pointer',
    },
  }),
}));

export const EmojiePicker = ({ onSelect }) => {
  const [open, setOpen] = useState();
  const classes = useStyles({ open });

  return (
    <>
      <Avatar
        className={classes.avtar}
        variant="rounded"
        onClick={() => setOpen(!open)}
      >
        <AwesomeIcon icon="smile" />
      </Avatar>
      <Box className={classes.picker}>
        <Grow in={open} style={{ transformOrigin: '0 0 0' }}>
          <NimblePicker
            notFoundEmoji="sob"
            title="Emojies"
            set="facebook"
            data={data}
            onSelect={(emoji) => {
              console.log(emoji);
              onSelect(emoji.native);
              setOpen(false);
            }}
            // onClick={(emoji) => {
            //   console.log(emoji);
            //   onSelect(emoji.native);
            //   setOpen(false);
            // }}
          />
        </Grow>
      </Box>
    </>
  );
};
