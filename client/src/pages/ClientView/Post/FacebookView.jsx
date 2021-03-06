import {
  Avatar,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useAuth } from 'services';
import { useAssetUploader } from 'ui/components/AssetUploader/AssetUploaderContext';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { AssetPicker } from './AssetPicker';

const useStyles = makeStyles((theme) => ({
  card: ({ isJob }) => ({
    borderRadius: 'max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px',
    margin: '0 8px 16px',
    fontFamily: 'Helvetica',
    boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
    fontSize: '16px',
    '-webkitFontSmoothing': 'antialiased',
    maxWidth: '500px',
    position: 'relative',
  }),
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
    // lineHeight: 1.2308,
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
  assets,
  children,
  assetOrder,
  ...props
}) => {
  const { user } = useAuth();
  const isJob = props.salary && props.employmentType;
  const classes = useStyles({ isJob });
  console.log(isJob);

  return (
    <div>
      {isJob ? (
        <Card className={classes.card}>
          <AssetPicker
            className={classes.asset}
            assetOrder={assetOrder}
            assets={assets}
          />
          <CardContent className={classes.cardContent}>
            <CardHeader
              {...props}
              user={user}
              client={client}
              classes={classes}
              dateFormatted={dateFormatted}
            />
          </CardContent>
          <div
            style={{
              padding: '10px 16px 10px',
              margin: '0 -0 30px',
            }}
          >
            <Typography variant="h6" style={{ marginBottom: '10px' }}>
              Job Details
            </Typography>
            <Grid container className={classes.text}>
              <AwesomeIcon
                icon="briefcase"
                style={{ color: '#b9b9b9', fontSize: '20px', marginRight: '8px' }}
              />{' '}
              <span>{props.employmentType}</span>
              {' · '}
              <span style={{ color: '#31a24c' }}>{props.salary}</span>
            </Grid>
          </div>
          <div variant="div" className={classes.text}>
            {editorComponent}
          </div>
          {children}
        </Card>
      ) : (
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <CardHeader
              {...props}
              user={user}
              client={client}
              classes={classes}
              dateFormatted={dateFormatted}
            />
          </CardContent>
          <div variant="div" className={classes.text}>
            {editorComponent}
          </div>
          <AssetPicker
            className={classes.asset}
            assetOrder={assetOrder}
            assets={assets}
          />

          {children}
        </Card>
      )}
    </div>
  );
};

const CardHeader = ({ classes, client, dateFormatted, user, ...props }) => {
  return (
    <Grid container wrap="nowrap">
      <Avatar src={client.profilePicture} alt="" />
      <div style={{ flexGrow: 1, paddingLeft: '6px', marginBottom: '8px' }}>
        <Typography className={classes.title} variant="h6">
          {client.facebookName}
        </Typography>
        <Grid container justify="space-between" align-items="center">
          <Typography className={classes.date} variant="caption">
            {dateFormatted} · <AwesomeIcon icon="globe-americas" />
          </Typography>
          {user.role !== 'guest' ? (
            <div>
              <Typography className={classes.date} variant="caption">
                {' '}
                <AwesomeIcon prefix="fab" icon="facebook-square" />{' '}
                {props.budget || 0} €
              </Typography>
              <Typography className={classes.date} variant="caption">
                {' '}
                <AwesomeIcon prefix="fab" icon="instagram" /> {props.budgetIG || 0}{' '}
                €
              </Typography>
            </div>
          ) : null}
        </Grid>
      </div>
    </Grid>
  );
};
