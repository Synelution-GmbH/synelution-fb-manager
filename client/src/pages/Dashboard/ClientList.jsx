import React from 'react';

import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { DeleteButton } from 'pages/Posts/Post/DeleteButton';
import { deleteClient } from 'services/clients-api';
import { useQueryCache } from 'react-query';

function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}

const ClientCard = ({ name, profilePicture, slug }) => {
  const cache = useQueryCache();
  const history = useHistory();
  return (
    <>
      <ListItemLink to={`${slug}/posts/fb`}>
        <ListItemAvatar>
          <Avatar alt={name} src={profilePicture}></Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => history.push(`/client/${slug}`)}
            color="primary"
            aria-label="edit"
          >
            <AwesomeIcon icon="pen" style={{ fontSize: '88%' }} />
          </IconButton>
          <DeleteButton
            onClick={async () => {
              try {
                await deleteClient({ slug });
                cache.invalidateQueries('clients');
              } catch (e) {
                console.log(e);
                cache.invalidateQueries('clients');
              }
            }}
            color="primary"
            edge="end"
            aria-label="delete"
            text="This will also delete all data associated with this client. (Posts, Images, Videos, Links)"
          >
            <AwesomeIcon icon="trash-alt" style={{ fontSize: '80%' }} />
          </DeleteButton>
        </ListItemSecondaryAction>
      </ListItemLink>
    </>
  );
};

export const ClientList = ({ clients }) => {
  return (
    <List>
      {clients.map((client, i) => (
        <React.Fragment key={client.slug}>
          <ClientCard {...client} />
          {clients.length - 1 === i ? null : <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export const ClientListSkeleton = () => {
  return <div></div>;
};
