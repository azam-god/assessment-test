import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogPage from './BlogPage';
import './styles.css';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<BlogPage />} />
          <Route path="/:id" element={<BlogPage />} />
          <Route path="/:id/:slug" element={<BlogPage />} />
        </Routes>
      </Router>
    </div>
  );
}
