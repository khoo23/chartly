import React from 'react';

const DataImport = () => {
    return (
        <div className="container py-5">
            <h1>Data Import Guide</h1>
            <p>Learn how to import your data into Chartly for visualization.</p>
            <h3>Supported Formats</h3>
            <p>Chartly supports the following data formats:</p>
            <ul>
                <li>CSV (Comma-Separated Values)</li>
                <li>Excel (XLSX)</li>
                <li>JSON (JavaScript Object Notation)</li>
            </ul>
            <h3>How to Import Data</h3>
            <p>Follow these steps to import your data:</p>
            <ol>
                <li>Go to the Chart Builder page.</li>
                <li>Click on the "Import Data" button.</li>
                <li>Select your file from your device.</li>
                <li>Review the data preview and adjust any settings.</li>
                <li>Click "Load Data" to start visualizing!</li>
            </ol>
        </div>
    );
};

export default DataImport;
