import React from 'react';
import './assets/index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
// import { HashRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
