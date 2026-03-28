import React, { useContext, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const {
    patient,
    medications,
    dailyLogs,
    getTodayLog
  } = useContext(PatientContext);

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const todayDate = new Date().toISOString().split('T')[0];
  const todayLog = getTodayLog();

  const todayMood = todayLog.mood;
  const moodOptions = ['Good', 'Okay', 'Low', 'Overwhelmed'];

  const todayEating = todayLog.eating;
  const eatingOptions = ['Ate normally', 'Ate a little', "Couldn't eat", 'Felt nauseous when eating'];

  const todaySleep = todayLog.sleep;
  const sleepOptions = ['Slept well', 'Light sleep', 'Difficulty sleeping', "Didn't sleep well"];

  const todayHydration = todayLog.hydration;
  const hydrationProgress = Math.min(
    100,
    ((todayHydration.consumedLiters || 0) / (todayHydration.goalLiters || 1)) * 100
  );
  const lowHydration = hydrationProgress < 50;

  let totalDoses = 0;
  let takenDoses = 0;

  const todayMedLogs = todayLog.medicationLogs || [];

  medications.forEach(m => {
    if (m.periods) {
      const periodArray = Array.isArray(m.periods) ? m.periods : Object.keys(m.periods);
      periodArray.forEach(period => {
        totalDoses++;
        const isTaken = todayLog.medicationLogs.some(log => log.medId === m.id && log.period === period);
        if (isTaken) takenDoses++;
      });
    }
  });

  const pendingDosesCount = totalDoses - takenDoses;

  // --- Smart Alerts Generation ---
  const smartAlerts = [];
  const msInDay = 24 * 60 * 60 * 1000;

  // 1. Medication Alerts
  if (pendingDosesCount > 1) {
    smartAlerts.push({ id: 'med-multi', type: 'critical', message: 'You have multiple pending medications. Please remember to take them when you can.' });
  } else if (pendingDosesCount === 1) {
    smartAlerts.push({ id: 'med-single', type: 'info', message: 'You have a pending medication.' });
  }

  // 2. Hydration Alerts
  if (hydrationProgress < 50) {
    if (currentTime > 14 * 60) { // After 2:00 PM
      smartAlerts.push({ id: 'hyd-late', type: 'warning', message: "It's progressing through the day and your hydration is low. Please drink some water." });
    } else {
      smartAlerts.push({ id: 'hyd-early', type: 'info', message: 'You may need to hydrate more today.' });
    }
  }

  // 3. Sleep Alerts (Recent 2 days)
  const recentLogs = Object.keys(dailyLogs)
    .filter(date => {
      const days = (new Date(todayDate) - new Date(date)) / msInDay;
      return days >= 0 && days <= 2;
    })
    .map(date => dailyLogs[date]);

  if (recentLogs.filter(l => l.sleep === 'Difficulty sleeping' || l.sleep === "Didn't sleep well").length >= 2) {
    smartAlerts.push({ id: 'sleep-poor', type: 'warning', message: 'Your recent sleep has been lower than usual. Try to rest when you can.' });
  }

  // 4. Mood Alerts (Recent 2 days)
  if (recentLogs.filter(l => l.mood === 'Low' || l.mood === 'Overwhelmed').length >= 2) {
    smartAlerts.push({ id: 'mood-low', type: 'info', message: "You've been feeling low recently. Be gentle with yourself today." });
  }

  const activeAlerts = smartAlerts.slice(0, 3);

  const symptomCheckedToday = todayLog.checkIn.symptomsDone;
  // Helper to determine today's primary action
  const getTodayAction = () => {
    if (pendingDosesCount > 0) {
      return {
        label: `Take pending medications`,
        onClick: () => null,
        buttonClass: 'primary-action-button',
        supportiveMessage: `You have ${pendingDosesCount} pending dose(s) today`,
        showButton: true,
      };
    } else if (lowHydration) {
      return {
        label: 'Drink water now',
        onClick: () => alert('Drink water now'),
        buttonClass: 'action-button',
        supportiveMessage: 'Stay hydrated – drink some water',
        showButton: true,
      };
    } else if (!symptomCheckedToday) {
      return {
        label: 'Log symptoms now',
        onClick: () => alert('Log symptoms now'),
        buttonClass: 'action-button',
        supportiveMessage: 'Log your symptoms for today',
        showButton: true,
      };
    } else {
      return {
        label: '',
        onClick: null,
        buttonClass: '',
        supportiveMessage: "You're all set for today",
        showButton: false,
      };
    }
  };
  // Medication timeline logic replaced by period tracking
  const todayAction = getTodayAction();

  const todayChecklist = [
    { label: 'Mood', completed: todayMood !== null },
    { label: 'Eating', completed: todayEating !== null },
    { label: 'Sleep', completed: todaySleep !== null },
    { label: 'Symptoms', completed: symptomCheckedToday },
    { label: 'Hydration', completed: todayHydration.consumedLiters > 0 }
  ];
  const completedCount = todayChecklist.filter(item => item.completed).length;

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2rem', marginTop: '1rem' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '1.75rem', marginBottom: '0.25rem' }}>Good morning{patient?.name ? `, ${patient.name}` : ''}</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Here is your daily overview.</p>
      </div>

      {/* SECTION: HOME */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#334155', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>Home</h2>

        {/* Today's Action Section */}
        <section className="card today-actions highlighted">
          <h3 style={{ marginTop: 0 }}>Today's Action</h3>
          {todayAction.showButton ? (
            <>
              <button className={todayAction.buttonClass} onClick={todayAction.onClick}>
                {todayAction.label}
              </button>
              <p className="supportive-message">{todayAction.supportiveMessage}</p>
            </>
          ) : (
            <p className="supportive-message">{todayAction.supportiveMessage}</p>
          )}
        </section>

        {/* Smart Alerts Section */}
        {activeAlerts.length > 0 && (
          <section style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {activeAlerts.map(alert => {
              let alertClass = 'alert alert-info';
              if (alert.type === 'critical') alertClass = 'alert alert-critical';
              if (alert.type === 'warning') alertClass = 'alert alert-warning';

              return (
                <div key={alert.id} className={alertClass} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem', border: 'none', boxShadow: 'var(--shadow-sm)' }}>
                  <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>
                    {alert.type === 'critical' ? '💊' : alert.type === 'warning' ? '💧' : '✦'}
                  </span>
                  <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 500, color: 'var(--color-primary-text)' }}>
                    {alert.message}
                  </p>
                </div>
              );
            })}
          </section>
        )}

        {/* Guided Daily Check-in */}
        <section className="card" style={{ background: 'var(--color-bg)', border: 'none', boxShadow: 'none', padding: '1rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Today's Check-in</h3>
            <span style={{ fontSize: '0.95rem', color: 'var(--color-primary-text)', fontWeight: 600, background: 'var(--color-primary-light)', padding: '0.4rem 0.75rem', borderRadius: '16px' }}>
              {completedCount} / 5 Completed
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {todayChecklist.map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.15rem 1.5rem',
                background: 'var(--color-card-bg)',
                borderRadius: '20px',
                border: item.completed ? '1.5px solid var(--color-success)' : '1px solid var(--color-border)',
                transition: 'all 0.3s ease',
                boxShadow: item.completed ? 'var(--shadow-sm)' : 'none'
              }}>
                <span style={{
                  color: item.completed ? 'var(--color-success)' : 'var(--color-text)',
                  fontWeight: item.completed ? 600 : 500,
                  fontSize: '1.05rem'
                }}>
                  {item.label}
                </span>
                <span style={{
                  color: item.completed ? 'var(--color-success)' : 'var(--color-text-light)',
                  fontSize: '0.95rem',
                  fontWeight: item.completed ? 600 : 500
                }}>
                  {item.completed ? '✓ Done' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ----- Today Overview ----- */}
        <section className="card today-overview">
          <h3 style={{ marginTop: 0 }}>Today Overview</h3>
          <div className="today-section">
            <strong>Medications Taken:</strong> {takenDoses} / {totalDoses} doses
          </div>
          <div className="today-section">
            <strong>Medications Pending:</strong> {pendingDosesCount} doses
          </div>
          <div className="today-section">
            <strong>Hydration:</strong> {hydrationProgress.toFixed(0)}% {lowHydration && '(Low)'}
          </div>
          <div className="today-section">
            <strong>Symptom Check‑in:</strong> {symptomCheckedToday ? 'Completed' : 'Pending'}
          </div>
        </section>

        {/* Today's Medications */}
        <section className="card">
          <h3 style={{ marginTop: 0 }}>Today's Medications</h3>
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {medications.map(m => (
              <li key={m.id} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ fontWeight: 600, fontSize: '1.15rem', color: 'var(--color-primary-text)' }}>{m.name} <span style={{ fontWeight: 400, color: 'var(--color-text-light)', fontSize: '0.95rem' }}>({m.dose})</span></div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                  {m.periods && (Array.isArray(m.periods) ? m.periods : Object.keys(m.periods)).map((period) => {
                    const isTaken = todayMedLogs.some(log => log.medId === m.id && log.period === period);
                    return (
                      <button
                        key={period}
                        onClick={() => toggleMedicationPeriod(m.id, period)}
                        style={{
                          background: isTaken ? 'var(--color-success)' : 'var(--color-primary-light)',
                          color: isTaken ? 'white' : 'var(--color-primary-text)',
                          border: 'none',
                          borderRadius: '24px',
                          padding: '0.6rem 1.25rem',
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: isTaken ? '0 4px 12px rgba(112, 162, 136, 0.25)' : 'none'
                        }}
                      >
                        {isTaken ? `✓ ${period.charAt(0).toUpperCase() + period.slice(1)}` : period.charAt(0).toUpperCase() + period.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>

          <Link
            to="/medications"
            style={{
              color: 'var(--color-primary)',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            View All
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;