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
      <div className="report-header" style={{ marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0 }}>Weekly Symptom Report</h1>
          <button className="export-button no-print" onClick={exportReport}>Print / PDF</button>
        </div>
        <div className="report-meta" style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', color: '#555' }}>
          <div><strong>Patient:</strong> {patient?.name || 'Jane Doe'}</div>
          <div><strong>Week:</strong> {formatDate(last7Days[last7Days.length - 1].date)} – {formatDate(last7Days[0].date)}</div>
          <div><strong>Generated on:</strong> {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
        </div>
      </div>

      {/* Day‑by‑Day Symptom Overview */}
      <section className="card">
        <h2>Daily Symptom Status</h2>
        <ul style={{ padding: 0, margin: 0 }}>
          {last7Days.map((d) => (
            <li key={d.date} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '0.5rem' }}>
              <span style={{ fontWeight: 500 }}>{formatDate(d.date)}</span>
              {d.status === 'symptom' && <span className="badge badge-symptom">Symptoms</span>}
              {d.status === 'no-symptom' && <span className="badge badge-no-symptom">No symptoms</span>}
              {d.status === 'missing' && <span className="badge badge-missing">No check-in</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* Generated Summary Block */}
      <section className="card summary">
        <h2>Summary</h2>
        {summaryLines.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </section>

      {/* Symptom Frequency */}
      <section className="card">
        <h2>Symptom Frequency</h2>
        {Object.keys(symptomCounts).length === 0 ? (
          <p>No symptoms logged this week.</p>
        ) : (
          <ul>
            {Object.entries(symptomCounts).map(([symptom, count]) => (
              <li key={symptom}>{symptom}: {count} time{count > 1 ? 's' : ''}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Symptom Severity Placeholder */}
      <section className="card severity">
        <h2>Symptom Severity</h2>
        <p>Severity data not yet available.</p>
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
