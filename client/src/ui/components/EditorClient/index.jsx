import React, { useRef, useMemo, useState, useEffect } from 'react';
import randomColor from 'randomcolor';
import { createEditor, Node } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

import { withIOCollaboration, useCursor } from '@slate-collaborative/client';

import { Editor } from '../Editor';
import { useSocket } from 'services/socket-provider';

const defaultValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
];

const serialize = (nodes) => {
  return nodes.map((n) => Node.string(n)).join('\n');
};

const deserialize = (string) => {
  // Return a value array of children derived by splitting the string.
  return string.split('\n').map((line) => {
    return {
      children: [{ text: line }],
    };
  });
};

export const EditorClient = ({
  id,
  content = null,
  name,
  slug,
  removeUser,
  user,
}) => {
  const [value, setValue] = useState(content ? deserialize(content) : defaultValue);
  const saveTimeout = useRef();
  const socket = useSocket();

  // const [isOnline, setOnlineState] = useState(false);
  // const color = useMemo(
  //   () => randomColor({ luminosity: 'dark', format: 'rgba', alpha: 1 }),
  //   []
  // );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  useEffect(() => {
    if (!content) return setValue(defaultValue);
    console.log(editor.selection);
    setValue(deserialize(content));
  }, [content]);
  // const editor = useMemo(() => {
  //   const slateEditor = withReact(withHistory(createEditor()));

  //   const origin =
  //     process.env.NODE_ENV === 'production'
  //       ? window.location.origin
  //       : 'http://localhost:5000';
  //   const options = {
  //     docId: '/' + id,
  //     cursorData: {
  //       name: user.username,
  //       color,
  //       alphaColor: color.slice(0, -2) + '0.2)',
  //     },
  //     url: `${origin}/${id}`,
  //     connectOpts: {
  //       query: {
  //         name: user.username,
  //         token: user._id,
  //         slug: id,
  //       },
  //     },
  //     preserveExternalHistory: true,
  //     onConnect: () => {
  //       setOnlineState(true);
  //     },
  //     onError: (e) => console.log(e),
  //     onDisconnect: () => setOnlineState(false),
  //   };

  //   return withIOCollaboration(slateEditor, options);
  // }, []);

  // useEffect(() => {
  //   editor.connect();
  //   console.log(editor);

  //   return editor.destroy;
  // }, []);

  // const { decorate } = useCursor(editor);
  const serialized = serialize(value);
  return (
    <Editor
      editor={editor}
      value={value}
      serializedValue={serialized}
      // decorate={decorate}
      onChange={(value) => {
        clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(() => {
          socket.emit('update post', { id, content: serialize(value) });
        }, 500);
        setValue(value);
      }}
    />
  );
};
