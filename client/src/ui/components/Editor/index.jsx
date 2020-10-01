import {
  Avatar,
  Box,
  Card,
  Grid,
  makeStyles,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createEditor, Transforms, Text } from 'slate';
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
      },
    },
    toolbar: {
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      zIndex: 20,
      backgroundColor: theme.palette.grey[100],
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

  const decorate = useCallback(([node, path]) => {
    const ranges = [
      // {
      //   anchor: { path: [0, 0], offset: 0 },
      //   focus: { path: [0, 0], offset: 80 },
      //   highlight: true,
      // },
    ];

    // if (Text.isText(node)) {
    //   const { text } = node;
    //   console.log(text);
    //   ranges.push({
    //     anchor: { path, offset: 0 },
    //     focus: { path, offset: 30 },
    //     highlight: true,
    //   });
    // let offset = 0;
    // parts.forEach((part, i) => {
    //   if (i !== 0) {
    //     ranges.push({
    //       anchor: { path, offset: offset - search.length },
    //       focus: { path, offset },
    //       highlight: true,
    //     });
    //   }
    //   offset = offset + part.length + search.length;
    // });
    // }
    console.log(ranges);

    return ranges;
  }, []);

  const serialized = serialize(value);
  console.log(serialized);
  return (
    <Card className={classes.root}>
      <Slate editor={editor} value={value} onChange={handleChange}>
        <EDITABLE
          spellCheck={true}
          className="editor"
          placeholder="Beginn typing !!"
          onBlur={() => (selection.current = editor.selection)}
          decorate={decorate}
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
