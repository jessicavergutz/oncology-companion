import React, { useContext, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import { Link } from 'react-router-dom';

const MedicationReminders = () => {
  const { medications, dailyLogs, getTodayLog, toggleMedicationPeriod, addMedication, deleteMedication } = useContext(PatientContext);

  const [medName, setMedName] = useState('');
  const [medDose, setMedDose] = useState('');
  const [medPeriods, setMedPeriods] = useState({ morning: false, afternoon: false, night: false });

  const handleAddMed = (e) => {
    e.preventDefault();
    if (!medName || !medDose) return;
    const selectedPeriods = Object.keys(medPeriods).filter(p => medPeriods[p]);
    if (selectedPeriods.length === 0) return alert('Select at least one period');
    
    addMedication({ name: medName, dose: medDose, periods: selectedPeriods });
    setMedName('');
    setMedDose('');
    setMedPeriods({ morning: false, afternoon: false, night: false });
  };

  const togglePeriodConfig = (period) => {
    setMedPeriods(prev => ({ ...prev, [period]: !prev[period] }));
  };

  const todayDate = new Date().toISOString().split('T')[0];
  const todayLog = getTodayLog();
  const todayMedLogs = todayLog.medicationLogs;

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ marginBottom: '1.5rem', color: '#333' }}>Medication Reminders</h1>
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {medications.map(m => (
            <li key={m.id} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
              <div style={{ fontWeight: 600, fontSize: '1.2rem', color: '#333' }}>
                {m.name} <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem' }}>({m.dose})</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {m.periods && (Array.isArray(m.periods) ? m.periods : Object.keys(m.periods)).map((period) => {
                  const isTaken = todayMedLogs.some(log => log.medId === m.id && log.period === period);
                  return (
                    <button 
                      key={period}
                      onClick={() => toggleMedicationPeriod(m.id, period)}
                      style={{
                        background: isTaken ? '#c3e6cb' : '#fcfcfc',
                        color: isTaken ? '#155724' : '#333',
                        border: isTaken ? '1px solid #28a745' : '1px solid #ccc',
                        borderRadius: '24px',
                        padding: '0.5rem 1rem',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                      <span style={{ fontWeight: isTaken ? 'bold' : 'normal', color: isTaken ? '#155724' : '#888' }}>
                        {isTaken ? '✓ Taken' : 'Pending'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>

        <section className="card" style={{ marginTop: '3rem', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--color-primary-text)' }}>Manage Medications</h3>
          
          {medications.length === 0 ? (
            <p style={{ color: 'var(--color-text-light)' }}>No medications active.</p>
          ) : (
            <ul style={{ padding: 0, listStyle: 'none' }}>
              {medications.map(m => (
                <li key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--color-primary-text)' }}>{m.name} ({m.dose})</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: '0.25rem', textTransform: 'capitalize' }}>Doses: {m.periods.join(', ')}</div>
                  </div>
                  <button onClick={() => deleteMedication(m.id)} style={{ background: 'var(--color-alert-bg)', color: 'var(--color-danger)', border: 'none', borderRadius: '16px', fontSize: '0.8rem', padding: '0.4rem 0.8rem', cursor: 'pointer' }}>Remove</button>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleAddMed} style={{ marginTop: '2rem', background: 'var(--color-bg)', padding: '1.5rem', borderRadius: '16px' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text)' }}>Add Medication</h4>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <input type="text" placeholder="Name (e.g. Ondansetron)" value={medName} onChange={e => setMedName(e.target.value)} style={{ padding: '0.75rem', flex: 2, minWidth: '150px', borderRadius: '12px', border: '1px solid var(--color-border)' }} />
              <input type="text" placeholder="Dose (e.g. 5mg)" value={medDose} onChange={e => setMedDose(e.target.value)} style={{ padding: '0.75rem', flex: 1, minWidth: '100px', borderRadius: '12px', border: '1px solid var(--color-border)' }} />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {['morning', 'afternoon', 'night'].map(p => (
                <button 
                  type="button" 
                  key={p} 
                  onClick={() => togglePeriodConfig(p)}
                  style={{ background: medPeriods[p] ? 'var(--color-primary)' : 'var(--color-card-bg)', color: medPeriods[p] ? 'white' : 'var(--color-primary-text)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer', textTransform: 'capitalize' }}
                >
                  {p}
                </button>
              ))}
            </div>
            <button type="submit" className="primary-action-button" style={{ borderRadius: '12px', padding: '0.75rem 1.5rem', width: 'auto', border: 'none', cursor: 'pointer' }}>Save Medication</button>
          </form>
        </section>
        <Link to="/" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>← Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default MedicationReminders;
