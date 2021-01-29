import {
  Button,
  Drawer,
  makeStyles,
  Portal,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { EditorClient } from 'ui/components/EditorClient';
import { AwesomeIcon } from 'ui/components/Icons/Icon';

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'absolute',
    top: '30px',
    left: '-25px',
    padding: '10px',
    paddingRight: '20px',
    zIndex: -1,
    fontSize: 'inherit',
    minWidth: 'auto',
  },

  drawer: {
    width: 350,
    flexShrink: 0,
    transition: '0.3s',
    zIndex: 1000,
  },
  drawerPaper: {
    width: 350,
    overflow: 'hidden',
  },

  editor: {
    width: '100%',

    maxHeight: 'calc(100% - 60px)',
    overflow: 'auto',
  },
  close: {
    position: 'absolute',
    top: 12,
    right: 20,
    fontSize: 24,
    cursor: 'pointer',
  },
}));

export const CommentBox = ({ updatePost, comments }) => {
  const classes = useStyles();
  const [open, setOpen] = useState();

  const container = useMemo(() => document.querySelector('.drawer-container'), []);
  const postContainer = useMemo(
    () => document.querySelector('.post-container'),
    []
  );
  useEffect(() => {
    const left = postContainer.getBoundingClientRect().left;
    if (open && left === 380) return;

    if (open) postContainer.style.transform = `translateX(${380 - left}px)`;
    else postContainer.style.transform = 'translateX(0px)';
  }, [open]);

  return (
    <>
      <Tooltip title="Comments" placement="top">
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="medium"
          onClick={() => setOpen(!open)}
        >
          <AwesomeIcon icon="comments" />
        </Button>
      </Tooltip>
      <Portal container={container}>
        <Drawer
          anchor="left"
          open={open}
          // style={{ transform: open ? 'translateX(-0px)' : 'translateX(-350px)' }}
          variant="persistent"
          onClose={() => setOpen(false)}
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
        >
          <Typography variant="h6" style={{ padding: '12px 20px 12px' }}>
            Comments
          </Typography>
          <div className={classes.close} onClick={() => setOpen(false)}>
            <AwesomeIcon icon="times" />
          </div>
          <EditorClient
            className={classes.editor}
            content={comments}
            onSave={({ serializedValue }) => {
              const update = { comments: serializedValue };
              updatePost(update);
            }}
          />
        </Drawer>
      </Portal>
    </>
  );
};
