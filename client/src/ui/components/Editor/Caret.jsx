import React from 'react';

export const Caret = ({ color, isForward, name }) => {
  const cursorStyles = {
    ...cursorStyleBase,
    background: color,
    left: isForward ? '100%' : '0%',
  };
  const caretStyles = {
    ...caretStyleBase,
    background: color,
    left: isForward ? '100%' : '0%',
  };

  caretStyles[isForward ? 'bottom' : 'top'] = 0;

  return (
    <>
      <span contentEditable={false} style={caretStyles}>
        <span style={{ position: 'relative' }}>
          <span contentEditable={false} style={cursorStyles}>
            {name}
          </span>
        </span>
      </span>
    </>
  );
};
const cursorStyleBase = {
  position: 'absolute',
  top: -2,
  pointerEvents: 'none',
  userSelect: 'none',
  transform: 'translateY(-100%)',
  fontSize: 10,
  color: 'white',
  background: 'palevioletred',
  whiteSpace: 'nowrap',
};

const caretStyleBase = {
  position: 'absolute',
  pointerEvents: 'none',
  userSelect: 'none',
  height: '1.2em',
  width: 2,
  background: 'palevioletred',
};
