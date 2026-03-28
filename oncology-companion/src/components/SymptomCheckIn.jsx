import React, { useContext, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import { Link } from 'react-router-dom';

// Simple guidance messages for each symptom (supportive, non-diagnostic)
const symptomGuidance = {
  Nauseous: 'Try taking a small sip of water and consider your anti‑nausea medication. If it persists, inform your care team.',
  Anxious: 'Take a few deep breaths. You might find it helpful to write a short note about how you feel.',
  Diarrhea: 'Stay hydrated – aim for an extra glass of water. If it continues, let your nurse know.',
  Tired: 'Rest if you can. Light movement and hydration can help boost energy.',
  Pain: 'If pain is severe or worsening, contact your care team promptly.',
  Fever: 'A fever can be urgent. Please contact your care team right away.',
};

const symptomsList = Object.keys(symptomGuidance);

const SymptomCheckIn = () => {
  const { logSymptom } = useContext(PatientContext);
  const [lastSymptom, setLastSymptom] = useState(null);

  const handleLog = (symptom) => {
    logSymptom({ symptom });
    setLastSymptom(symptom);
  };

  const handleNoSymptoms = () => {
    // Log a special entry indicating no symptoms for today
    logSymptom({ symptom: 'No symptoms' });
    setLastSymptom('No symptoms');
  };

  return (
    <div className="container">
      <h1>Symptom Check‑In</h1>
      <ul>
        {symptomsList.map((s) => (
          <li key={s}>
            <button onClick={() => handleLog(s)}>{s}</button>
          </li>
        ))}
        <li key="no-symptoms">
          <button onClick={handleNoSymptoms}>No symptoms today</button>
        </li>
      </ul>
      {lastSymptom && (
        <section className="card guidance">
          <h2>{lastSymptom} Guidance</h2>
          <p>{symptomGuidance[lastSymptom]}</p>
        </section>
      )}
      <Link to="/">← Back to Dashboard</Link>
    </div>
  );
};

export default SymptomCheckIn;
