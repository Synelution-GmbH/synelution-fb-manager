import React, { useRef, useMemo, useState, useEffect } from 'react';
import { createEditor, Node } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { Editor } from '../Editor';

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
  editorRef,
  children,
  onSave = () => {},
  editorProps = {},
  disabled = false,
  saveDelay = 1000,
}) => {
  const [value, setValue] = useState(content ? deserialize(content) : defaultValue);
  const saveTimeout = useRef();

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  useEffect(() => {
    if (!editorRef) return;
    editorRef.current = editor;
  }, []);

  useEffect(() => {
    if (!content) return setValue(defaultValue);
    setValue(deserialize(content));
    // eslint-disable-next-line
  }, [content]);

  const serialized = serialize(value);
  return (
    <Editor
      {...editorProps}
      editor={editor}
      value={value}
      disabled={disabled}
      serializedValue={serialized}
      onChange={(value) => {
        clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(() => {
          console.log('save');
          onSave({ value, serializedValue: serialize(value) });
        }, saveDelay);
        setValue(value);
      }}
    >
      {children}
    </Editor>
  );
};
