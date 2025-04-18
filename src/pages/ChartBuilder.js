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

    const checkBgType = () => {
        var typeCheck = (
            chartType === "pie" ||
            chartType === "bar" ||
            chartType === "doughnut" ||
            chartType === "column" ||
            chartType === "polar" ||
            chartType === "bubble");
        return(typeCheck);
    }

    var initLabel = ['Label 1', 'Label 2', 'Label 3'];
    //Initialize lables with numbers for grapps below
    if (
        chartType === "scatter" ||
        chartType === "bubble"
    ) initLabel = [1, 2, 3];
    var initR = [30, 20, 15];    

    const [labels, setLabels] = useState(initLabel);
    const [pointData, setData] = useState([10, 20, 30]);
    const [title, setTitle] = useState('My Chart');
    const [legendPosition, setLegendPosition] = useState('top');
    const [showDataLabels, setShowDataLabels] = useState(false);
    const [dataColor, setDataColor] = useState(['#007bff', '#007bff', '#007bff']);
    const [dataOpac, setDataOpac] = useState([255, 255, 255]);

    var initDataCO = [0];
    for(var i = 0; i < 3; i ++)
    {
        initDataCO[i] = dataColor[i] + dataOpac[i].toString(16);
    }

    const [dataCO, setDataCO] = useState(initDataCO);
    const [bgColor, setBgColor] = useState("#007bff");
    const [bgOpac, setBgOpac] = useState(255);

    //Set background color reference based on chart type
    const bgColorSetup = () => {
        if (checkBgType()) return(useState(dataCO));
        else return(useState(bgColor + bgOpac.toString(16)));
    };
    
    const [bgCO, setBgCO] = bgColorSetup();
    const [borderColor, setBorderColor] = useState('#000');
    const [fontSize, setFontSize] = useState(16);
    const [lineSize, setLineSize] = useState(2);
    //const [rad, setRadius] = useState(40);

    const pointSetup = () => {
        if (chartType === "bubble") 
        {
            return(useState(initR));
        }
        else return(useState(5));
    };

    const [pointSize, setPointSize] = pointSetup();
    const [fillMode, setFill] = useState(false);
    const [test, ct] = useState(0);     //Test react object

    //Change point size
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
        const newData = [...pointData];
        newData[index] = Number(value);
        setData(newData);
    };

    const handleRadChange = (index, value) => {
        const newRadius = [...pointSize];
        newRadius[index] = Number(value);
        ct(newRadius);
        setPointSize(newRadius);
    };

    const handleBgColor = (value) => {
        setBgColor(value);
        handleColorChange(value, Math.floor(bgOpac));
    };

    const handleBgOpac = (value) => {
        const alpha = Math.floor(value * 255 / 100);
        setBgOpac(value);
        handleColorChange(bgColor, alpha);
    };

    const handleColorChange = (valueC, valueO) => {
        const hexa = valueC + valueO.toString(16);
        setBgCO(hexa);
    }

    const handleDataOpac = (index, value) => {
        const alpha = Math.floor(value * 255 / 100);
        const newDataAlpha = [...dataOpac];
        newDataAlpha[index] = value;
        setDataOpac(newDataAlpha);
        handleDataColorChange(index, dataColor[index], alpha)
    };
    
    const handleDataColor = (index, value) => {
        const newDataColor = [...dataColor];
        newDataColor[index] = value;
        setDataColor(newDataColor);
        handleDataColorChange(index, value, Math.floor(dataOpac[index]))
    };

    const handleDataColorChange = (index, valueC, valueO) => {
        const newDataColorAlpha = [...dataCO];
        newDataColorAlpha[index] = valueC + valueO.toString(16);
        setDataCO(newDataColorAlpha);
        if (checkBgType()) setBgCO(dataCO);
    }

    const labelPlaceHolder = (index) => {
        if (
            chartType === "bubble" ||
            chartType === "scatter"
        ) return(index + 1);
        else return(`Label ${index + 1}`);
    };

    const addRow = () => {
        setLabels([...labels, labelPlaceHolder(labels.length)]);
        setData([...pointData, 0]);
        setDataColor([...dataColor, "#007bff"]);
        setDataOpac([...dataOpac, 255]);
        setDataCO([...dataCO, "#007bffff"]);
        if (chartType === "bubble") setPointSize([...pointSize, 10]);
    };

    const removeRow = (index) => {
        setLabels(labels.filter((_, i) => i !== index));
        setData(pointData.filter((_, i) => i !== index));
        setDataColor(dataColor.filter((_, i) => i !== index));
        setDataOpac(dataOpac.filter((_, i) => i !== index));
        setDataCO(dataCO.filter((_, i) => i !== index));
        if (chartType === "bubble") setPointSize(pointSize.filter((_, i) => i !== index));
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

    //WARNING: radius property freffers to pie/dounut size
    const chartData = {
        labels: labels,
        datasets: [{
            label: title,
            data: pointData,
            backgroundColor: bgCO,
            borderColor: borderColor,
            borderWidth: lineSize,
            hoverOffset: 4,
            pointBackgroundColor: dataCO,
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
                <label hidden="true">Data Label Visibility: </label>
                <input type="checkbox" hidden="true" checked={showDataLabels} onChange={() => setShowDataLabels(!showDataLabels)} className="form-check-input mb-2" />
                <label>Background Color: </label>
                <input type="color" hidden={checkBgType()} value={bgColor} onChange={(e) => handleBgColor(e.target.value)} className="form-control mb-2" />
                <label hidden={chartType !== "area"}>Background Opacity (0 - 100)%: </label>
                <input type="range" hidden={chartType !== "area"} value={bgOpac} onChange={(e) => handleBgOpac(Number(e.target.value))} min="0" max="100" className="form-control mb-2" />
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
                        <input type="text" value={label} onChange={(e) => handleLabelChange(index, e.target.value)} className="form-control" placeholder={() => labelPlaceHolder(index)} />
                        <input type="number" value={pointData[index]} onChange={(e) => handleDataChange(index, e.target.value)} className="form-control" placeholder="Value" />
                        <input type="number" hidden={chartType !== "bubble"} value={pointSize[index]} onChange={(e) => handleRadChange(index, e.target.value)} className="form-control" placeholder="10" />
                        <input type="color" value={dataColor[index]} onChange={(e) => handleDataColor(index, e.target.value)} className="form-control" placeholder='007bff'/>
                        <input type="range" hidden={chartType !== "bubble"} value={dataOpac[index]} onChange={(e) => handleDataOpac(index, Number(e.target.value))} min="0" max="100" className="form-control" placeholder='100'/>
                        <button className="btn btn-danger" onClick={() => removeRow(index)}>Remove</button>
                    </div>
                ))}
                <button className="btn btn-success" onClick={addRow}>Add Data Row</button>
            </div>
            <p>{pointSize} {test}</p>
        </div>
    );
};

export default ChartBuilder;
