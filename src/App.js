import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100vh",
    width: "100vw"
  }
}))

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.root}>
        <div>Advent of Code</div>
      </main>
    </React.Fragment>
  );
}

export default App;
