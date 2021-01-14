import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { useAuth } from 'services';

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
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  button: ({ published }) => ({
    backgroundColor: published
      ? theme.palette.success.main
      : theme.palette.grey[300],
    '&:hover': {
      backgroundColor: published
        ? theme.palette.success.dark
        : theme.palette.grey[300],
    },
  }),
}));

export const ClientToolbox = React.memo(
  ({
    hidden,
    approved,
    clientCorrected,
    imageChanges: ic,
    updatePost,
    published = false,
  }) => {
    const classes = useStyles({ approved, published });
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
            className={(approved ? ' classes.primary ' : '') + classes.large}
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
              className={`${classes.large} ${
                imageChangesExist && unfinishedImageChanges.length > 0
                  ? 'rainbow'
                  : ''
              }`}
              style={imageChangesExist ? { cursor: 'pointer' } : null}
              variant="rounded"
            >
              <AwesomeIcon icon="image" />
            </Avatar>
          </Badge>
        </Tooltip>
        <Tooltip title={'hide post'}>
          <Avatar
            onClick={() => {
              updatePost({ hidden: !hidden });
            }}
            className={(hidden ? ` ${classes.primary} ` : '') + classes.large}
            variant="rounded"
            style={{ cursor: 'pointer' }}
          >
            <AwesomeIcon icon="eye-slash" />
          </Avatar>
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
                  setImageChanges(newImageChanges);
                  updatePost({ imageChanges: newImageChanges });
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
        <PublishButton
          style={{ marginLeft: '30px' }}
          className={classes.button}
          onClick={() => {
            updatePost({ published: !published });
          }}
          published={published}
        />
      </>
    );
  }
);

const PublishButton = ({ published, onClick, ...props }) => {
  const { user } = useAuth();
  return (
    <Button
      {...props}
      onClick={user.role === 'proofreader' ? onClick : () => {}}
      startIcon={<AwesomeIcon icon={published ? 'check-circle' : 'times-circle'} />}
      variant="contained"
    >
      Veröffentlicht
    </Button>
  );
};
