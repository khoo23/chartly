import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container-fluid text-center py-5 bg-light">
            {/* Hero Section */}
            <div className="jumbotron bg-primary text-white p-5 mb-4 rounded">
                <h1 className="display-3">Welcome to Chartly</h1>
                <p className="lead">Create beautiful, professional charts with ease.</p>
                <p>Browse ready-made templates or create your own custom charts.</p>
                <div className="d-flex justify-content-center gap-3">
                    <Link to="/templates" className="btn btn-outline-light btn-lg">Browse Templates</Link>
                    <Link to="/explore" className="btn btn-outline-light btn-lg">Explore Charts</Link>
                </div>
            </div>

            {/* Feature Highlights */}
            <div className="container my-5">
                <h2 className="mb-4">Why Choose Chartly?</h2>
                <div className="row">
                    <div className="col-md-4">
                        <h3>Easy to Use</h3>
                        <p>Create charts without hassle using intuitive tools and templates.</p>
                    </div>
                    <div className="col-md-4">
                        <h3>Customizable</h3>
                        <p>Adjust colors, styles, and data for personalized visualizations.</p>
                    </div>
                    <div className="col-md-4">
                        <h3>Community Driven</h3>
                        <p>Explore and share charts created by the Chartly community.</p>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="container text-center my-5">
                <h2>Get Started Now</h2>
                <p className="lead">Start building your next beautiful chart with Chartly.</p>
                <Link to="/templates" className="btn btn-primary btn-lg">Browse Templates</Link>
            </div>
        </div>
    );
};

export default HomePage;
