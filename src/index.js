import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ThemeWrapper from "./theme";

ReactDOM.render(
  <ThemeWrapper>
    <App />
  </ThemeWrapper>, 
  document.getElementById('root')
);
