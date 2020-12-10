import { Box, Grid, makeStyles } from '@material-ui/core';
import React from 'react';

import { useAssetUploader } from './AssetUploaderContext';
import { AssetPreview } from './AssetPreview';
import { Droppable } from 'react-beautiful-dnd';
export * from './AssetUploaderContext';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '100%',
    overflow: 'auto',
    position: 'relative',

    scrollbarWidth: 'thin',
    scrollbarColor: theme.palette.primary.main,

    '&::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#fff',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '6px',
    },
  },
}));

export const AssetUploaderList = ({ handleDelete, handleEdit }) => {
  const { assets, assetOrder, previewIndex } = useAssetUploader();
  const classes = useStyles();
  return (
    <Box clone pt={1}>
      <Droppable
        droppableId={'sheet-dont-matter'}
        direction="horizontal"
        type="column"
      >
        {(provided) => (
          <Grid
            ref={provided.innerRef}
            {...provided.droppableProps}
            container
            spacing={1}
            wrap="nowrap"
            className={classes.container}
          >
            {assetOrder.map((assetId, i) => {
              const asset = assets[assetId];
              return (
                <AssetPreview
                  handleEdit={handleEdit}
                  active={previewIndex === assetId}
                  index={i}
                  key={asset.name}
                  {...asset}
                  handleDelete={handleDelete}
                />
              );
            })}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </Box>
  );
};
