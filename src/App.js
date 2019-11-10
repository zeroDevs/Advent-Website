import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import FourZeroFour from "./pages/FourZeroFour";

import Nav from "./components/navigation/navigation.component";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100vh",
    width: "100vw"
  }
}));

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.root}>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/about" component={About} />
            <Route exact path="/solutions" component={Solutions} />
            <Route path="*" component={FourZeroFour} />
          </Switch>
        </Router>
      </main>
    </React.Fragment>
  );
}

export default App;
