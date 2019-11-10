import React from "react";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import cyan from '@material-ui/core/colors/cyan';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500]
    },
    secondary: {
      main: cyan[500]
    },
    type: "dark"
  }
});

function ThemeWrapper({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeWrapper;