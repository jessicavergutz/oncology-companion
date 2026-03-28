import React, { useContext } from 'react';
import { PatientContext } from '../context/PatientContext';
import { Link } from 'react-router-dom';

const HydrationReminders = () => {
  const { hydration, logHydration } = useContext(PatientContext);

  const todayDate = new Date().toISOString().split('T')[0];
  const todayHydration = (hydration || []).find(h => h.date === todayDate) || { goalLiters: 2.5, consumedLiters: 0 };

  const addWater = (liters) => {
    logHydration(liters);
  };

  const progress = Math.min(100, (todayHydration.consumedLiters / todayHydration.goalLiters) * 100);

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2rem', marginTop: '1rem' }}>
        <h1 style={{ color: 'var(--color-primary-text)', fontSize: '1.75rem', marginBottom: '0.25rem' }}>Hydration Tracker</h1>
        <p style={{ color: 'var(--color-text-light)', margin: 0 }}>Log your water intake for today.</p>
      </div>
      <section className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>{todayHydration.consumedLiters.toFixed(2)} L / {todayHydration.goalLiters} L</h3>
        <div className="progress-bar" style={{ width: '100%', marginBottom: '2rem' }}>
          <div style={{ width: `${progress}%` }} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => addWater(0.25)} className="primary-action-button" style={{ width: 'auto', padding: '0.5rem 1.5rem', background: 'var(--color-primary-light)', color: 'var(--color-primary-text)' }}>
            + 250 ml
          </button>
          <button onClick={() => addWater(0.5)} className="primary-action-button" style={{ width: 'auto', padding: '0.5rem 1.5rem' }}>
            + 500 ml
          </button>
        </div>
      </section>
    </div>
  );
};

export default HydrationReminders;
