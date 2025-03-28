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

// Quick Start Pages
import GettingStarted from './pages/quickstart/GettingStarted';
import ChartBasics from './pages/quickstart/ChartBasics';
import DataImport from './pages/quickstart/DataImport';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                {/* Main Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/guides" element={<UserGuides />} />
                <Route path="/templates" element={<ChartTemplatesPage />} />
                
                {/* Chart Builder */}
                <Route path="/chart-builder/:chartType" element={<ChartBuilder />} />

                {/* Quick Start Guide Pages */}
                <Route path="/guides/getting-started" element={<GettingStarted />} />
                <Route path="/guides/chart-basics" element={<ChartBasics />} />
                <Route path="/guides/data-import" element={<DataImport />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
