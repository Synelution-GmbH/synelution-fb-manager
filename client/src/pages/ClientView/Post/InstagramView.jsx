import {
  Avatar,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useMemo } from 'react';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { Asset } from './Asset';

const fontFamily =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: '3px',
    margin: '0 8px 16px',
    fontFamily,
    boxShadow: 'none',
    border: '1px solid #dbdbdb',
    fontSize: '16px',
    '-webkitFontSmoothing': 'antialiased',
    maxWidth: '600px',
  },
  cardContent: {
    padding: '16px 16px 16px',
  },
  iconContainer: {
    padding: '8px 8px 8px',
  },
  icon: {
    fontSize: '24px',
    margin: '0 8px',
  },
  title: {
    fontWeight: 600,
    fontSize: '14px',
    fontFamily,
    lineHeight: '18px',
  },
  text: {
    fontFamily,
    fontSize: '14px',
    lineHeight: '18px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontWeight: 400,
    color: '#050505',
    unicodeBidi: '-webkit-isolate',
    '& .editor': {
      margin: '-20px -4px -6px',
      boxShadow: 'none',
    },
  },
  asset: {
    width: '100%',
  },
  profile: {
    width: '32px',
    height: '32px',
  },
}));

export const InstagramView = ({ client, editorComponent, asset, children }) => {
  const classes = useStyles();
  const likes = useMemo(() => Math.floor(Math.random() * 500) + 500, []);
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Grid container wrap="nowrap" alignItems="center">
          <Avatar className={classes.profile} src={client.profilePicture} alt="" />
          <div style={{ paddingLeft: '14px' }}>
            <Typography className={classes.title} variant="h6">
              {client.slug}
            </Typography>
          </div>
        </Grid>
      </CardContent>
      <Asset className={classes.asset} asset={asset} />
      <CardContent className={classes.iconContainer}>
        <Grid container>
          <AwesomeIcon className={classes.icon} prefix="ig" icon="like" />
          <AwesomeIcon className={classes.icon} prefix="ig" icon="comment" />
          <AwesomeIcon className={classes.icon} prefix="ig" icon="share" />
          <Grid container style={{ flexGrow: 1, width: 'auto' }} justify="flex-end">
            <AwesomeIcon className={classes.icon} prefix="ig" icon="save" />
          </Grid>
        </Grid>
        <span
          style={{
            fontSize: '14px',
            display: 'inline-block',
            fontWeight: 600,
            padding: '6px 8px 0',
          }}
        >
          {likes} likes
        </span>
      </CardContent>
      <div variant="div" className={classes.text}>
        {editorComponent}
      </div>
      <div style={{ borderBottom: '1px solid #efefef', marginBottom: '9px' }}></div>
      {children}
    </Card>
  );
};
