import React, { useContext, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import { Link } from 'react-router-dom';
import { Pill, Droplet, AlertCircle, CheckCircle2, ChevronRight, Check, AlertTriangle, Heart, Activity, Smile, Coffee, Moon } from 'lucide-react';

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

  const getTodayAction = () => {
    if (pendingDosesCount > 0) {
      return {
        title: 'Medication Time',
        supportiveMessage: `You have ${pendingDosesCount} medication${pendingDosesCount > 1 ? 's' : ''} to take today.`,
        label: `Let's take care of this now`,
        showButton: true,
        onClick: () => null,
      };
    } else if (lowHydration) {
      return {
        title: 'Hydration Check',
        supportiveMessage: `Your body could use a little more water today.`,
        label: `Log a glass of water`,
        showButton: true,
        onClick: () => null,
      };
    } else if (!symptomCheckedToday) {
      return {
        title: 'Daily Check-in',
        supportiveMessage: `How are you feeling today? Let's do a quick check-in.`,
        label: `Start check-in`,
        showButton: true,
        onClick: () => null,
      };
    } else {
      return {
        title: 'You\'re all caught up',
        supportiveMessage: "Take some time to rest and recover. You're doing great.",
        label: '',
        showButton: false,
        onClick: null,
      };
    }
  };
  const todayAction = getTodayAction();

  const todayChecklist = [
    { label: 'Mood', completed: todayMood !== null, icon: <Smile size={18} strokeWidth={2.5}/> },
    { label: 'Eating', completed: todayEating !== null, icon: <Coffee size={18} strokeWidth={2.5}/> },
    { label: 'Sleep', completed: todaySleep !== null, icon: <Moon size={18} strokeWidth={2.5}/> },
    { label: 'Symptoms', completed: symptomCheckedToday, icon: <Activity size={18} strokeWidth={2.5}/> },
    { label: 'Hydration', completed: todayHydration.consumedLiters > 0, icon: <Droplet size={18} strokeWidth={2.5}/> }
  ];
  const completedCount = todayChecklist.filter(item => item.completed).length;

  return (
    <div style={{ paddingBottom: '3rem' }}>
      
      {/* --- LAYER 1: Deep Hero Background --- */}
      <div style={{
        background: 'linear-gradient(145deg, var(--color-primary), #8BC6B1)',
        padding: '2.5rem 1.5rem 5rem 1.5rem', /* Extra 5rem bottom creates the overlap track */
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(111, 174, 156, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Environmental Texture */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url('https://images.unsplash.com/photo-1495908333432-0ed4e08cf4fb?auto=format&fit=crop&w=800&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, mixBlendMode: 'overlay', pointerEvents: 'none' }}></div>
        
        {/* Soft Organic Floating Elements */}
        <Heart size={240} strokeWidth={0.5} style={{ position: 'absolute', top: '-15%', right: '-10%', opacity: 0.12, color: 'white', animation: 'float-reverse 8s ease-in-out infinite' }} />
        <Activity size={180} strokeWidth={0.5} style={{ position: 'absolute', bottom: '-5%', left: '-5%', opacity: 0.1, color: 'white', animation: 'float 10s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '0', left: '10%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.15)', filter: 'blur(40px)', borderRadius: '50%', animation: 'float-reverse 7s infinite ease-in-out' }}></div>

        {/* Foreground Hero Text */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px', width: '100%', marginTop: '1rem' }}>
          <h1 style={{ color: 'white', fontSize: '2.3rem', marginBottom: '0.5rem', fontWeight: 800, letterSpacing: '-1px', textShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            How are you feeling?
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.95)', margin: 0, fontSize: '1.15rem', fontWeight: 500 }}>
            {patient?.name ? `${patient.name}, l` : 'L'}et's care for you today.
          </p>
        </div>
      </div>

      {/* --- LAYER 2: Foreground Container (Pulled UP via negative margin) --- */}
      <div className="container" style={{ position: 'relative', zIndex: 20, marginTop: '-3.5rem', paddingTop: 0 }}>

        {/* The overlapping Action Card */}
        {todayAction.showButton ? (
          <button 
            className="card"
            onClick={todayAction.onClick}
            style={{ 
              background: 'var(--color-card-bg)',
              borderRadius: '24px',
              padding: '1.5rem 1.5rem',
              marginBottom: '1.5rem',
              color: 'var(--color-primary-text)',
              boxShadow: '0 16px 40px rgba(42, 60, 53, 0.12)',
              textAlign: 'left',
              width: '100%',
              border: 'none',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
               <div style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '1rem', borderRadius: '20px' }}>
                  <AlertCircle size={32} strokeWidth={2.5}/>
               </div>
               <div>
                  <h2 style={{ color: 'var(--color-primary-text)', margin: '0 0 0.25rem 0', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>{todayAction.title}</h2>
                  <p style={{ color: 'var(--color-text-light)', margin: 0, fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 }}>{todayAction.supportiveMessage}</p>
               </div>
            </div>
            <div style={{ background: 'var(--color-primary)', color: 'white', fontWeight: 700, padding: '0.85rem 1.5rem', borderRadius: '16px', fontSize: '0.95rem', boxShadow: '0 4px 12px rgba(111, 174, 156, 0.3)', flexShrink: 0, marginLeft: '1rem' }}>
              Start
            </div>
          </button>
        ) : (
          <div 
            className="card"
            style={{ 
              background: 'var(--color-card-bg)',
              borderRadius: '24px',
              padding: '1.5rem 1.5rem',
              marginBottom: '1.5rem',
              color: 'var(--color-primary-text)',
              boxShadow: '0 16px 40px rgba(42, 60, 53, 0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem'
          }}>
            <div style={{ background: 'rgba(120, 176, 151, 0.15)', color: 'var(--color-success)', padding: '1rem', borderRadius: '20px' }}>
               <CheckCircle2 size={32} strokeWidth={2.5}/>
            </div>
            <div>
              <h2 style={{ color: 'var(--color-primary-text)', margin: '0 0 0.25rem 0', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>{todayAction.title}</h2>
              <p style={{ color: 'var(--color-text-light)', margin: 0, fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 }}>{todayAction.supportiveMessage}</p>
            </div>
          </div>
        )}

        {/* Smart Alerts Section */}
        {activeAlerts.length > 0 && (
          <section style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {activeAlerts.map(alert => {
              let alertClass = 'alert alert-info';
              if (alert.type === 'critical') alertClass = 'alert alert-critical';
              if (alert.type === 'warning') alertClass = 'alert alert-warning';

              return (
                <div key={alert.id} className={alertClass} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', border: 'none', boxShadow: '0 4px 12px rgba(42, 60, 53, 0.04)', borderRadius: '16px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', color: alert.type === 'critical' ? 'var(--color-danger)' : alert.type === 'warning' ? 'var(--color-warning)' : 'var(--color-primary)', marginTop: '0.1rem' }}>
                    {alert.type === 'critical' ? <Pill size={20} strokeWidth={2.5} /> : alert.type === 'warning' ? <Droplet size={20} strokeWidth={2.5} /> : <AlertCircle size={20} strokeWidth={2.5} />}
                  </span>
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: 'inherit', lineHeight: 1.4 }}>
                    {alert.message}
                  </p>
                </div>
              );
            })}
          </section>
        )}

        <section style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.25rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Daily Check-In</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 800, background: 'var(--color-primary-light)', padding: '0.35rem 0.85rem', borderRadius: '20px' }}>
              {completedCount} / 5 Done
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {todayChecklist.map((item, idx) => (
              <div key={idx} style={{
                background: item.completed ? 'var(--color-primary)' : 'var(--color-card-bg)',
                color: item.completed ? 'white' : 'var(--color-text)',
                padding: '0.85rem 1.15rem',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontWeight: 600,
                fontSize: '0.95rem',
                boxShadow: item.completed ? '0 8px 16px rgba(111, 174, 156, 0.25)' : '0 4px 12px rgba(42, 60, 53, 0.04)',
                border: item.completed ? 'none' : '1px solid rgba(42,60,53,0.06)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }} className="interactive-card">
                <span style={{ display: 'flex', opacity: item.completed ? 1 : 0.5, color: item.completed ? 'white' : 'var(--color-primary)' }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </section>

        <section className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', padding: '1.25rem' }}>
          <h3 style={{ gridColumn: '1 / -1', margin: '0 0 0.25rem 0.25rem', fontSize: '1.2rem', fontWeight: 700 }}>Overview</h3>
          <div style={{ background: 'var(--color-bg)', padding: '1.25rem', borderRadius: '16px', border: 'none', boxShadow: 'inset 0 2px 8px rgba(42,60,53,0.02)' }}>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1.2 }}>{takenDoses}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-light)', fontWeight: 700, letterSpacing: '0.5px' }}>MEDS TAKEN</div>
          </div>
          <div style={{ background: 'var(--color-bg)', padding: '1.25rem', borderRadius: '16px', border: 'none', boxShadow: 'inset 0 2px 8px rgba(42,60,53,0.02)' }}>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: lowHydration ? 'var(--color-warning)' : 'var(--color-secondary)', lineHeight: 1.2 }}>{hydrationProgress.toFixed(0)}%</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-light)', fontWeight: 700, letterSpacing: '0.5px' }}>WATER GOAL</div>
          </div>
          <div style={{ background: 'var(--color-bg)', padding: '1.25rem', borderRadius: '16px', border: 'none', boxShadow: 'inset 0 2px 8px rgba(42,60,53,0.02)' }}>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: pendingDosesCount > 0 ? 'var(--color-danger)' : 'var(--color-primary)', lineHeight: 1.2 }}>{pendingDosesCount}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-light)', fontWeight: 700, letterSpacing: '0.5px' }}>MEDS PENDING</div>
          </div>
          <div style={{ background: 'var(--color-bg)', padding: '1.25rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: 'none', boxShadow: 'inset 0 2px 8px rgba(42,60,53,0.02)' }}>
            <div style={{ color: symptomCheckedToday ? 'var(--color-primary)' : 'var(--color-warning)', marginBottom: '0.1rem' }}>
              {symptomCheckedToday ? <CheckCircle2 size={24} strokeWidth={2.5}/> : <AlertTriangle size={24} strokeWidth={2.5}/>}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-light)', fontWeight: 700, letterSpacing: '0.5px' }}>SYMPTOM LOG</div>
          </div>
        </section>

        {/* Today's Medications */}
        <section className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.15rem' }}>Today's Medications</h3>
          <ul style={{ padding: 0, listStyle: 'none', margin: 0, marginBottom: '1rem' }}>
            {medications.map((m, idx) => (
              <li key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: idx === medications.length - 1 ? 0 : '1rem', marginBottom: idx === medications.length - 1 ? 0 : '1rem', borderBottom: idx === medications.length - 1 ? 'none' : '1px solid var(--color-border)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-primary-text)', marginBottom: '0.1rem' }}>{m.name}</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-light)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.dose}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'nowrap' }}>
                  {m.periods && (Array.isArray(m.periods) ? m.periods : Object.keys(m.periods)).map((period) => {
                    const isTaken = todayMedLogs.some(log => log.medId === m.id && log.period === period);
                    return (
                      <button
                        key={period}
                        onClick={() => toggleMedicationPeriod(m.id, period)}
                        style={{
                          background: isTaken ? 'var(--color-primary)' : 'var(--color-accent)',
                          color: isTaken ? 'white' : 'var(--color-text)',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '0.4rem 0.6rem',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: isTaken ? '0 4px 12px rgba(111, 174, 156, 0.25)' : 'inset 0 1px 2px rgba(0,0,0,0.02)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        {isTaken ? <Check size={14} strokeWidth={3}/> : <span style={{ opacity: 0.5 }}>◯</span>} {period.charAt(0).toUpperCase() + period.slice(1, 4)}
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
              textDecoration: 'none',
              fontSize: '0.9rem'
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