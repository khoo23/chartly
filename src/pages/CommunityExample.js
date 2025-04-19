import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Pie, Line, Bar, Doughnut, Scatter, Bubble, PolarArea } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import "../index.css"

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
    const chartInfo = useLocation().state;
    const chartType = chartInfo.chart;
    const ChartComponent = chartTypes[chartType] || Pie;
    const [title, setTitle] = useState(chartInfo.title);

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

    const checkPointChart = () => {
        var typeCheck = (
            chartType === "line" ||
            chartType === "scatter" ||
            chartType === "area" 
        );
        return(typeCheck);
    }

    const checkNumXY = () => {
        var typeCheck = (
            chartType === "scatter" ||
            chartType === "bubble" 
        );
        return(typeCheck);
    }

    const checkPastryChart = () => {
        var typeCheck = (
            chartType === "pie" ||
            chartType === "doughnut"
        );
        return(typeCheck);
    }

    //Variable Setup
    const [labels, setLabels] = useState(chartInfo.label);
    const [pointPos, setPos] = useState(chartInfo.position);
    const [pointData, setData] = useState(chartInfo.values);
    const [pointRad, setPointRadius] = useState(chartInfo.label.map((value, index) => {return 10}));
    //Variable color setup
    var initDataCO = [0];
    const [dataColor, setDataColor] = useState(chartInfo.color);
    const [dataOpac, setDataOpac] = useState(chartInfo.label.map((value, index) => {return 255}));
    for(var i = 0; i < pointPos.length; i ++) { initDataCO[i] = dataColor[i] + dataOpac[i].toString(16); }
    const [dataCO, setDataCO] = useState(initDataCO);
    const [bgColor, setBgColor] = useState("#007bff");
    const [bgOpac, setBgOpac] = useState(255);
    const bgColorSetup = () => {
        if (checkBgType()) return(useState(dataCO));
        else return(useState(bgColor + bgOpac.toString(16)));
    }
    const [bgCO, setBgCO] = bgColorSetup();
    const [borderColor, setBorderColor] = useState('#000');
    //Labels setup
    const [legendPosition, setLegendPosition] = useState('top');
    const [showDataLabels, setShowDataLabels] = useState(true);
    const [fontSize, setFontSize] = useState(16);
    const [lineSize, setLineSize] = useState(2);

    const [pointSize, setPointSize] = useState(chartInfo.pointS);
    const [fillMode, setFill] = useState(false);
    const [chartRad, setChartRad] = useState(150);
    const [starCond, setStar] = useState(["☆","☆","☆","☆","☆"]);
    const [starSelect, setStarSelect] = useState(true);

    const dataFormat = () => {
        if (!checkPastryChart())
        {
            var dataObject = [0];
            for (var i = 0; i < pointPos.length; i++)
            {
                dataObject[i] = {x: pointPos[i], y: pointData[i], r: pointRad[i]};
            }
            return dataObject;
        }
        else return(pointData);
    }

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
    }

    const ratingDisplay = (starID) => {
        var starOut = <div style={{display: "inline-block", fontSize: "30px", margin:"10px 1px", color: "#007bff"}} onMouseEnter={() => toggleStarOn(starID)} onMouseLeave={() => toggleStarOff(starID)} onClick={ratingSelect} value={starID}>{starCond[starID]}</div>;
        return(starOut);
    }

    const toggleStarOn = (starID) => {
        if (starSelect) {
            const newStar = [...starCond];
            for (var i = 0; i <= starID; i++) newStar[i] = "★";
            setStar(newStar);
        }
    }

    const toggleStarOff = (starID) => {
        if (starSelect) {
            const newStar = [...starCond];
            for (var i = 4; i >= starID; i--) newStar[i] = "☆";
            setStar(newStar);
        }
    }

    const ratingSelect = () => {
        setStarSelect(!starSelect);
        if(!starSelect){
            setStar(["☆","☆","☆","☆","☆"]);
        }
    }
    
    const starsOff = () => {
        if(starSelect){setStar(["☆","☆","☆","☆","☆"]);}
    }

    const handleLabelChange = (index, value) => {
        const newLabels = [...labels];
        newLabels[index] = value;
        setLabels(newLabels);
    }

    const handlePositionChange = (index, value) => {
        const newPos = [...pointPos];
        newPos[index] = Number(value);
        setPos(newPos);
    }

    const handleDataChange = (index, value) => {
        const newData = [...pointData];
        newData[index] = Number(value);
        setData(newData);
    }

    const handleRadChange = (index, value) => {
        const newRadius = [...pointRad];
        newRadius[index] = Number(value);
        ct(newRadius[index]);
        setPointRadius(newRadius);
    }

    const handleBgColor = (value) => {
        setBgColor(value);
        handleColorChange(value, Math.floor(bgOpac));
    }

    const handleBgOpac = (value) => {
        const alpha = Math.floor(value * 255 / 100);
        setBgOpac(value);
        handleColorChange(bgColor, alpha);
    }

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
    }
    
    const handleDataColor = (index, value) => {
        const newDataColor = [...dataColor];
        newDataColor[index] = value;
        setDataColor(newDataColor);
        handleDataColorChange(index, value, Math.floor(dataOpac[index]))
    }

    const handleDataColorChange = (index, valueC, valueO) => {
        const newDataColorAlpha = [...dataCO];
        newDataColorAlpha[index] = valueC + valueO.toString(16);
        setDataCO(newDataColorAlpha);
        if (checkBgType()) setBgCO(dataCO);
    }

    const labelPlaceHolder = (index) => { return(`Label ${index + 1}`); };

    const addRow = () => {
        setLabels([...labels, labelPlaceHolder(labels.length)]);
        setPos([...pointPos, pointPos.length + 1]);
        setData([...pointData, 0]);
        setPointRadius([...pointRad, 10]);
        setDataColor([...dataColor, "#007bff"]);
        setDataOpac([...dataOpac, 255]);
        setDataCO([...dataCO, "#007bffff"]);
    }

    const removeRow = (index) => {
        setLabels(labels.filter((_, i) => i !== index));
        setPos(pointPos.filter((_, i) => i !== index));
        setData(pointData.filter((_, i) => i !== index));
        setPointRadius(pointRad.filter((_, i) => i !== index));
        setDataColor(dataColor.filter((_, i) => i !== index));
        setDataOpac(dataOpac.filter((_, i) => i !== index));
        setDataCO(dataCO.filter((_, i) => i !== index));
    }

    const exportChart = () => {
        const chartElement = document.getElementById('chartContainer');
        html2canvas(chartElement).then((canvas) => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'chart.png';
            link.click();
        });
    }

    //WARNING: radius property reffers to pie/dounut size
    const chartData = {
        labels: labels,
        datasets: [{
            label: title,
            data: dataFormat(),
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
        aspectRatio: 1.5,  // Adjust chart size to take up less screen space,
        radius: chartRad,
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
            <h1 className="display-4 text-center">{chartInfo.title}</h1>
            <h2 className='display-8 text-center'>By: {chartInfo.author}</h2>
            <div className={'display-4 text-center'} style={{width: "30%", margin: "auto", fontSize: "30px"}} onMouseLeave={starsOff}>
                <label>Your Rating: </label>
                {ratingDisplay(0)}
                {ratingDisplay(1)}
                {ratingDisplay(2)}
                {ratingDisplay(3)}
                {ratingDisplay(4)}
            </div>
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
                <button className="btn btn-primary mt-3" onClick={exportChart}>Download Chart</button>

                <h4>Data Input</h4>
                {labels.map((label, index) => (
                    <div key={index} className="d-flex gap-2 mb-2">
                        <input type="text" value={label} onChange={(e) => handleLabelChange(index, e.target.value)} className="form-control" placeholder={() => labelPlaceHolder(index)} />
                        <input type="number" hidden={!checkNumXY()} value={pointPos[index]} onChange={(e) => handlePositionChange(index, e.target.value)} className="form-control" placeholder="Value" />
                        <input type="number" value={pointData[index]} onChange={(e) => handleDataChange(index, e.target.value)} className="form-control" placeholder="Value" />
                        <input type="number" hidden={chartType !== "bubble"} value={pointRad[index]} min="1" onChange={(e) => handleRadChange(index, e.target.value)} className="form-control" placeholder="10" />
                        <input type="color" value={dataColor[index]} onChange={(e) => handleDataColor(index, e.target.value)} className="form-control" placeholder='007bff'/>
                        <input type="range" hidden={chartType !== "bubble"} value={dataOpac[index]} onChange={(e) => handleDataOpac(index, Number(e.target.value))} min="0" max="100" className="form-control" placeholder='100'/>
                        <button className="btn btn-danger" onClick={() => removeRow(index)}>Remove</button>
                    </div>
                ))}
                <button className="btn btn-success" onClick={addRow}>Add Data Row</button>
            </div>
        </div>
    );
}

export default CommunityExample;