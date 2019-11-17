import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ThemeWrapper from "./theme";
import RootProvider from "./contexts/root.provider";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <RootProvider>
    <ThemeWrapper>
      <Router>
        <App />
      </Router>
    </ThemeWrapper>
  </RootProvider>,
  document.getElementById("root")
);
