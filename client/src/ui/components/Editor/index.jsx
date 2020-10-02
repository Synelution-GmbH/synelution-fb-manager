import {
  Avatar,
  Card,
  Grid,
  makeStyles,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { useMemo, useRef, useState } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { Node } from 'slate';

import { withHistory } from 'slate-history';

import { EmojiePicker } from './EmojiPicker';
import { CopyToClipboard } from './CopyToClipboard';

const serialize = (nodes) => {
  return nodes.map((n) => Node.string(n)).join('\n');
};

const EDITABLE = styled(Editable)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    root: {
      height: '100%',
      overflow: 'visible',
      '& .MuiAvatar-root': {
        cursor: 'pointer',
        // marginRight: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        transition: '0.3s',

        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },

      '::spelling-error': {
        color: 'red',
      },

      '& .editor': {
        minHeight: '100px',
        flexGrow: 1,
      },
    },
    toolbar: {
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      zIndex: 20,
      backgroundColor: theme.palette.grey[100],
      width: '100%',
    },
  };
});

export const Editor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const classes = useStyles();
  const selection = useRef({
    focus: { offset: 0, path: [0, 0] },
    anchor: { offset: 0, path: [0, 0] },
  });
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const serialized = serialize(value);
  return (
    <Card className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="stretch"
        style={{ height: '100%' }}
      >
        <Slate editor={editor} value={value} onChange={handleChange}>
          <EDITABLE
            spellCheck={true}
            className="editor"
            placeholder="Beginn typing !!"
            onBlur={() => (selection.current = editor.selection)}
            renderLeaf={(props) => <Leaf {...props} />}
          />
        </Slate>

        <Toolbar className={classes.toolbar} variant="dense" p={1}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item sm={6}>
              <Grid container justify="flex-start">
                <EmojiePicker
                  onSelect={(text) => {
                    if (!editor.selection) {
                      editor.selection = selection.current;
                    }
                    editor.insertText(text);
                  }}
                />
              </Grid>
            </Grid>
            <Grid item sm={6}>
              <Grid container justify="flex-end">
                <CopyToClipboard value={serialized} />
                <Tooltip title="character count" placement="bottom">
                  <Avatar
                    variant="rounded"
                    color="primary"
                    style={{ marginLeft: '8px' }}
                  >
                    <Typography>{serialized.length}</Typography>
                  </Avatar>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </Grid>
    </Card>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  return (
    <span
      {...attributes}
      style={{ fontWeight: leaf.highlight ? 'bold' : 'normal' }}
    >
      {children}
    </span>
  );
};
