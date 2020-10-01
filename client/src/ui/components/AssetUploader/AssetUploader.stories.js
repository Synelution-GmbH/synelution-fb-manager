import React from 'react';
import 'scss/index.min.css';
import { Container, Grid } from '@material-ui/core';
import { AssetUploader } from '.';

export default {
  title: 'Components/AssetUploader',
  component: AssetUploader,
};

const Template = (args) => (
  <Container maxWidth="sm">
    <Grid item md={9}>
      <AssetUploader {...args} />
    </Grid>
  </Container>
);

export const Primary = Template.bind({});
Primary.args = {};
