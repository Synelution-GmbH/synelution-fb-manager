import React, { useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useRouteMatch } from 'react-router';

const st = {
  spacing: 10,
  fontFamily: [
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  palette: {
    // type: 'dark',
    fb: 'linear-gradient(to right,#3578e5 0%,#2362c8 100%)',
    ig: 'linear-gradient(-112deg,#5c0abf 0,#b0377b 100%)',
  },
};
const theme = createMuiTheme({
  ...st,
  palette: {
    ...st.palette,
    primary: {
      main: '#2362c8',
    },
    secondary: {
      main: '#ffe400',
    },
  },
});
const themeIG = createMuiTheme({
  ...st,
  palette: {
    ...st.palette,
    primary: {
      main: '#b0377b',
    },
    secondary: {
      main: '#ffe400',
    },
  },
});

if(process.env.NODE_ENV === 'development')
  console.log(theme);

export const Theme = ({ children }) => {
  let dateParams = useRouteMatch('/:client/posts/:type');
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, []);
  return (
    <ThemeProvider
      theme={dateParams && dateParams.params.type === 'ig' ? themeIG : theme}
    >
      {children}
    </ThemeProvider>
  );
};
