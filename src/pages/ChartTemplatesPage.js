import React from 'react';
import { Link } from 'react-router-dom';

// Import chart icons
import pieChartIcon from '../assets/pie-chart.png';
import lineChartIcon from '../assets/line-chart.png';
import columnChartIcon from '../assets/column-chart.png';
import barChartIcon from '../assets/bar-chart.png';
import areaChartIcon from '../assets/area-chart.png';
import scatterPlotIcon from '../assets/scatter-plot.png';
import radarChartIcon from '../assets/radar-chart.png';
import bubbleChartIcon from '../assets/bubble-chart.png';

const chartTypes = [
    { id: 1, name: 'Pie', description: 'Visualize proportions with a circular graph.', icon: pieChartIcon },
    { id: 2, name: 'Line', description: 'Show trends over time with connected data points.', icon: lineChartIcon },
    { id: 3, name: 'Column', description: 'Compare values across categories with vertical bars.', icon: columnChartIcon },
    { id: 4, name: 'Bar', description: 'Compare values across categories with horizontal bars.', icon: barChartIcon },
    { id: 5, name: 'Area', description: 'Show cumulative data over time with shaded areas.', icon: areaChartIcon },
    { id: 6, name: 'Scatter', description: 'Display individual data points to observe distribution.', icon: scatterPlotIcon },
    { id: 7, name: 'Radar', description: 'Compare multiple variables with a radial plot.', icon: radarChartIcon },
    { id: 8, name: 'Bubble', description: 'Visualize relationships between three variables with bubbles.', icon: bubbleChartIcon }
];

const ChartTemplatesPage = () => {
    return (
        <div className="container py-5">
            <h1 className="display-4 text-center mb-4">Chart Templates</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {chartTypes.map((chart) => (
                    <div key={chart.id} className="col">
                        <div className="card h-100 shadow-sm text-center">
                            <div className="card-body">
                                <img src={chart.icon} alt={chart.name} className="card-img-top mb-3" style={{ height: '100px', objectFit: 'contain' }} />
                                <h5 className="card-title">{chart.name} Chart</h5>
                                <p className="card-text">{chart.description}</p>
                                <Link to={`/chart-builder/${chart.name.toLowerCase()}`} className="btn btn-primary">Use Template</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChartTemplatesPage;
