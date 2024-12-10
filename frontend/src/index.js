// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import './input.css'; // Use input.css for Tailwind
import App from './App';
import 'typeface-jost';


// Create a root.
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
