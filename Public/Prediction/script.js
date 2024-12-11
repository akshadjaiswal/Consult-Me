document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prediction-form');
    const resultDiv = document.getElementById('result');

    // Handle form submission
    //form value reset
    function resetForm() {
        const inputs = document.querySelectorAll('#prediction-form input'); // Select all input fields inside the form
        console.log("Clicked")
        inputs.forEach(input => {
            input.value = ''; // Clear the value of each input field
        });
    }

    // Add event listener to the reset button
    document.getElementById('reset-button').addEventListener('click', resetForm);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Collect input values from the form
        const data = {
            glucose: document.getElementById('glucose').value,
            cholesterol: document.getElementById('cholesterol').value,
            hemoglobin: document.getElementById('hemoglobin').value,
            platelets: document.getElementById('platelets').value,
            whiteBloodCells: document.getElementById('whiteBloodCells').value,
            redBloodCells: document.getElementById('redBloodCells').value,
            hematocrit: document.getElementById('hematocrit').value,
            meanCorpuscularVolume: document.getElementById('meanCorpuscularVolume').value,
            meanCorpuscularHemoglobin: document.getElementById('meanCorpuscularHemoglobin').value,
            meanCorpuscularHemoglobinConcentration: document.getElementById('meanCorpuscularHemoglobinConcentration').value,
            insulin: document.getElementById('insulin').value,
            bmi: document.getElementById('bmi').value,
            systolicBloodPressure: document.getElementById('systolicBloodPressure').value,
            diastolicBloodPressure: document.getElementById('diastolicBloodPressure').value,
            triglycerides: document.getElementById('triglycerides').value,
            hba1c: document.getElementById('hba1c').value,
            ldlCholesterol: document.getElementById('ldlCholesterol').value,
            hdlCholesterol: document.getElementById('hdlCholesterol').value,
            alt: document.getElementById('alt').value,
            ast: document.getElementById('ast').value,
            heartRate: document.getElementById('heartRate').value,
            creatinine: document.getElementById('creatinine').value,
            troponin: document.getElementById('troponin').value,
            cReactiveProtein: document.getElementById('cReactiveProtein').value,
        };

        try {
            // Send the data to the server
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Parse the JSON response
            const result = await response.json();

            // Display the result on the frontend
            resultDiv.textContent = `Prediction: ${result.prediction}`;
        } catch (error) {
            resultDiv.textContent = 'Error: Could not get a prediction.';
        }
    });
});
