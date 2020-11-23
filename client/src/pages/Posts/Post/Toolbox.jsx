import React from 'react';
import { Button, Tooltip, makeStyles } from '@material-ui/core';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { EditAssetContent } from 'ui/components/AssetUploader/EditAssetContent';
import { useAssetUploaderDispatch } from 'ui/components/AssetUploader/AssetUploaderContext';
const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.error.main,

    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));
export const DownloadButton = ({ path, download, ...props }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    // window.location.assign(path);
  };

  return (
    <Tooltip {...props} title="Download" placement="top">
      <Button
        href={path}
        download={download}
        {...props}
        variant="contained"
        color="primary"
        onClick={handleClick}
        size="medium"
        style={{ padding: '10px', fontSize: 'inherit', minWidth: 'auto' }}
      >
        <AwesomeIcon icon="download" />
      </Button>
    </Tooltip>
  );
};

export const EditButton = ({ handleEdit, ...props }) => {
  return (
    <EditAssetContent
      handleEdit={handleEdit}
      buttonComponent={(btnProps) => (
        <Tooltip {...props} title="Edit content" placement="top">
          <Button
            {...props}
            {...btnProps}
            variant="contained"
            color="primary"
            size="medium"
            style={{ padding: '10px', fontSize: 'inherit', minWidth: 'auto' }}
          ></Button>
        </Tooltip>
      )}
      {...props}
    />
  );
};

export const DeleteAssetButton = ({ handleDelete, name, ...props }) => {
  const { dispatch } = useAssetUploaderDispatch();
  const classes = useStyles();
  return (
    <Tooltip {...props} title="Delete" placement="top">
      <Button
        {...props}
        onClick={() => {
          dispatch({ type: 'delete_asset', payload: { name } });
          handleDelete(props._id);
        }}
        variant="contained"
        color="primary"
        size="medium"
        className={classes.button}
        style={{ padding: '10px', fontSize: 'inherit', minWidth: 'auto' }}
      >
        <AwesomeIcon icon="trash-alt" />
      </Button>
    </Tooltip>
  );
};
