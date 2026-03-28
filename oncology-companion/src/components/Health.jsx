import React, { useContext, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import { Link } from 'react-router-dom';

const Health = () => {
  const { appointments, medications, dailyLogs, getTodayLog, logVitals } = useContext(PatientContext);

  const [sysInput, setSysInput] = useState('');
  const [diaInput, setDiaInput] = useState('');

  const todayDate = new Date().toISOString().split('T')[0];
  const todayLog = getTodayLog();
  const symptomCheckedToday = todayLog.checkIn.symptomsDone;

  // Vitals logic
  const handleSaveVitals = () => {
    if (sysInput && diaInput) {
      logVitals(parseInt(sysInput, 10), parseInt(diaInput, 10));
      setSysInput('');
      setDiaInput('');
    }
  };
  const latestVitals = todayLog.vitals;

  // Hydration logic
  const todayHydration = todayLog.hydration;
  const hydrationProgress = Math.min(
    100,
    ((todayHydration.consumedLiters || 0) / (todayHydration.goalLiters || 1)) * 100
  );
  const lowHydration = hydrationProgress < 50;
  
  // Medication Doses Count logic for Alerts
  let totalDoses = 0;
  let takenDoses = 0;

  medications.forEach(m => {
    if (m.periods) {
      const periodArray = Array.isArray(m.periods) ? m.periods : Object.keys(m.periods);
      periodArray.forEach(period => {
        totalDoses++;
        const isTaken = todayLog.medicationLogs.some(log => log.medId === m.id && log.period === period);
        if (isTaken) {
          takenDoses++;
        }
      });
    }
  });
  const pendingDosesCount = totalDoses - takenDoses;

  // Insights logic
  const insights = [];
  const msInDay = 24 * 60 * 60 * 1000;
  const recentLogs = Object.keys(dailyLogs)
    .filter(date => {
      const days = (new Date(todayDate) - new Date(date)) / msInDay;
      return days >= 0 && days <= 2;
    })
    .map(date => dailyLogs[date]);

  const lowMoodCount = recentLogs.filter(l => l.mood === 'Low' || l.mood === 'Overwhelmed').length;
  if (lowMoodCount >= 2) {
    insights.push("You've been feeling low recently. Consider reaching out to your care team if this persists.");
  }

  const poorSleepCount = recentLogs.filter(l => l.sleep === 'Difficulty sleeping' || l.sleep === "Didn't sleep well").length;
  if (poorSleepCount >= 2) {
    insights.push("Your sleep quality has been low. Try to rest when you can during the day.");
  }
  
  const todayEatingState = todayLog.eating;
  if (todayEatingState === "Couldn't eat" || todayEatingState === "Felt nauseous") {
    insights.push("You may be having difficulty eating today. Try small sips of water or clear broth.");
  }
  if (lowHydration) {
    insights.push("Your hydration is below recommended levels. Dehydration can worsen fatigue.");
  }
  const activeInsights = insights.slice(0, 3);

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2rem', marginTop: '1rem' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '1.75rem', marginBottom: '0.25rem' }}>Health & Status</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Review your overall medical indicators.</p>
      </div>

      {/* Smart Insights */}
      {activeInsights.length > 0 && (
        <section className="card" style={{ background: '#fcfcfc', border: '1px solid #e9ecef' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#495057' }}>Insights</h3>
          <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {activeInsights.map((insight, idx) => (
              <li key={idx} style={{ padding: '0.75rem', background: 'white', borderRadius: '8px', border: '1px solid #eee', fontSize: '0.95rem', color: '#333' }}>
                💡 {insight}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Alerts */}
      <section className="card">
        <h3 style={{ marginTop: 0, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Alerts</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {pendingDosesCount > 0 && (
            <div className="alert alert-critical" style={{ margin: 0, padding: '0.75rem', borderRadius: '8px' }}>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>You have {pendingDosesCount} pending medication dose(s). Please take them now.</p>
            </div>
          )}
          {lowHydration && (
            <div className="alert alert-warning" style={{ margin: 0, padding: '0.75rem', borderRadius: '8px' }}>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>Hydration low – try to drink more water.</p>
            </div>
          )}
          {!symptomCheckedToday && (
            <div className="alert alert-info" style={{ margin: 0, padding: '0.75rem', borderRadius: '8px' }}>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>Remember to log your symptoms today.</p>
            </div>
          )}
          {pendingDosesCount === 0 && !lowHydration && symptomCheckedToday && (
            <div className="alert alert-success" style={{ margin: 0, padding: '0.75rem', borderRadius: '8px' }}>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>No critical alerts today.</p>
            </div>
          )}
        </div>
      </section>

      {/* Vitals (Optional) */}
      <section className="card">
        <h3 style={{ marginTop: 0 }}>Vitals (Optional)</h3>
        {(latestVitals && (latestVitals.systolic || latestVitals.diastolic)) && (
          <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
            Today's reading: {latestVitals.systolic}/{latestVitals.diastolic} mmHg
          </p>
        )}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
          <input
            type="number"
            placeholder="Sys"
            value={sysInput}
            onChange={(e) => setSysInput(e.target.value)}
            style={{ width: '4rem', padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <span style={{ fontWeight: 500, color: '#666' }}>/</span>
          <input
            type="number"
            placeholder="Dia"
            value={diaInput}
            onChange={(e) => setDiaInput(e.target.value)}
            style={{ width: '4rem', padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button
            onClick={handleSaveVitals}
            style={{ marginLeft: '1rem', background: '#f0f0f0', color: 'var(--color-primary)', border: '1px solid var(--color-primary)' }}
          >
            Save Reading
          </button>
        </div>
      </section>

      {/* Hydration */}
      <section className="card">
        <h3 style={{ marginTop: 0 }}>Hydration</h3>
        <p>{(todayHydration.consumedLiters || 0).toFixed(2)} L / {(todayHydration.goalLiters || 1).toFixed(2)} L</p>
        {lowHydration && (
          <div className="alert alert-warning" style={{ marginTop: '0.5rem' }}>Hydration low – try to drink more water.</div>
        )}
        <div style={{ marginTop: '1rem' }}>
          <Link to="/hydration" style={{ fontWeight: 600 }}>Log Water</Link>
        </div>
      </section>

      {(() => {
        if (!appointments || appointments.length === 0) return null;
        const now = new Date().getTime();
        const futureAppts = appointments.filter(a => new Date(`${a.date}T${a.time || '00:00'}`).getTime() >= now - (24 * 60 * 60 * 1000));
        if (futureAppts.length === 0) return null;
        futureAppts.sort((a, b) => new Date(`${a.date}T${a.time || '00:00'}`).getTime() - new Date(`${b.date}T${b.time || '00:00'}`).getTime());
        const nextChemo = futureAppts.find(a => a.type === 'chemo');
        const nextAppt = nextChemo || futureAppts[0];
        return (
          <section className="card">
            <h3 style={{ marginTop: 0, textTransform: 'capitalize' }}>
              Next {nextAppt.type === 'chemo' ? 'Chemo' : nextAppt.type} Appointment
            </h3>
            <div>
              <p style={{ margin: '0 0 0.25rem 0', fontWeight: 600, color: 'var(--color-primary-text)' }}>
                {nextAppt.title} <span style={{ fontWeight: 400, fontSize: '0.9rem', color: 'var(--color-text-light)', background: 'var(--color-primary-light)', padding: '0.1rem 0.4rem', borderRadius: '8px' }}>{nextAppt.type}</span>
              </p>
              <p style={{ margin: 0, color: 'var(--color-text)' }}>{new Date(`${nextAppt.date}T${nextAppt.time || '00:00'}`).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <Link to="/schedule" style={{ fontWeight: 600, display: 'inline-block', marginTop: '0.75rem', color: 'var(--color-primary)', textDecoration: 'none' }}>View Full Schedule</Link>
          </section>
        );
      })() || (
          <section className="card">
            <h3 style={{ marginTop: 0 }}>Next Appointment</h3>
            <p style={{ color: 'var(--color-text-light)' }}>No future appointments scheduled.</p>
            <Link to="/schedule" style={{ fontWeight: 600, display: 'inline-block', marginTop: '0.75rem', color: 'var(--color-primary)', textDecoration: 'none' }}>View Schedule</Link>
          </section>
        )}


    </div>
  );
};

export default Health;
