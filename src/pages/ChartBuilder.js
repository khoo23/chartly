import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Line, Bar, Doughnut, Radar, Scatter } from 'react-chartjs-2';

ChartJS.register(ArcElement, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const chartTypes = {
    pie: Pie,
    line: Line,
    bar: Bar,
    doughnut: Doughnut,
    radar: Radar,
    scatter: Scatter
};

const ChartBuilder = () => {
    const { chartType } = useParams();
    const ChartComponent = chartTypes[chartType.toLowerCase()] || Pie;

    const [labels, setLabels] = useState(['Label 1', 'Label 2', 'Label 3']);
    const [data, setData] = useState([10, 20, 30]);

    const handleLabelChange = (index, value) => {
        const newLabels = [...labels];
        newLabels[index] = value;
        setLabels(newLabels);
    };

    const handleDataChange = (index, value) => {
        const newData = [...data];
        newData[index] = Number(value);
        setData(newData);
    };

    const addRow = () => {
        setLabels([...labels, `Label ${labels.length + 1}`]);
        setData([...data, 0]);
    };

    const removeRow = (index) => {
        setLabels(labels.filter((_, i) => i !== index));
        setData(data.filter((_, i) => i !== index));
    };

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'My Dataset',
            data: data,
            backgroundColor: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8'],
        }],
    };

    return (
        <div className="container py-5">
            <h1 className="display-4 text-center">Chart Builder - {chartType} Chart</h1>
            <div className="my-4">
                <ChartComponent data={chartData} />
            </div>

            <h3>Data Table</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {labels.map((label, index) => (
                        <tr key={index}>
                            <td><input type="text" value={label} onChange={(e) => handleLabelChange(index, e.target.value)} /></td>
                            <td><input type="number" value={data[index]} onChange={(e) => handleDataChange(index, e.target.value)} /></td>
                            <td>
                                <button className="btn btn-danger" onClick={() => removeRow(index)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-success" onClick={addRow}>Add Row</button>
        </div>
    );
};

export default ChartBuilder;
