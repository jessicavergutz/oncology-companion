import React, { useContext, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import { Link } from 'react-router-dom';

const WeeklySummary = () => {
  const context = useContext(PatientContext) || {};
  const { patient, medications = [], dailyLogs = {}, getLogByDate, notes = {}, setNotes = () => { } } = context;

  const formatDate = (isoStr) => {
    const parts = isoStr.split('-');
    if (parts.length !== 3) return isoStr;
    const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Medication adherence
  const medTaken = medications.filter(m => m.taken).length;
  const medTotal = medications.length;
  const medAdherence = medTotal ? Math.round((medTaken / medTotal) * 100) : 0;

  // Compute last 7 days overview
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().split('T')[0];
    const log = getLogByDate(iso);
    const hasSymptom = log.symptoms.length > 0 && log.symptoms.some(s => s.symptom !== 'No symptoms');
    const hasNoSymptom = log.symptoms.some(s => s.symptom === 'No symptoms');
    const status = hasSymptom ? 'symptom' : (hasNoSymptom || log.checkIn.symptomsDone) ? 'no-symptom' : 'missing';
    return { date: iso, status, log };
  }); // most recent first

  const hydrationDaysMet = last7Days.filter(d => d.log.hydration.consumedLiters >= d.log.hydration.goalLiters && d.log.hydration.goalLiters > 0).length;
  const hydrationAdherence = Math.round((hydrationDaysMet / 7) * 100);

  // Symptom frequency map (excluding 'No symptoms' entries)
  const symptomCounts = {};
  last7Days.forEach(d => {
    d.log.symptoms.forEach(s => {
      if (s.symptom !== 'No symptoms') {
        symptomCounts[s.symptom] = (symptomCounts[s.symptom] || 0) + 1;
      }
    });
  });

  // Handle notes field changes for structured prompts
  const handleNotesChange = (field) => (e) => {
    setNotes((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Ensure notes is an object (fallback to default structure)
  const notesObj = typeof notes === 'object' && notes !== null ? notes : { questions: '', symptoms: '', worse: '', medication: '' };

  const todayDate = new Date().toISOString().split('T')[0];
  const todayLog = getLogByDate(todayDate);
  const noSymptomsToday = todayLog.symptoms.some(s => s.symptom === 'No symptoms') || (todayLog.checkIn.symptomsDone && todayLog.symptoms.length === 0);

  // Generate simple summary language
  const mostFrequentSymptom = Object.entries(symptomCounts).reduce((a, b) => (b[1] > a[1] ? b : a), ['', 0])[0];
  const summaryLines = [];
  if (mostFrequentSymptom) {
    summaryLines.push(`This week the patient most frequently logged ${mostFrequentSymptom}.`);
  }
  if (noSymptomsToday) {
    summaryLines.push('No symptoms were reported today.');
  }
  // Count symptom‑free days (no‑symptom status)
  const symptomFreeDays = last7Days.filter(d => d.status === 'no-symptom').length;
  if (symptomFreeDays) {
    summaryLines.push(`${symptomFreeDays} day${symptomFreeDays > 1 ? 's' : ''} without symptoms.`);
  }
  summaryLines.push(`Hydration goal was met on ${hydrationAdherence}% of the target.`);
  summaryLines.push(`Medication adherence: ${medAdherence}% (${medTaken} of ${medTotal} taken).`);

  // Warning / pattern detection
  const warnings = [];

  // Export report using browser print natively
  const exportReport = () => {
    window.print();
  };
  if (symptomCounts['nausea'] && symptomCounts['nausea'] > 1) warnings.push('Repeated nausea reported.');
  if (symptomCounts['diarrhea'] && symptomCounts['diarrhea'] > 1) warnings.push('Repeated diarrhea reported.');
  if (hydrationAdherence < 50) warnings.push('Low hydration consistency.');
  if (medAdherence < 100) warnings.push('Missed medication doses.');
  if (symptomCounts['fever']) warnings.push('Fever reported – consider urgent follow‑up.');

  return (
    <div className="container weekly-summary">
      <div className="report-header" style={{ marginBottom: '2.5rem', paddingBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.85rem', color: 'var(--color-primary-text)' }}>Weekly Report</h1>
          <button className="export-button no-print" onClick={exportReport} style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', padding: '0.6rem 1.25rem', borderRadius: '24px', fontWeight: 600, color: 'var(--color-primary)' }}>Print</button>
        </div>
        <div className="report-meta card" style={{ padding: '1.5rem', margin: 0, display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', color: 'var(--color-text)', fontSize: '0.95rem', background: 'var(--color-bg)', boxShadow: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ color: 'var(--color-text-light)' }}>Patient</strong> <span style={{ fontWeight: 600 }}>{patient?.name || 'Jane Doe'}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ color: 'var(--color-text-light)' }}>Dates</strong> <span style={{ fontWeight: 600 }}>{formatDate(last7Days[last7Days.length - 1].date)} – {formatDate(last7Days[0].date)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{ color: 'var(--color-text-light)' }}>Generated</strong> <span style={{ fontWeight: 600 }}>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
        </div>
      </div>

      {/* Day‑by‑Day Symptom Overview */}
      <section className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <h2 style={{ padding: '1.75rem 1.75rem 0.5rem', margin: 0, fontSize: '1.25rem' }}>Daily Symptom Overview</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {last7Days.map((d, idx) => (
            <div key={d.date} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.75rem', borderBottom: idx < last7Days.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{formatDate(d.date)}</span>
              {d.status === 'symptom' && <span className="badge badge-symptom">Symptoms Reported</span>}
              {d.status === 'no-symptom' && <span className="badge badge-no-symptom">No symptoms</span>}
              {d.status === 'missing' && <span className="badge badge-missing">Missing</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Generated Summary Block */}
      <section className="card summary" style={{ background: 'var(--color-guidance-bg)', boxShadow: 'none' }}>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem' }}>Automated Analysis</h2>
        {summaryLines.map((line, idx) => (
          <p key={idx} style={{ margin: '0 0 0.5rem 0', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--color-primary)' }}>•</span> <span style={{ color: 'var(--color-text)' }}>{line}</span></p>
        ))}
      </section>

      {/* Symptom Frequency */}
      <section className="card">
        <h2 style={{ margin: '0 0 1.25rem 0', fontSize: '1.25rem' }}>Frequent Symptoms</h2>
        {Object.keys(symptomCounts).length === 0 ? (
          <p style={{ color: 'var(--color-text-light)' }}>No symptoms logged this week.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {Object.entries(symptomCounts).map(([symptom, count]) => (
              <div key={symptom} style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--color-bg)', padding: '1rem 1.25rem', borderRadius: '16px' }}>
                 <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>{symptom}</span>
                 <span style={{ fontWeight: 700, color: 'var(--color-danger)' }}>{count} logs</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Medication Adherence */}
      <section className="card">
        <h2>Medication Adherence</h2>
        <p>{medTaken} / {medTotal} taken ({medAdherence}%)</p>
      </section>

      {/* Hydration Consistency */}
      <section className="card">
        <h2>Hydration Consistency</h2>
        <p>{hydrationDaysMet} of 7 days met ({hydrationAdherence}%)</p>
      </section>

      {/* Warning / Pattern Section */}
      {warnings.length > 0 && (
        <section className="card warnings">
          <h2>Discussion Flags</h2>
          <ul>
            {warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Nurse Discussion Notes */}
      <section className="card notes">
        <h2>Notes / Questions for Nurse</h2>
        <div className="no-print">
          <label>
            Questions for my nurse:<br />
            <textarea rows="2" value={notesObj.questions} onChange={handleNotesChange('questions')} placeholder="Any questions..." />
          </label>
          <label>
            Symptoms I want to mention:<br />
            <textarea rows="2" value={notesObj.symptoms} onChange={handleNotesChange('symptoms')} placeholder="Symptoms..." />
          </label>
          <label>
            What felt worse this week:<br />
            <textarea rows="2" value={notesObj.worse} onChange={handleNotesChange('worse')} placeholder="Worse experiences..." />
          </label>
          <label>
            Medication concerns:<br />
            <textarea rows="2" value={notesObj.medication} onChange={handleNotesChange('medication')} placeholder="Medication issues..." />
          </label>
        </div>
        <div className="print-only">
          {(!notesObj.questions && !notesObj.symptoms && !notesObj.worse && !notesObj.medication) ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No notes provided.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {notesObj.questions && <div><strong>Questions for my nurse:</strong><p style={{ margin: '0.25rem 0 0 0' }}>{notesObj.questions}</p></div>}
              {notesObj.symptoms && <div><strong>Symptoms I want to mention:</strong><p style={{ margin: '0.25rem 0 0 0' }}>{notesObj.symptoms}</p></div>}
              {notesObj.worse && <div><strong>What felt worse this week:</strong><p style={{ margin: '0.25rem 0 0 0' }}>{notesObj.worse}</p></div>}
              {notesObj.medication && <div><strong>Medication concerns:</strong><p style={{ margin: '0.25rem 0 0 0' }}>{notesObj.medication}</p></div>}
            </div>
          )}
        </div>
      </section>

      <div className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem', alignItems: 'center' }}>
        <button className="export-button" onClick={exportReport} style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>Print / Save PDF</button>
        <Link to="/" className="back-link" style={{ color: '#666' }}>← Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default WeeklySummary;
