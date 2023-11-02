import React from 'react';
import './assets/App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
