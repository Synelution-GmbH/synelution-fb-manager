import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { DeleteButton } from 'pages/Posts/Post/DeleteButton';
import React, { useState } from 'react';
import { CopyToClipboard } from 'ui/components/Editor/CopyToClipboard';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { CreateCode } from './CreateCode';
import { deleteCode, putCode } from 'services/clients-api';
import { useQueryCache } from 'react-query';
import { CodeDialog } from './CodeDialog';

export const AccessCodes = ({ slug, codes }) => {
  const addCode = () => {};
  return (
    <>
      {codes && codes.length > 0 ? (
        <Paper>
          <List dense>
            {codes.map(({ code, ...data }, i) => (
              <React.Fragment key={code}>
                <CodeListItem {...data} code={code} slug={slug} />
                {i + 1 !== codes.length ? <Divider /> : null}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      ) : null}
      <CreateCode addCode={addCode} slug={slug} />
    </>
  );
};

const CodeListItem = ({ name, email, code, slug }) => {
  const cache = useQueryCache();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (state) => {
    if (!state.email || !state.name) return;
    setLoading(true);
    try {
      await putCode({ slug, code, data: state });
      cache.invalidateQueries(['clients', { slug }]);
      setLoading(false);
      setOpen(false);
      return false;
    } catch (e) {
      console.log(e);
      setLoading(false);
      return false;
    }
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <span>{code}</span>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={email}></ListItemText>
      <ListItemSecondaryAction>
        <CopyToClipboard value={code} variant="text" />
        <IconButton onClick={() => setOpen(true)}>
          <AwesomeIcon icon="pen" style={{ fontSize: '80%' }} />
        </IconButton>
        <CodeDialog
          initialState={{ email, name }}
          open={open}
          setOpen={setOpen}
          onSubmit={handleSubmit}
        />
        <DeleteButton
          onClick={async () => {
            await deleteCode({ slug, code });
            cache.invalidateQueries(['clients', { slug }]);
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
