import React, { useEffect, useMemo } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import { AssetUploader, AssetUploaderList } from 'ui/components/AssetUploader';

import { CopyToClipboard } from 'ui/components/Editor/CopyToClipboard';
import { useAssetUploader } from 'ui/components/AssetUploader/AssetUploaderContext';
import { putPost, deleteAsset } from 'services';
import { useAssetUploaderDispatch } from 'ui/components/AssetUploader/AssetUploaderContext';
import { Autocomplete } from '@material-ui/lab';
import { DownloadButton, EditButton, DeleteAssetButton } from './Toolbox';

const useStyles = makeStyles((theme) => ({
  clipboardButton: {
    zIndex: 5,
    // position: 'absolute',
    // bottom: theme.spacing(1),
    // right: theme.spacing(1),
  },
  toolbox: {
    zIndex: -1,
    position: 'absolute',
    top: '0',
    left: '100%',
    padding: `${theme.spacing(2)}px 0`,
    width: 'auto',

    '& .MuiButtonBase-root': {
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
      width: '34px',
      marginBottom: '4px',
    },
  },
}));

export const Asset = ({
  assets: initialAssets,
  assetOrder: initialAssetOrder,
  id,
  updatePost,
}) => {
  const classes = useStyles();
  const { dispatch } = useAssetUploaderDispatch();
  const { previewIndex, assets } = useAssetUploader();

  useEffect(() => {
    dispatch({
      type: 'add_assets',
      payload: { assets: initialAssets, assetOrder: initialAssetOrder },
    });
  }, [initialAssets, initialAssetOrder]);

  const updateImage = async (files) => {
    const data = new FormData();
    files.forEach((file) => {
      data.append('files', file);
    });

    const post = await putPost({ id, data });

    updatePost({
      assets: post.assets,
      assetOrder: post.assets.map(({ name }) => name),
      NO_DB: true,
    });
  };

  const handleDelete = async (assetId) => {
    try {
      const post = await deleteAsset({ id, assetId });
      const { assetOrder, assets } = post;
      updatePost({ assetOrder, assets, NO_DB: true });
    } catch (e) {
      console.log(e);
    }
  };

  const asset = assets[previewIndex];
  return (
    <>
      <Grid item xs={12} md={4} style={{ zIndex: 2 }}>
        <AssetUploader setFile={updateImage}>
          {asset && asset.path ? (
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
              className={classes.toolbox}
            >
              <CopyToClipboard
                className={classes.clipboardButton}
                value={window.location.origin + asset.path}
                type="icon"
              />
              <DownloadButton path={asset.path} download={asset.name} />
              <EditButton
                className={classes.edit}
                name={asset.name}
                handleEdit={updatePost}
              />
              <DeleteAssetButton {...asset} handleDelete={handleDelete} />
            </Grid>
          ) : null}
        </AssetUploader>
      </Grid>
      <Grid container justify="flex-end" spacing={0}>
        <Grid item md={4} style={{ padding: '10px' }}>
          <AssetUploaderList handleDelete={handleDelete} handleEdit={updatePost} />
        </Grid>
      </Grid>
    </>
  );
};
