import React, { useContext } from 'react';
import { PatientContext } from '../context/PatientContext';
import { Link } from 'react-router-dom';
import { Smile, Frown, Activity, CloudLightning, Coffee, Utensils, Ban, Wind, Moon, Cloud, Clock, CloudRain, CheckCircle2, Heart } from 'lucide-react';

const CheckIn = () => {
  const { getTodayLog, logMood, logEating, logSleep } = useContext(PatientContext);

  const todayLog = getTodayLog();
  const symptomCheckedToday = todayLog.checkIn.symptomsDone;
  const todayMood = todayLog.mood;
  const todayEating = todayLog.eating;
  const todaySleep = todayLog.sleep;

  const moodOptions = [
    { label: 'Good', icon: <Smile size={32} strokeWidth={2} /> },
    { label: 'Okay', icon: <Cloud size={32} strokeWidth={2} /> },
    { label: 'Low', icon: <Frown size={32} strokeWidth={2} /> },
    { label: 'Overwhelmed', icon: <CloudLightning size={32} strokeWidth={2} /> }
  ];
  
  const eatingOptions = [
    { label: 'Ate normally', icon: <Utensils size={32} strokeWidth={2} /> },
    { label: 'Ate a little', icon: <Coffee size={32} strokeWidth={2} /> },
    { label: "Couldn't eat", icon: <Ban size={32} strokeWidth={2} /> },
    { label: 'Felt nauseous', icon: <Wind size={32} strokeWidth={2} /> }
  ];
  
  const sleepOptions = [
    { label: 'Slept well', icon: <Moon size={32} strokeWidth={2} /> },
    { label: 'Light sleep', icon: <Cloud size={32} strokeWidth={2} /> },
    { label: 'Difficulty sleeping', icon: <Clock size={32} strokeWidth={2} /> },
    { label: "Didn't sleep well", icon: <CloudRain size={32} strokeWidth={2} /> }
  ];

  const renderGrid = (options, currentValue, logFunction) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '3rem' }}>
      {options.map(opt => {
        const isSelected = currentValue === opt.label;
        return (
          <button
            key={opt.label}
            onClick={() => logFunction(opt.label)}
            style={{
              background: isSelected ? 'var(--color-primary)' : 'var(--color-card-bg)',
              color: isSelected ? 'white' : 'var(--color-primary-text)',
              border: 'none',
              borderRadius: '32px',
              padding: '1.75rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease, background 0.3s ease',
              boxShadow: isSelected ? '0 16px 32px rgba(111, 174, 156, 0.35)' : '0 12px 28px rgba(42, 60, 53, 0.04)',
              cursor: 'pointer'
            }}
          >
            <div style={{ 
              background: isSelected ? 'rgba(255,255,255,0.2)' : 'var(--color-primary-light)', 
              color: isSelected ? 'white' : 'var(--color-primary)', 
              padding: '1.15rem', 
              borderRadius: '50%',
              marginBottom: '0.25rem',
              transition: 'all 0.3s ease'
            }}>
              {opt.icon}
            </div>
            <span style={{ fontSize: '0.95rem', fontWeight: isSelected ? 800 : 700, textAlign: 'center', lineHeight: 1.2, letterSpacing: '-0.3px' }}>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* 1. VISUAL HERO SECTION */}
      <div style={{
        background: 'linear-gradient(135deg, #AFC4D4, #E9EFE8)',
        padding: '2.5rem 1.5rem 5rem 1.5rem',
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(175, 196, 212, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Environmental Texture */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url('https://images.unsplash.com/photo-1495908333432-0ed4e08cf4fb?auto=format&fit=crop&w=800&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, mixBlendMode: 'overlay', pointerEvents: 'none' }}></div>

        {/* Organic Animations */}
        <Heart size={300} strokeWidth={0.5} style={{ position: 'absolute', top: '-25%', right: '-15%', opacity: 0.15, color: 'var(--color-primary-text)', animation: 'float-reverse 8s ease-in-out infinite' }} />
        <Activity size={200} strokeWidth={0.5} style={{ position: 'absolute', bottom: '-15%', left: '-10%', opacity: 0.12, color: 'var(--color-primary-text)', animation: 'float 10s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '0', right: '10%', width: '250px', height: '250px', background: 'rgba(255,255,255,0.5)', filter: 'blur(40px)', borderRadius: '50%', animation: 'float 7s infinite ease-in-out' }}></div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px', width: '100%', marginTop: '1rem' }}>
          <h1 style={{ color: 'var(--color-primary-text)', fontSize: '2.6rem', marginBottom: '0.5rem', fontWeight: 800, letterSpacing: '-1px' }}>
            Reflection
          </h1>
          <p style={{ color: 'var(--color-text)', margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>
            Take a moment for yourself.
          </p>
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 20, marginTop: '-3rem', paddingTop: 0 }}>
        
        {/* Symptom Tracker Link as Overlapping Premium Card */}
        <Link to="/symptoms" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.75rem', textDecoration: 'none', background: symptomCheckedToday ? 'var(--color-primary-light)' : 'var(--color-card-bg)', borderRadius: '28px', boxShadow: '0 16px 40px rgba(42, 60, 53, 0.08)', marginBottom: '3rem', border: 'none', transition: 'transform 0.3s ease' }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <div style={{ background: symptomCheckedToday ? 'rgba(255,255,255,0.7)' : 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '1.15rem', borderRadius: '22px' }}>
               {symptomCheckedToday ? <CheckCircle2 size={36} strokeWidth={2.5}/> : <Activity size={36} strokeWidth={2.5}/>}
            </div>
            <div>
              <h2 style={{ color: 'var(--color-primary-text)', margin: '0 0 0.25rem 0', fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Symptoms Log</h2>
              <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: symptomCheckedToday ? 'var(--color-primary)' : 'var(--color-text-light)' }}>
                {symptomCheckedToday ? '✓ Recorded for today' : 'Tap to record symptoms'}
              </p>
            </div>
          </div>
        </Link>

        {/* Floating Grids completely unbound by card wrappers */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary-text)', marginBottom: '1.25rem', marginLeft: '0.5rem', letterSpacing: '-0.5px' }}>Mood & Energy</h2>
        {renderGrid(moodOptions, todayMood, logMood)}

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary-text)', marginBottom: '1.25rem', marginLeft: '0.5rem', letterSpacing: '-0.5px' }}>Eating & Digestion</h2>
        {renderGrid(eatingOptions, todayEating, logEating)}

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary-text)', marginBottom: '1.25rem', marginLeft: '0.5rem', letterSpacing: '-0.5px' }}>Sleep Quality</h2>
        {renderGrid(sleepOptions, todaySleep, logSleep)}

      </div>
    </div>
  );
};

export default CheckIn;
