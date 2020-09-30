import {
  Avatar,
  Button,
  Card,
  makeStyles,
  styled,
  Toolbar,
} from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { Node } from 'slate';

import { withHistory } from 'slate-history';

import { askClipboardPermissions } from './helper';
import { AwesomeIcon } from '../Icons/Icon';

const serialize = (nodes) => {
  return nodes.map((n) => Node.string(n)).join('\n');
};

const EDITABLE = styled(Editable)(({ theme }) => {
  console.log(theme);
  return {
    padding: theme.spacing(2),
  };
});

const useStyles = makeStyles(({ theme }) => ({
  root: {
    '& .MuiAvatar-root': {
      cursor: 'pointer',
    },
  },
}));

export const Editor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const classes = useStyles();

  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);
  const handleChange = (newValue) => setValue(newValue);

  const saveToClipboard = () => {
    askClipboardPermissions();
    navigator.clipboard.writeText(serialize(value));
  };

  return (
    <Card className={classes.root}>
      <Slate editor={editor} value={value} onChange={handleChange}>
        <Toolbar variant="dense" p={1}>
          <Avatar variant="rounded">
            <AwesomeIcon icon="smile" />
          </Avatar>
        </Toolbar>
        <EDITABLE className="editor" />
      </Slate>
      <Button onClick={saveToClipboard}>Copy</Button>
    </Card>
  );
};
