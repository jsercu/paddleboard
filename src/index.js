import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const Root = () => <App />;

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('app-root'),
);
