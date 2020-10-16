import {
  Avatar,
  Badge,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AwesomeIcon } from 'ui/components/Icons/Icon';

const useStyles = makeStyles((theme) => ({
  avatar: ({ approved }) => ({
    backgroundColor: approved ? theme.palette.success.main : null,
  }),
  info: {
    backgroundColor: theme.palette.warning.main,
  },
  large: {
    marginLeft: theme.spacing(1),
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
  },
}));

export const ClientToolbox = ({ approved, clientCorrected, imageChanges: ic }) => {
  const classes = useStyles({ approved });
  const [open, setOpen] = useState(false);
  const [imageChanges, setImageChanges] = useState(ic);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const unfinishedImageChanges = useMemo(
    () => imageChanges.filter(({ done }) => !done),
    [imageChanges]
  );
  const imageChangesExist = imageChanges.length > 0;

  return (
    <>
      <Tooltip title={approved ? 'Freigegeben' : 'nicht Freigegeben'}>
        <Avatar
          className={(approved ? ' rainbow ' : '') + classes.large}
          variant="rounded"
        >
          <AwesomeIcon icon="check-circle" />
        </Avatar>
      </Tooltip>
      <Tooltip title={clientCorrected ? 'Customer changed text!' : ''}>
        <Avatar
          className={`${classes.large} ${clientCorrected ? 'rainbow' : 'test'}`}
          variant="rounded"
        >
          <AwesomeIcon icon="pen" />
        </Avatar>
      </Tooltip>
      <Tooltip title={imageChangesExist > 0 ? 'Client is ****' : ''}>
        <Badge color="primary" badgeContent={unfinishedImageChanges.length}>
          <Avatar
            onClick={() => {
              if (!imageChangesExist) return;
              handleOpen();
            }}
            className={`${classes.large} ${imageChangesExist ? 'rainbow' : ''}`}
            style={imageChangesExist ? { cursor: 'pointer' } : null}
            variant="rounded"
          >
            <AwesomeIcon icon="image" />
          </Avatar>
        </Badge>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Client Image Changes:</DialogTitle>
        <List>
          {imageChanges.map(({ text, done }, i) => (
            <ListItem
              key={i}
              button
              onClick={() => {
                const newImageChanges = imageChanges.map((item, index) => {
                  if (index === i) {
                    return { ...item, done: !done };
                  }
                  return item;
                });
                console.log(newImageChanges);

                setImageChanges(newImageChanges);
              }}
            >
              <ListItemIcon>
                <Checkbox
                  disableRipple
                  color="primary"
                  checked={done ? true : false}
                />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};
