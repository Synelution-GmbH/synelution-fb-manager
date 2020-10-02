import React from 'react';

import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}

const ClientCard = ({ name, profilePicture, slug, length }) => {
  return (
    <>
      <ListItemLink to={`${slug}/posts/fb`}>
        <ListItemAvatar>
          <Avatar alt={name} src={profilePicture}></Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} />
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
