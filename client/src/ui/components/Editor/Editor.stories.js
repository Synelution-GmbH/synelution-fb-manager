import { Container } from '@material-ui/core';
import React from 'react';
import { EditorClient } from '../EditorClient';
import { Editor } from './';

export default {
  title: 'Components/Editor',
  component: Editor,
};

const Template = (args) => (
  <Container maxWidth="md">
    <EditorClient id={'test-123'} user={{ username: 'admin', id: '12345678' }} />
  </Container>
);

export const Primary = Template.bind({});
Primary.args = {};
