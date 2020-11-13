import React, { useMemo } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Asset } from './Asset';
import { mapToObject } from 'utils';

const useStyles = makeStyles((theme) => ({
  gallery: {
    position: 'relative',
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    '& .MuiGrid-item': {
      cursor: 'pointer',
      position: 'relative',
      paddingRight: '3px',
      '&:first-child': {
        marginBottom: '3px',
      },
      '& .content-sizer': {
        position: 'relative',
        width: '100%',
        paddingTop: '50%',
      },
      '&:last-child': {
        paddingRight: 0,
      },
    },
  },
}));

export const Gallery = ({ assets, assetOrder, ...props }) => {
  const classes = useStyles();
  console.log(assets);

  const assetsM = useMemo(() => mapToObject(assets, (asset) => asset, 'name'), [
    assets,
  ]);
  console.log(assetsM);
  return (
    <>
      <Grid container className={classes.gallery}>
        {assetOrder.map((asset, i) => {
          const smallImg = i > 0 && assets.length >= 3;
          const smallerImg = assets.length >= 4;
          return (
            <Grid
              key={asset}
              item
              xs={12}
              md={smallImg ? (smallerImg ? 4 : 6) : 12}
            >
              <div
                className="content-sizer"
                style={{ paddingTop: smallImg ? '100%' : '50%' }}
              >
                <Asset asset={assetsM[asset]} {...props} />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
