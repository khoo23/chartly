import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ChartBuilder from './pages/ChartBuilder';
import UserProfile from './pages/UserProfile';
import UserGuides from './pages/UserGuides';
import ChartTemplatesPage from './pages/ChartTemplatesPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
    return (
        <div className="app-container">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/chart-builder" element={<ChartBuilder />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/guides" element={<UserGuides />} />
                <Route path="/templates" element={<ChartTemplatesPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
