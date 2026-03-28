import React, { useContext, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import { Link } from 'react-router-dom';
import { Lightbulb, Pill, Droplet, ClipboardList, CheckCircle2, Calendar, Activity, Heart, Wind } from 'lucide-react';

const Health = () => {
  const { appointments, medications, dailyLogs, getTodayLog, logVitals } = useContext(PatientContext);

  const [sysInput, setSysInput] = useState('');
  const [diaInput, setDiaInput] = useState('');

  const todayDate = new Date().toISOString().split('T')[0];
  const todayLog = getTodayLog();
  const symptomCheckedToday = todayLog.checkIn.symptomsDone;

  const handleSaveVitals = () => {
    if (sysInput && diaInput) {
      logVitals(parseInt(sysInput, 10), parseInt(diaInput, 10));
      setSysInput('');
      setDiaInput('');
    }
  };
  const latestVitals = todayLog.vitals;

  const todayHydration = todayLog.hydration;
  const hydrationProgress = Math.min(
    100,
    ((todayHydration.consumedLiters || 0) / (todayHydration.goalLiters || 1)) * 100
  );
  const lowHydration = hydrationProgress < 50;
  
  let totalDoses = 0;
  let takenDoses = 0;

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

  const insights = [];
  const msInDay = 24 * 60 * 60 * 1000;
  const recentLogs = Object.keys(dailyLogs)
    .filter(date => {
      const days = (new Date(todayDate) - new Date(date)) / msInDay;
      return days >= 0 && days <= 2;
    })
    .map(date => dailyLogs[date]);

  const lowMoodCount = recentLogs.filter(l => l.mood === 'Low' || l.mood === 'Overwhelmed').length;
  if (lowMoodCount >= 2) insights.push("You've been feeling low recently. Gentle activity may help today.");
  const poorSleepCount = recentLogs.filter(l => l.sleep === 'Difficulty sleeping' || l.sleep === "Didn't sleep well").length;
  if (poorSleepCount >= 2) insights.push("Sleep has been tough. Try a calming tea before bed.");
  const todayEatingState = todayLog.eating;
  if (todayEatingState === "Couldn't eat" || todayEatingState === "Felt nauseous") insights.push("Nausea detected. Slow sips of ginger water could settle things.");
  if (lowHydration) insights.push("Body fluid is running low. Drink a glass of water now if you can.");

  const activeInsights = insights.slice(0, 3);

  return (
    <div style={{ paddingBottom: '3rem' }}>
      
      {/* 1. EMOTIONAL HERO */}
      <div style={{
        background: 'linear-gradient(135deg, #8BC6B1, #AFC4D4)',
        padding: '2.5rem 1.5rem 5.5rem 1.5rem',
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(139, 198, 177, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Environmental Texture */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url('https://images.unsplash.com/photo-1495908333432-0ed4e08cf4fb?auto=format&fit=crop&w=800&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, mixBlendMode: 'overlay', pointerEvents: 'none' }}></div>

        {/* Organic Animations */}
        <Activity size={260} strokeWidth={0.5} style={{ position: 'absolute', top: '-10%', right: '-15%', opacity: 0.15, color: 'white', animation: 'float 8s ease-in-out infinite' }} />
        <Wind size={180} strokeWidth={0.5} style={{ position: 'absolute', bottom: '-10%', left: '-5%', opacity: 0.1, color: 'var(--color-primary-text)', animation: 'float-reverse 10s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '10%', right: '20%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.3)', filter: 'blur(40px)', borderRadius: '50%', animation: 'float 9s infinite ease-in-out' }}></div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px', width: '100%', marginTop: '1rem' }}>
          <h1 style={{ color: 'var(--color-primary-text)', fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 800, letterSpacing: '-1px' }}>
            Your Body
          </h1>
          <p style={{ color: 'var(--color-text)', margin: 0, fontSize: '1.15rem', fontWeight: 600 }}>
            Listen to what it needs today.
          </p>
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 20, marginTop: '-4rem', paddingTop: 0 }}>
        
        {/* Floating Metrics Row Overlapping Hero */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '3rem' }}>
          
          <Link to="/hydration" style={{ background: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: '32px', boxShadow: '0 16px 40px rgba(42,60,53,0.08)', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.3s ease' }} className="interactive-card">
            <div style={{ background: lowHydration ? 'var(--color-alert-bg)' : 'var(--color-primary-light)', padding: '1rem', borderRadius: '50%', color: lowHydration ? 'var(--color-warning)' : 'var(--color-primary)', marginBottom: '0.5rem' }}>
              <Droplet size={36} strokeWidth={2}/>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-primary-text)', lineHeight: 1 }}>
              {hydrationProgress.toFixed(0)}<span style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>%</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Hydration</p>
          </Link>

          <div style={{ background: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: '32px', boxShadow: '0 16px 40px rgba(42,60,53,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.3s ease' }}>
            <div style={{ background: 'rgba(175, 196, 212, 0.2)', padding: '1rem', borderRadius: '50%', color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>
              <Heart size={36} strokeWidth={2}/>
            </div>
            {latestVitals && (latestVitals.systolic || latestVitals.diastolic) ? (
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary-text)', lineHeight: 1, marginTop: '0.6rem' }}>
                {latestVitals.systolic}/{latestVitals.diastolic}
              </div>
            ) : (
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-light)', marginTop: '0.75rem' }}>Pending</div>
            )}
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-light)', fontWeight: 600 }}>BP Vitals</p>
            
            {(!latestVitals || !latestVitals.systolic) && (
              <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem', width: '100%' }}>
                <input type="number" placeholder="Sys" value={sysInput} onChange={(e) => setSysInput(e.target.value)} style={{ width: '50%', padding: '0.5rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--color-bg)', fontSize: '0.9rem', textAlign: 'center', fontWeight: 600 }} />
                <input type="number" placeholder="Dia" value={diaInput} onChange={(e) => setDiaInput(e.target.value)} style={{ width: '50%', padding: '0.5rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--color-bg)', fontSize: '0.9rem', textAlign: 'center', fontWeight: 600 }} />
                {sysInput && diaInput && (
                  <button onClick={handleSaveVitals} style={{ position: 'absolute', bottom: '-15px', background: 'var(--color-primary)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '20px', fontWeight: 700, border: 'none', boxShadow: '0 4px 12px rgba(111,174,156,0.25)', cursor: 'pointer' }}>OK</button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* AI Insights Bubbles */}
        {activeInsights.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary-text)', marginBottom: '1.25rem', marginLeft: '0.5rem', letterSpacing: '-0.5px' }}>Body Signals</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeInsights.map((insight, idx) => (
                <div key={idx} style={{ padding: '1.5rem', background: 'linear-gradient(135deg, var(--color-bg), var(--color-card-bg))', borderRadius: '28px', color: 'var(--color-text)', display: 'flex', gap: '1.25rem', alignItems: 'center', boxShadow: '0 12px 32px rgba(42, 60, 53, 0.04)' }}>
                  <div style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '1rem', borderRadius: '20px' }}>
                     <Lightbulb size={28} strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.4 }}>{insight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Floating Action Alerts */}
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary-text)', marginBottom: '1.25rem', marginLeft: '0.5rem', letterSpacing: '-0.5px' }}>Attention Needed</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          {pendingDosesCount > 0 && (
            <div style={{ background: 'var(--color-alert-bg)', padding: '1.5rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 8px 16px rgba(210, 156, 156, 0.15)' }}>
              <Pill size={28} color="var(--color-danger)" strokeWidth={2.5}/>
              <span style={{ color: 'var(--color-danger)', fontSize: '1.1rem', fontWeight: 700 }}>{pendingDosesCount} pending dose(s).</span>
            </div>
          )}
          {lowHydration && (
            <div style={{ background: '#FDF9F4', padding: '1.5rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 8px 16px rgba(203, 164, 116, 0.15)' }}>
              <Droplet size={28} color="var(--color-warning)" strokeWidth={2.5}/>
              <span style={{ color: 'var(--color-warning)', fontSize: '1.1rem', fontWeight: 700 }}>Hydration low. Drink water.</span>
            </div>
          )}
          {!symptomCheckedToday && (
            <div style={{ background: 'var(--color-primary-light)', padding: '1.5rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 8px 16px rgba(111, 174, 156, 0.15)' }}>
              <ClipboardList size={28} color="var(--color-primary)" strokeWidth={2.5}/>
              <span style={{ color: 'var(--color-primary-text)', fontSize: '1.1rem', fontWeight: 700 }}>Log symptoms today.</span>
            </div>
          )}
          {pendingDosesCount === 0 && !lowHydration && symptomCheckedToday && (
            <div style={{ background: 'var(--color-primary-light)', padding: '1.5rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CheckCircle2 size={28} color="var(--color-success)" strokeWidth={2.5}/>
              <span style={{ color: 'var(--color-success)', fontSize: '1.1rem', fontWeight: 700 }}>All checks complete!</span>
            </div>
          )}
        </div>

        {/* Embedded Next Appointment Bubble */}
        {(() => {
          if (!appointments || appointments.length === 0) return null;
          const now = new Date().getTime();
          const futureAppts = appointments.filter(a => new Date(`${a.date}T${a.time || '00:00'}`).getTime() >= now - (24 * 60 * 60 * 1000));
          if (futureAppts.length === 0) return null;
          futureAppts.sort((a, b) => new Date(`${a.date}T${a.time || '00:00'}`).getTime() - new Date(`${b.date}T${b.time || '00:00'}`).getTime());
          const nextAppt = futureAppts[0];
          return (
            <div style={{ background: 'var(--color-bg)', padding: '1.5rem', borderRadius: '32px', border: '2px dashed var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Upcoming</span>
                <p style={{ margin: '0.25rem 0 0 0', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-primary-text)' }}>{nextAppt.title}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Calendar size={28} color="var(--color-primary)" strokeWidth={2} style={{ marginBottom: '0.25rem' }}/>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)' }}>{new Date(`${nextAppt.date}T${nextAppt.time || '00:00'}`).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
};

export default Health;
