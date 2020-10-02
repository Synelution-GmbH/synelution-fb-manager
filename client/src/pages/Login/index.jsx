import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from 'services/auth-provider';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormGroup,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  title: {
    // margin: theme.spacing(1),
  },
  grid: {
    height: '100vh',
  },
  card: {
    minWidth: '350px',
  },
}));

const Login = () => {
  const [form, setForm] = useState({ username: '', pwd: '' });
  const authentication = useAuth();

  const classes = useStyles();

  const handleChange = (e) => {
    const { target } = e;
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;

    setForm({ ...form, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authentication.login({
        username: form.username,
        password: form.pwd,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <html lang="en" />
        <title>Login</title>
        <meta charset="utf-8" />
        <meta name="description" content="Login here" />
      </Helmet>
      <Container style={{ height: '100vh' }}>
        <Grid
          className={classes.grid}
          container
          justify="center"
          alignItems="center"
        >
          <Card className={classes.card}>
            <CardContent>
              <Box m={1}>
                <Typography className={classes.title} variant="h4">
                  Login
                </Typography>
              </Box>
              <form className={classes.root} onSubmit={(e) => handleLogin(e)}>
                <FormGroup>
                  <TextField
                    type="text"
                    name="username"
                    label="Username"
                    value={form.username}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    label="Password"
                    type="password"
                    name="pwd"
                    value={form.pwd}
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                </FormGroup>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="btn"
                  size="large"
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Login;
