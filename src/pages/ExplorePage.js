import React from 'react';
import { Link } from 'react-router-dom';

const communityCharts = [
    {
        id: 1,
        title: "Revenue Distribution",
        chart: "doughnut",
        type: "Donut Chart",
        author: "Alex Morgan",
        rating: 4.8,
        views: 1200,
        image: "../assets/pie-chart.png",
        label: ["Company 1", "Company 2", "Company 3"],
        values: [10, 10, 10]
    },
    {
        id: 2,
        title: "Market Share Analysis",
        chart: "pie",
        type: "Pie Chart",
        author: "Sarah Chen",
        rating: 4.6,
        views: 800,
        image: "../assets/pie-chart.png",
        label: ["Company 1", "Company 2", "Company 3"],
        values: [10, 10, 10]
    },
    {
        id: 3,
        title: "Sales Performance",
        chart: "bar",
        type: "Bar Chart",
        author: "Mike Wilson",
        rating: 4.9,
        views: 1500,
        image: "../assets/bar-chart.png",
        label: ["Company 1", "Company 2", "Company 3"],
        values: [10, 10, 10]
    },
    {
        id: 4,
        title: "Trend Analysis",
        chart: "line",
        type: "Line Chart",
        author: "Diana Lee",
        rating: 4.7,
        views: 950,
        image: "../assets/line-chart.png",
        label: ["Company 1", "Company 2", "Company 3"],
        values: [10, 10, 10]
    },
    {
        id: 5,
        title: "Customer Growth",
        chart: "line",
        type: "Area Chart",
        author: "John Smith",
        rating: 4.5,
        views: 700,
        image: "../assets/area-chart.png",
        label: ["Company 1", "Company 2", "Company 3"],
        values: [10, 10, 10]
    }
];

const ExplorePage = () => {
    return (
        <div className="container py-5">
            <h1 className="display-4 text-center mb-4">Explore Community Charts</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {communityCharts.map((chart) => (
                    <div key={chart.id} className="col">
                        <div className="card h-100 shadow-sm">
                            <img
                                src={chart.image}
                                className="card-img-top"
                                alt={chart.title}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{chart.title}</h5>
                                <p className="card-text">Type: {chart.type}</p>
                                <p className="card-text">Author: {chart.author}</p>
                                <p className="card-text">Rating: ⭐ {chart.rating}</p>
                                <p className="card-text">Views: 👁️ {chart.views}</p>
                                <Link to={`/chart-view/${chart.id}`} state={communityCharts[chart.id - 1]} className="btn btn-primary">View Chart</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExplorePage;
