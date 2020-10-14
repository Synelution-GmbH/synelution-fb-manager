import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Loader } from 'ui/components/Loader';
import { getLinkById } from 'services/client-link-api';
import { Container, Grid } from '@material-ui/core';
import { FacebookPost } from './FacebookPost';

const ClientView = () => {
  const { id } = useParams();
  console.log(id);
  const { isLoading, error, data } = useQuery(['client-link', { id }], () =>
    getLinkById(id)
  );

  console.log(data);
  return (
    <>
      <Loader loading={isLoading} />
      {!data ? null : <PostList client={data.client} posts={data.posts} />}
    </>
  );
};

const PostList = ({ posts, client }) => {
  return (
    <Container maxWidth="sm">
      <Grid container direction="column" justify="center">
        {posts.map(({ _id, ...postProps }) => (
          <React.Fragment key={_id}>
            <FacebookPost {...postProps} id={_id} client={client}></FacebookPost>
            <br />
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
};

export default ClientView;
