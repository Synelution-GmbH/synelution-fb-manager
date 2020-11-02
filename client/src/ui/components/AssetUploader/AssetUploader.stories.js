import React from 'react';
import 'scss/index.min.css';
import { Container, Grid } from '@material-ui/core';
import { AssetUploader, AssetUploaderList } from '.';
import { AssetUploaderProvider } from './AssetUploaderContext';
export default {
  title: 'Components/AssetUploader',
  component: AssetUploader,
};

const Template = (args) => (
  <AssetUploaderProvider>
    <Container maxWidth="sm">
      <Grid item md={9}>
        <AssetUploader {...args} />
        <AssetUploaderList />
      </Grid>
    </Container>
  </AssetUploaderProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
