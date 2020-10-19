import {
  Avatar,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { Asset } from './Asset';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 'max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px',
    margin: '0 8px 16px',
    fontFamily: 'Helvetica',
    boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
    fontSize: '16px',
    '-webkitFontSmoothing': 'antialiased',
    maxWidth: '500px',
  },
  cardContent: {
    padding: '12px 16px 12px',
  },
  title: {
    fontWeight: 600,
    fontSize: '.9375em',
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    lineHeight: 1.3333,
  },
  date: {
    lineHeight: 1.2308,
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    fontSize: '.8125em',
    color: '#65676b',
  },
  text: {
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    fontSize: '.9375em',
    lineHeight: 1.34,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontWeight: 400,
    color: '#050505',
    unicodeBidi: '-webkit-isolate',

    '& .editor': {
      margin: '-28px -4px -8px',
      boxShadow: 'none',
    },
  },
  asset: {
    width: '100%',
  },
}));

export const FacebookView = ({
  client,
  editorComponent,
  dateFormatted,
  asset,
  children,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Grid container wrap="nowrap">
          <Avatar src={client.profilePicture} alt="" />
          <div style={{ flexGrow: 1, paddingLeft: '6px', marginBottom: '8px' }}>
            <Typography className={classes.title} variant="h6">
              {client.facebookName}
            </Typography>
            <Typography className={classes.date} variant="caption">
              {dateFormatted} · <AwesomeIcon icon="globe-americas" />
            </Typography>
          </div>
        </Grid>
      </CardContent>
      <div variant="div" className={classes.text}>
        {editorComponent}
      </div>
      <Asset className={classes.asset} asset={asset} />
      {children}
    </Card>
  );
};