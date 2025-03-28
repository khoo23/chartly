import React from 'react';

const quickStartGuides = [
    { id: 1, title: "Getting Started with Chartly", description: "Learn the basics of creating your first chart.", link: "/guides/getting-started" },
    { id: 2, title: "Chart Basics", description: "Understanding different chart types and their uses.", link: "/guides/chart-basics" },
    { id: 3, title: "Data Import Guide", description: "How to import and format your data.", link: "/guides/data-import" },
];

const allGuides = [
    { id: 4, title: "Animations & Transitions", link: "/guides/animations" },
    { id: 5, title: "Area Charts", link: "/guides/area-charts" },
    { id: 6, title: "Axis Customization", link: "/guides/axis-customization" },
    { id: 7, title: "Bar Charts", link: "/guides/bar-charts" },
    { id: 8, title: "Bubble Charts", link: "/guides/bubble-charts" },
    { id: 9, title: "Color Palettes", link: "/guides/color-palettes" },
    { id: 10, title: "Custom Legends", link: "/guides/custom-legends" },
    { id: 11, title: "Line Charts", link: "/guides/line-charts" },
    { id: 12, title: "Pie Charts", link: "/guides/pie-charts" },
    { id: 13, title: "Scatter Plots", link: "/guides/scatter-plots" },
];

const UserGuides = () => {
    return (
        <div className="container py-5">
            <h1 className="display-4 text-center mb-4">User Guides & Tutorials</h1>

            <div className="mb-4">
                <input type="text" className="form-control" placeholder="Search guides and tutorials..." />
            </div>

            <h3>Quick Start Guides</h3>
            <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                {quickStartGuides.map((guide) => (
                    <div key={guide.id} className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{guide.title}</h5>
                                <p className="card-text">{guide.description}</p>
                                <a href={guide.link} className="btn btn-primary">Read more →</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h3>All Guides A-Z</h3>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {allGuides.map((guide) => (
                    <div key={guide.id} className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{guide.title}</h5>
                                <a href={guide.link} className="btn btn-outline-secondary">Read more →</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserGuides;
