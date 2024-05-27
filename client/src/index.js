import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextApi } from './components/Context/ContextApi';
import { Testdetails } from './components/Context/TestContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextApi>
  {/* <React.StrictMode> */}
  <Testdetails>
    <App />
    </Testdetails>
  {/* </React.StrictMode> */}
  </ContextApi>
);