import React from 'react';
import { Link } from 'react-router-dom';

const chartTypes = [
    { name: 'Pie Chart', path: 'pie', icon: '../assets/pie-chart.png' },
    { name: 'Line Chart', path: 'line', icon: '../assets/line-chart.png' },
    { name: 'Bar Chart', path: 'bar', icon: '../assets/bar-chart.png' },
    { name: 'Doughnut Chart', path: 'doughnut', icon: '../assets/donut-chart.png' },
    { name: 'Scatter Chart', path: 'scatter', icon: '../assets/scatter-plot.png' },
    { name: 'Column Chart', path: 'column', icon: '../assets/column-chart.png' },
    { name: 'Area Chart', path: 'area', icon: '../assets/area-chart.png' },
    { name: 'Bubble Chart', path: 'bubble', icon: '../assets/bubble-chart.png' },
    { name: 'Polar Chart', path: 'polar', icon: '../assets/polar.png' }
];

const ChartTemplatesPage = () => {
    return (
        <div className="container py-5">
            <h1 className="display-4 text-center mb-4">Chart Templates</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {chartTypes.map((chart) => (
                    <div key={chart.path} className="col">
                        <div className="card h-100 text-center p-3">
                            <img src={chart.icon} alt={chart.name} className="card-img-top" style={{ maxHeight: '150px', objectFit: 'contain' }} />
                            <div className="card-body">
                                <h5 className="card-title">{chart.name}</h5>
                                <Link to={`/chart-builder/${chart.path}`} className="btn btn-primary">
                                    Create 
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChartTemplatesPage;
