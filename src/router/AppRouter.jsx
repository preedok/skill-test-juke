import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../components/HomePage';
import PostPage from '../components/PostPage';

const AppRouter = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/posts/:id" element={<PostPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default AppRouter;
