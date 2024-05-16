// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // No need to specify the .jsx extension
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
