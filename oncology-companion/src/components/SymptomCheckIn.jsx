import React, { useContext, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import { Link } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';

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
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2rem', marginTop: '1rem' }}>
        <h1 style={{ color: 'var(--color-primary-text)', fontSize: '1.85rem' }}>Symptoms</h1>
        <p style={{ color: 'var(--color-text-light)', margin: 0 }}>Log how you are feeling right now.</p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
        {symptomsList.map((s) => (
          <button 
            key={s} 
            onClick={() => handleLog(s)}
            style={{
              background: lastSymptom === s ? 'var(--color-primary)' : 'var(--color-card-bg)',
              color: lastSymptom === s ? 'white' : 'var(--color-text)',
              border: lastSymptom === s ? 'none' : '1px solid var(--color-border)',
              borderRadius: '20px',
              padding: '1.25rem 1.5rem',
              fontSize: '1.1rem',
              fontWeight: lastSymptom === s ? 700 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: lastSymptom === s ? '0 8px 16px rgba(112, 162, 136, 0.25)' : 'var(--shadow-sm)',
              width: '100%',
              textAlign: 'left'
            }}
          >
            {s}
            <span style={{ fontSize: '1.25rem', color: lastSymptom === s ? 'white' : 'var(--color-primary-text)' }}>›</span>
          </button>
        ))}
        <button 
          onClick={handleNoSymptoms}
          style={{
            background: lastSymptom === 'No symptoms' ? 'var(--color-success)' : 'transparent',
            color: lastSymptom === 'No symptoms' ? 'white' : 'var(--color-success)',
            border: lastSymptom === 'No symptoms' ? 'none' : '1px solid var(--color-success)',
            borderRadius: '20px',
            padding: '1.25rem 1.5rem',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: lastSymptom === 'No symptoms' ? '0 8px 16px rgba(103, 158, 130, 0.25)' : 'none',
            marginTop: '1rem',
            width: '100%'
          }}
        >
          {lastSymptom === 'No symptoms' ? '✓ Logged: No symptoms' : 'I feel fine today'}
        </button>
      </div>

      {lastSymptom && lastSymptom !== 'No symptoms' && (
        <section className="card" style={{ background: 'var(--color-guidance-bg)', border: 'none', boxShadow: 'none' }}>
          <h2 style={{ fontSize: '1.25rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-primary-text)' }}>
            <span style={{ display: 'flex', alignItems: 'center', color: 'var(--color-warning)' }}><Lightbulb size={24} strokeWidth={2.5}/></span> Guidance
          </h2>
          <p style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text)' }}>{symptomGuidance[lastSymptom]}</p>
        </section>
      )}
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/checkin" style={{ fontWeight: 600, color: 'var(--color-text-light)', display: 'inline-block', padding: '1rem' }}>
          ← Back to Daily Check-In
        </Link>
      </div>
    </div>
  );
};

export default SymptomCheckIn;
