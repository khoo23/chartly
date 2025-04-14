import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Pie, Line, Bar, Doughnut, Scatter, Bubble, PolarArea } from 'react-chartjs-2';
import html2canvas from 'html2canvas';

ChartJS.register(ArcElement, LineElement, BarElement, PointElement, CategoryScale, LinearScale, RadialLinearScale, Title, Tooltip, Legend);

const chartTypes = {
    pie: Pie,
    line: Line,
    bar: Bar,
    doughnut: Doughnut,
    scatter: Scatter,
    column: Bar,
    area: Line,
    bubble: Bubble,
    polar: PolarArea  // Correctly map to PolarArea and register RadialLinearScale
};

const CommunityExample = () => {
    const setChartType = () => {
        if (useParams().chartId == 1) return 'Doughnut';
        else if(useParams() == 2) return 'Pie';
        else if(useParams() == 3) return 'Bar';
    }
    const chartType = setChartType();
    const chartInfo = useLocation().state;
    const ChartComponent = chartTypes.doughnut;//chartTypes[chartType.toLowerCase()] || Pie;

    const [labels, setLabels] = useState(['Label 1', 'Label 2', 'Label 3']);
    const [data, setData] = useState([10, 20, 30]);
    const [title, setTitle] = useState('My Chart');
    const [legendPosition, setLegendPosition] = useState('top');
    const [showDataLabels, setShowDataLabels] = useState(true);
    const [bgColor, setBgColor] = useState('#007bff');
    const [dataColor, setDataColor] = useState('#007bff');
    const [borderColor, setBorderColor] = useState('#000');
    const [fontSize, setFontSize] = useState(16);

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

    const handleColorChange = (index, value) => {
        const newBGColor = [...bgColor];
        newBGColor[index] = value;
        setBgColor(newBGColor);
    }

    const handleDataColorChange = (index, value) => {
        const newDataColor = [...dataColor];
        newDataColor[index] = value;
        setDataColor(newDataColor);
    }

    const addRow = () => {
        setLabels([...labels, `Label ${labels.length + 1}`]);
        setData([...data, 0]);
    };

    const removeRow = (index) => {
        setLabels(labels.filter((_, i) => i !== index));
        setData(data.filter((_, i) => i !== index));
    };

    const exportChart = () => {
        const chartElement = document.getElementById('chartContainer');
        html2canvas(chartElement).then((canvas) => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'chart.png';
            link.click();
        });
    };

    const chartData = {
        labels: labels,
        datasets: [{
            label: title,
            data: data,
            backgroundColor: dataColor,
            borderColor: borderColor,
            borderWidth: 2,
            hoverOffset: 4,
            pointBackgroundColor: dataColor,
            pointBorderColor: borderColor,
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,  // Adjust chart size to take up less screen space
        plugins: {
            legend: {
                position: legendPosition,
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: fontSize,
                },
            },
        },
    };

    return (
        <div className="container py-5">
            <h1 className="display-4 text-center">{chartInfo.title}</h1>
            <h2 className='display-8 text-center'>By: {chartInfo.author}</h2>
            <div id="chartContainer" className="my-4" style={{ maxWidth: '50%', margin: '0 auto' }}>
                <ChartComponent data={chartData} options={chartOptions} />
            </div>

            <div className="mb-4">
                <label>Chart Title: </label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control mb-2" />
                <label>Legend Position: </label>
                <select value={legendPosition} onChange={(e) => setLegendPosition(e.target.value)} className="form-select mb-2">
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>
                <label>Data Label Visibility: </label>
                <input type="checkbox" checked={showDataLabels} onChange={() => setShowDataLabels(!showDataLabels)} className="form-check-input mb-2" />
                <label>Background Color: </label>
                <input type="color" value={bgColor} onChange={(e) => handleColorChange(e.target.value)} className="form-control mb-2" />
                <label>Border Color: </label>
                <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="form-control mb-2" />
                <label>Font Size: </label>
                <input type="number" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="form-control mb-2" />
                <button className="btn btn-primary mt-3" onClick={exportChart}>Download Chart</button>

                <h4>Data Input</h4>
                {labels.map((label, index) => (
                    <div key={index} className="d-flex gap-2 mb-2">
                        <input type="text" value={label} onChange={(e) => handleLabelChange(index, e.target.value)} className="form-control" placeholder={`Label ${index + 1}`} />
                        <input type="number" value={data[index]} onChange={(e) => handleDataChange(index, e.target.value)} className="form-control" placeholder="Value" />
                        <input type="color" value={dataColor[index]} onChange={(e) => handleDataColorChange(index, e.target.value)} className="form-control" placeholder='Color'/>
                        <button className="btn btn-danger" onClick={() => removeRow(index)}>Remove</button>
                    </div>
                ))}
                <button className="btn btn-success" onClick={addRow}>Add Data Row</button>
            </div>
        </div>
    );
}

export default CommunityExample;