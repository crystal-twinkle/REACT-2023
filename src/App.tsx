import React from 'react';
import './assets/App.css';
import './assets/index.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import PostDetail from './pages/PostDetail';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posts" element={<Main />}>
          <Route path="/posts/:name" element={<PostDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
