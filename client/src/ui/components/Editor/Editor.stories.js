import { Container } from '@material-ui/core';
import React from 'react';
import { Editor } from './';

export default {
  title: 'Components/Editor',
  component: Editor,
};

const Template = (args) => (
  <Container maxWidth="md">
    <Editor {...args} />
  </Container>
);

export const Primary = Template.bind({});
Primary.args = {};
