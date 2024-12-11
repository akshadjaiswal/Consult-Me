import sys
import pickle
import pandas as pd  # Import pandas

# Load the model
with open('Model/ConsultMe.pkl', 'rb') as f:
    model = pickle.load(f)

# Get inputs from Node.js
glucose = float(sys.argv[1])
cholesterol = float(sys.argv[2])
hemoglobin = float(sys.argv[3])
platelets = float(sys.argv[4])
whiteBloodCells = float(sys.argv[5])
redBloodCells = float(sys.argv[6])
hematocrit = float(sys.argv[7])
meanCorpuscularVolume = float(sys.argv[8])
meanCorpuscularHemoglobin = float(sys.argv[9])
meanCorpuscularHemoglobinConcentration = float(sys.argv[10])
insulin = float(sys.argv[11])
bmi = float(sys.argv[12])
systolicBloodPressure = float(sys.argv[13])
diastolicBloodPressure = float(sys.argv[14])
triglycerides = float(sys.argv[15])
hba1c = float(sys.argv[16])
ldlCholesterol = float(sys.argv[17])
hdlCholesterol = float(sys.argv[18])
alt = float(sys.argv[19])
ast = float(sys.argv[20])
heartRate = float(sys.argv[21])
creatinine = float(sys.argv[22])
troponin = float(sys.argv[23])
cReactiveProtein = float(sys.argv[24])

# Create input DataFrame for model prediction
input_features = pd.DataFrame({
    'glucose': [glucose],
    'cholesterol': [cholesterol],
    'hemoglobin': [hemoglobin],
    'platelets': [platelets],
    'whiteBloodCells': [whiteBloodCells],
    'redBloodCells': [redBloodCells],
    'hematocrit': [hematocrit],
    'meanCorpuscularVolume': [meanCorpuscularVolume],
    'meanCorpuscularHemoglobin': [meanCorpuscularHemoglobin],
    'meanCorpuscularHemoglobinConcentration': [meanCorpuscularHemoglobinConcentration],
    'insulin': [insulin],
    'bmi': [bmi],
    'systolicBloodPressure': [systolicBloodPressure],
    'diastolicBloodPressure': [diastolicBloodPressure],
    'triglycerides': [triglycerides],
    'hba1c': [hba1c],
    'ldlCholesterol': [ldlCholesterol],
    'hdlCholesterol': [hdlCholesterol],
    'alt': [alt],
    'ast': [ast],
    'heartRate': [heartRate],
    'creatinine': [creatinine],
    'troponin': [troponin],
    'cReactiveProtein': [cReactiveProtein]
})

# Predict the output using the model
prediction = model.predict(input_features)

# Send the prediction back to Node.js
print(prediction[0])
