import React, { useRef, useMemo, useState, useEffect } from 'react';
import { createEditor, Node } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
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
  children,
  checked,
  updateCache,
}) => {
  const [value, setValue] = useState(content ? deserialize(content) : defaultValue);
  const saveTimeout = useRef();
  const socket = useSocket();

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  useEffect(() => {
    if (!content) return setValue(defaultValue);
    setValue(deserialize(content));
    // eslint-disable-next-line
  }, [content]);

  const serialized = serialize(value);
  return (
    <Editor
      editor={editor}
      value={value}
      serializedValue={serialized}
      onChange={(value) => {
        clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(() => {
          const content = serialize(value);
          if (checked)
            socket.emit('update post', {
              id,
              content: serialize(value),
              checked: false,
            });
          else socket.emit('update post', { id, content });
          updateCache({ content });
        }, 1000);
        setValue(value);
      }}
    >
      {children}
    </Editor>
  );
};
