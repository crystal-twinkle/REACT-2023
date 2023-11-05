import React from 'react';
import './assets/App.css';
import './assets/index.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import PostDetail from './pages/PostDetail';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<Main />}>
          <Route path="/posts/:name?" element={<PostDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
