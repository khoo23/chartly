import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Filler, Title, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Pie, Line, Bar, Doughnut, Scatter, Bubble, PolarArea } from 'react-chartjs-2';
import html2canvas from 'html2canvas';

ChartJS.register(ArcElement, LineElement, BarElement, PointElement, CategoryScale, LinearScale, RadialLinearScale, Filler, Title, Tooltip, Legend);

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

const ChartBuilder = () => {
    const { chartType } = useParams();
    const ChartComponent = chartTypes[chartType.toLowerCase()] || Pie;
    
    var initArray = ['Label 1', 'Label 2', 'Label 3'];
    if (
        chartType === "scatter" ||
        chartType === "bubble"
    ) initArray = [1, 2, 3];
    const [labels, setLabels] = useState(initArray);
    const [data, setData] = useState([10, 20, 30]);
    const [title, setTitle] = useState('My Chart');
    const [legendPosition, setLegendPosition] = useState('top');
    const [showDataLabels, setShowDataLabels] = useState(true);
    const [bgColor, setBgColor] = useState('#007bff');
    const [bgOpac, setBgOpac] = useState(255);
    const [bgCO, setBgCO] = useState(bgColor + bgOpac.toString(16));
    const [dataColor, setDataColor] = useState('#007bff');
    const [borderColor, setBorderColor] = useState('#000');
    const [fontSize, setFontSize] = useState(16);
    const [lineSize, setLineSize] = useState(2);
    const [pointSize, setPointSize] = useState(5);
    const [fillMode, setFill] = useState(false);
    const [test, ct] = useState(0);

    const dataColorSetup = () => {
        if (
            chartType === "pie" ||
            chartType === "bar" ||
            chartType === "doughnut" ||
            chartType === "column" ||
            chartType === "polar"
        ) chartData.datasets.backgroundColor = dataColor;
    };

    const pointInfo = () => {
        if (
            chartType === "line" ||
            chartType === "scatter" ||
            chartType === "area" 
        )
        {
            return(
                <div>
                    <label>Point Size</label>
                    <input type='number' value={pointSize} onChange={(e) => setPointSize(Number(e.target.value))} className='form-control mb-2' />
                </div>
            );
        }
    };

    const areaSetting = () => {
        if (chartType === "area")
        {
            return(
                <div>
                    <label>Area Fill Mode</label>
                    <select value={fillMode} onChange={(e) => setFill(e.target.value)} className="form-select mb-2">
                        <option value="origin">y-axis</option>
                        <option value="start">Bottom</option>
                        <option value="end">Top</option>
                        <option value="false">None</option>
                    </select>
                </div>
            );
        }
    };

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

    const handleBgColor = (value) => {
        setBgColor(value);
        handleColorChange(value, bgOpac);
    };

    const handleBgOpac = (value) => {
        const alpha = Math.floor(value * 255 / 100);
        //ct(alpha);
        setBgOpac(value);
        handleColorChange(bgColor, alpha);
    };

    const handleColorChange = (valueC, valueO) => {
        const hexa = valueC + valueO.toString(16);
        setBgCO(hexa);
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
            backgroundColor: bgCO,
            borderColor: borderColor,
            borderWidth: lineSize,
            hoverOffset: 4,
            pointBackgroundColor: dataColor,
            pointBorderColor: borderColor,
            pointRadius: pointSize,
            fill: fillMode
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,  // Adjust chart size to take up less screen space
        plugins: {
            filler: {
                propegate: false,
            },
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

    dataColorSetup();
    return (
        <div className="container py-5">
            <h1 className="display-4 text-center">Chart Builder - {chartType} Chart</h1>
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
                <input type="color" value={bgColor} onChange={(e) => handleBgColor(e.target.value)} className="form-control mb-2" />
                <label>Background Opacity (0 - 100)%: </label>
                <input type="range" value={bgOpac} onChange={(e) => handleBgOpac(Number(e.target.value))} min="0" max="100" className="form-control mb-2" />
                {areaSetting()}
                <label>Border Color: </label>
                <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="form-control mb-2" />
                <label>Font Size: </label>
                <input type="number" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="form-control mb-2" />
                <label>Line Thickness</label>
                <input type='number' value={lineSize} onChange={(e) => setLineSize(Number(e.target.value))} className='form-control mb-2' />
                {pointInfo()}
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
};

export default ChartBuilder;
