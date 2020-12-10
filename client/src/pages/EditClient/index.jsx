import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery, useQueryCache } from 'react-query';
import { useParams } from 'react-router';
import { getClient, putClient } from 'services';

import { AccessCodes } from './AccessCodes';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '50px',
    height: '50px',
    marginRight: theme.spacing(1.5),
  },
  input: {
    marginBottom: theme.spacing(1),
  },
  // title: {
  //   marginBottom: theme.spacing(1),
  // },
}));

const EditClient = () => {
  const classes = useStyles();
  const { slug } = useParams();
  const { isLoading, data } = useQuery(['clients', { slug }], async () =>
    getClient({ slug })
  );
  const cache = useQueryCache();
  const client = useMemo(
    () =>
      !isLoading
        ? data
        : cache.getQueryData('clients')
        ? cache.getQueryData('clients').find((el) => el.slug === slug)
        : null,
    [isLoading, data]
  );

  if (!client) return null;
  return (
    <>
      <Helmet>
        <title>Edit Client</title>
      </Helmet>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item md={5}>
            <MainData classes={classes} {...client} />
          </Grid>
          <Grid item md={12}>
            <Box mb={2}>
              <Typography variant="h5">Access Codes</Typography>
            </Box>
            <AccessCodes {...client} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const MainData = ({ name, facebookName = '', slug, profilePicture, classes }) => {
  const [state, setState] = useState({
    name,
    facebookName,
  });
  const cache = useQueryCache();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await putClient({ slug, data: state });
      cache.invalidateQueries(['clients', { slug }]);
    } catch (e) {}
  };

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid container alignItems="center">
            <Avatar className={classes.avatar} alt="" src={profilePicture} />
            <Typography variant="h5">{state.name}</Typography>
          </Grid>
          <Box mt={2} width="100%">
            <TextField
              className={classes.input}
              fullWidth
              label="Name"
              name="name"
              value={state.name}
              onChange={handleOnChange}
            />
            <TextField
              className={classes.input}
              fullWidth
              label="Facebook Name"
              name="facebookName"
              value={state.facebookName}
              onChange={handleOnChange}
            />
          </Box>
        </Grid>
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end' }}>
        <Button onClick={handleSubmit}>Save</Button>
      </CardActions>
    </Card>
  );
};

export default EditClient;
