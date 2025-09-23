import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; // <-- Import
import App from './App.jsx';
import './index.css';
import '@tensorflow/tfjs-backend-webgl';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* <-- Wrap App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
// hlw
//hii