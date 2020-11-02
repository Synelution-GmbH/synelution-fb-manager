import React, { useRef, useMemo, useState, useEffect } from 'react';
import { createEditor, Node } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { Editor } from '../Editor';
import { IE } from 'utils';
import { logDOM } from '@testing-library/react';
import { TextareaAutosize } from '@material-ui/core';

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
  return string.split('\n').map((line) => `<p>${line}</p>`);
};

export const EditorIE = ({
  id,
  content = null,
  editorRef,
  children,
  onSave = () => {},
  editorProps = {},
  disabled = false,
  saveDelay = 1000,
}) => {
  const [value, setValue] = useState(content);
  const saveTimeout = useRef();

  return (
    <TextareaAutosize
      className="ie-editor editor"
      {...editorProps}
      ref={(tag) => (editorRef.current = tag)}
      value={value}
      disabled={disabled}
      onChange={(e) => {
        const { value } = e.target;
        clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(() => {
          console.log('save');
          console.log(value);
          onSave({ serializedValue: value });
        }, saveDelay);
        setValue(value);
      }}
    ></TextareaAutosize>
  );
};
