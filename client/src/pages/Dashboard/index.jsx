import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Toolbar,
} from '@material-ui/core';
import React, { useState } from 'react';
import { CreateClient } from './CreateClient';
import { ClientList } from './ClientList';
import { postClient, getClients } from 'services';
import { useQuery, useMutation, useQueryCache } from 'react-query';
import { SearchBar } from './SearchBar';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
  },
}));

const Dashboard = () => {
  const [filtered, setFiltered] = useState(null);
  const cache = useQueryCache();
  const classes = useStyles();
  const { isLoading, data } = useQuery('clients', getClients);
  const [addClient] = useMutation(postClient, {
    onSuccess: (data) => {
      // const clients = cache.getQueryData('clients');
      // cache.setQueryData('clients', (old) => [...old, data]);
      cache.invalidateQueries('clients');
    },
  });

  if (isLoading) return null;

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Toolbar>
            <Grid container justify="space-between">
              <SearchBar
                list={data}
                setFilteredList={setFiltered}
                searchProperty="name"
              />
              <CreateClient addClient={addClient} />
            </Grid>
          </Toolbar>
        </Container>
        <Container maxWidth="lg">
          <Box clone mt={2}>
            <Paper>
              {data.length > 0 ? (
                <ClientList clients={filtered ? filtered : data} />
              ) : (
                <div></div>
              )}
            </Paper>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
