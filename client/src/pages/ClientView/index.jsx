import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Loader } from 'ui/components/Loader';
import { getLinkById } from 'services/client-link-api';
import { Container, Grid } from '@material-ui/core';
import { FacebookPost } from './FacebookPost';

const ClientView = () => {
  const { id } = useParams();
  const QUERY = useMemo(() => ['client-link', { id }], [id]);
  const { isLoading, error, data } = useQuery(QUERY, () => getLinkById(id));

  return (
    <>
      <Loader loading={isLoading} />
      {!data ? null : (
        <PostList QUERY={QUERY} client={data.client} posts={data.posts} />
      )}
    </>
  );
};

const PostList = ({ posts, client, QUERY }) => {
  return (
    <Container maxWidth="lg">
      <Grid container justify="center">
        {posts.map(({ _id, ...postProps }) => (
          <React.Fragment key={_id}>
            <FacebookPost
              {...postProps}
              QUERY={QUERY}
              id={_id}
              client={client}
            ></FacebookPost>
            <br />
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
};

export default ClientView;
