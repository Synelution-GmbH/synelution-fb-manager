import { Button, Drawer, makeStyles, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
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
}));

export const CommentBox = () => {
  const classes = useStyles();
  const [open, setOpen] = useState();
  return (
    <>
      <Tooltip title="Comments" placement="top">
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="medium"
          onClick={() => setOpen(true)}
        >
          <AwesomeIcon icon="comments" />
        </Button>
      </Tooltip>
      <Drawer anchor="left" open={open}>
        <div>hi</div>
      </Drawer>
    </>
  );
};
