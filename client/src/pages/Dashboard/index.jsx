import {
  Container,
  Fab,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Toolbar,
} from '@material-ui/core';
import React from 'react';
import { Editor } from 'ui/components/Editor';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { CreateCustomer } from './CreateCustomer';

const Dashboard = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <Toolbar>
          <Grid container justify="space-between">
            <FormControl>
              <InputLabel htmlFor="search">search</InputLabel>
              <Input
                type="text"
                id="search"
                // endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                endAdornment={
                  <InputAdornment position="end">
                    <AwesomeIcon icon="search" />
                  </InputAdornment>
                }
              />
            </FormControl>
            <CreateCustomer />
          </Grid>
        </Toolbar>
      </Container>
      {/* <Editor /> */}
    </div>
  );
};

export default Dashboard;
