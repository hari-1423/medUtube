import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App';
import './index.css'; // Import your CSS file

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
