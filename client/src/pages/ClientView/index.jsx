import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Loader } from 'ui/components/Loader';
import { getLinkById } from 'services/client-link-api';
import { Container, Grid, Typography } from '@material-ui/core';
import { Post } from './Post';

const ClientView = () => {
  const { id } = useParams();
  const QUERY = useMemo(() => ['client-link', { id }], [id]);
  const { isLoading, data } = useQuery(QUERY, () => getLinkById(id));

  return (
    <>
      <Loader loading={isLoading} />
      <Container style={{ padding: '1rem', marginBottom: '1rem' }}>
        <Grid container alignItems="center" justify="center">
          <img
            src="/assets/logo.svg"
            style={{ maxWidth: '300px', marginRight: '1rem' }}
          />
          {/* <Typography variant="h4">Post Vorschau</Typography> */}
        </Grid>
      </Container>
      {!data ? null : (
        <PostList QUERY={QUERY} client={data.client} posts={data.posts} />
      )}
    </>
  );
};

const PostList = ({ posts, client, QUERY }) => {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        alignContent="flex-start"
      >
        {posts.map(({ _id, ...postProps }) => (
          <React.Fragment key={_id}>
            <Post {...postProps} QUERY={QUERY} id={_id} client={client}></Post>
            <br />
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
};

export default ClientView;
