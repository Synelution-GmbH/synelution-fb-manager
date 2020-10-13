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
      {!data ? null : <PostList posts={data.posts} />}
    </>
  );
};

const PostList = ({ posts }) => {
  return (
    <Container maxWidth="lg">
      <Grid container direction="column">
        {posts.map(({ _id, ...postProps }) => (
          <>
            <FacebookPost key={_id} {...postProps}></FacebookPost>
            <br />
          </>
        ))}
      </Grid>
    </Container>
  );
};

export default ClientView;
