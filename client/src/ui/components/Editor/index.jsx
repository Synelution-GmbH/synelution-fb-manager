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
import React, { useRef } from 'react';
import { Editable, Slate } from 'slate-react';

import { EmojiePicker } from './EmojiPicker';
import { CopyToClipboard } from './CopyToClipboard';

const EDITABLE = styled(Editable)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const useStyles = makeStyles((theme) => {
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

export const Editor = ({
  onChange,
  decorate,
  children,
  serializedValue,
  value,
  editor,
}) => {
  // const socket = useSocket();
  // const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const classes = useStyles();
  const selection = useRef({
    focus: { offset: 0, path: [0, 0] },
    anchor: { offset: 0, path: [0, 0] },
  });

  // const renderLeaf = useCallback((props) => <Leaf {...props} />, [decorate]);

  // const handleChange = (newValue) => {
  //   const { operations, selection } = editor;
  //   console.log(operations);
  //   // console.log(editor.selection);
  //   if (!operations[0].server) onChange({ operations, selection });
  //   setValue(newValue);
  // };

  // useEffect(() => {
  //   socket.on('editor change', ({ id: sId, operations, selection }) => {
  //     if (id !== sId) return;

  //     operations.forEach((operation) => {
  //       console.log(operation);
  //       editor.apply({ ...operation, server: true });
  //     });
  //   });
  // }, []);

  return (
    <Card className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="stretch"
        style={{ height: '100%' }}
      >
        <Slate editor={editor} value={value} onChange={onChange}>
          <EDITABLE
            spellCheck={true}
            className="editor"
            placeholder="Beginn typing !!"
            onBlur={() => (selection.current = editor.selection)}
            // renderLeaf={renderLeaf}
            // decorate={decorate}
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
                {children}
                <CopyToClipboard value={serializedValue} />
                <Tooltip title="character count" placement="bottom">
                  <Avatar
                    variant="rounded"
                    color="primary"
                    style={{ marginLeft: '8px' }}
                  >
                    <Typography>{serializedValue.length}</Typography>
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

Editor.defaultProps = {
  // onChange: () => {},
  // decorate: () => {},
};

// const Leaf = ({ attributes, children, leaf }) => {
//   return (
//     <span
//       {...attributes}
//       style={{
//         position: 'relative',
//         backgroundColor: leaf.alphaColor,
//       }}
//     >
//       {leaf.isCaret ? <Caret {...leaf} /> : null}
//       {children}
//     </span>
//   );
// };
