import React, { useContext } from 'react';
import { PatientContext } from '../context/PatientContext';
import { Link } from 'react-router-dom';

const CheckIn = () => {
  const { getTodayLog, logMood, logEating, logSleep } = useContext(PatientContext);

  const todayLog = getTodayLog();
  const symptomCheckedToday = todayLog.checkIn.symptomsDone;
  const todayMood = todayLog.mood;
  const todayEating = todayLog.eating;
  const todaySleep = todayLog.sleep;

  const moodOptions = ['Good', 'Okay', 'Low', 'Overwhelmed'];
  const eatingOptions = ['Ate normally', 'Ate a little', "Couldn't eat", 'Felt nauseous'];
  const sleepOptions = ['Slept well', 'Light sleep', 'Difficulty sleeping', "Didn't sleep well"];

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2rem', marginTop: '1rem' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '1.75rem', marginBottom: '0.25rem' }}>Daily Check-in</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Log your wellness markers for today.</p>
      </div>

      <section className="card">
        <h3 style={{ marginTop: 0 }}>Symptoms</h3>
        <p style={{ color: '#666' }}>{symptomCheckedToday ? 'You have logged your symptoms today.' : 'Please log any symptoms you are experiencing.'}</p>
        <Link to="/symptoms" style={{ display: 'inline-block', marginTop: '0.5rem', fontWeight: 600 }}>Log Symptoms</Link>
      </section>

      <section className="card">
        <h3 style={{ marginTop: 0 }}>Daily Mood</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
          {moodOptions.map(m => (
            <button
              key={m}
              onClick={() => logMood(m)}
              style={{
                background: todayMood === m ? 'var(--color-primary)' : 'var(--color-primary-light)',
                color: todayMood === m ? 'white' : 'var(--color-primary-text)',
                border: 'none',
                borderRadius: '24px',
                padding: '0.6rem 1.25rem',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                boxShadow: todayMood === m ? '0 4px 12px rgba(112, 162, 136, 0.25)' : 'none'
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h3 style={{ marginTop: 0 }}>Eating Today</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
          {eatingOptions.map(e => (
            <button
              key={e}
              onClick={() => logEating(e)}
              style={{
                background: todayEating === e ? 'var(--color-primary)' : 'var(--color-primary-light)',
                color: todayEating === e ? 'white' : 'var(--color-primary-text)',
                border: 'none',
                borderRadius: '24px',
                padding: '0.6rem 1.25rem',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                boxShadow: todayEating === e ? '0 4px 12px rgba(112, 162, 136, 0.25)' : 'none'
              }}
            >
              {e}
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h3 style={{ marginTop: 0 }}>Sleep Last Night</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
          {sleepOptions.map(sOption => (
            <button
              key={sOption}
              onClick={() => logSleep(sOption)}
              style={{
                background: todaySleep === sOption ? 'var(--color-primary)' : 'var(--color-primary-light)',
                color: todaySleep === sOption ? 'white' : 'var(--color-primary-text)',
                border: 'none',
                borderRadius: '24px',
                padding: '0.6rem 1.25rem',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                boxShadow: todaySleep === sOption ? '0 4px 12px rgba(112, 162, 136, 0.25)' : 'none'
              }}
            >
              {sOption}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CheckIn;
