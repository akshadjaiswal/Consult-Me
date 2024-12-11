const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');  // For running Python scripts

const app = express();
const port = 3000;

// Middleware for handling CORS, JSON body parsing, and static files
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

// POST route to handle prediction requests
app.post('/predict', (req, res) => {
    // Destructuring features from the request body
    const {
        glucose,
        cholesterol,
        hemoglobin,
        platelets,
        whiteBloodCells,
        redBloodCells,
        hematocrit,
        meanCorpuscularVolume,
        meanCorpuscularHemoglobin,
        meanCorpuscularHemoglobinConcentration,
        insulin,
        bmi,
        systolicBloodPressure,
        diastolicBloodPressure,
        triglycerides,
        hba1c,
        ldlCholesterol,
        hdlCholesterol,
        alt,
        ast,
        heartRate,
        creatinine,
        troponin,
        cReactiveProtein
    } = req.body;

    // Call Python script to load the model and predict
    const python = spawn('python', [
        './predict.py', 
        glucose,
        cholesterol,
        hemoglobin,
        platelets,
        whiteBloodCells,
        redBloodCells,
        hematocrit,
        meanCorpuscularVolume,
        meanCorpuscularHemoglobin,
        meanCorpuscularHemoglobinConcentration,
        insulin,
        bmi,
        systolicBloodPressure,
        diastolicBloodPressure,
        triglycerides,
        hba1c,
        ldlCholesterol,
        hdlCholesterol,
        alt,
        ast,
        heartRate,
        creatinine,
        troponin,
        cReactiveProtein
    ]);

    let predictionData = '';

    // Capture output from Python script (stdout)
    python.stdout.on('data', (data) => {
        predictionData += data.toString();
    });

    // If there's an error in Python script (stderr)
    python.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Prediction failed' });
        }
    });

    // After Python script finishes execution
    python.on('close', (code) => {
        if (code === 0) {
            // Send prediction result back to the client
            if (!res.headersSent) {
                res.json({ prediction: predictionData.trim() });
            }
        } else {
            // Handle failure (if Python script exits with an error)
            if (!res.headersSent) {
                res.status(500).json({ error: 'Prediction process exited with an error' });
            }
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
