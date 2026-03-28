import React, { useContext, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import { Pill, Sun, Clock, Moon, CheckCircle2, PlusCircle, Trash2, CalendarHeart } from 'lucide-react';

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

  const todayLog = getTodayLog();
  const todayMedLogs = todayLog.medicationLogs;

  const getPeriodIcon = (period) => {
    switch (period) {
      case 'morning': return <Sun size={22} />;
      case 'afternoon': return <Clock size={22} />;
      case 'night': return <Moon size={22} />;
      default: return <Pill size={22} />;
    }
  };

  return (
    <div style={{ paddingBottom: '3rem' }}>
      
      {/* 1. LAYERED EMOTIONAL HERO */}
      <div style={{
        background: 'linear-gradient(135deg, #D1BFA5, #EDE7E3)', // Warm sand/neutral gradient
        padding: '2.5rem 1.5rem 5.5rem 1.5rem',
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(203, 164, 116, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Environmental Texture */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url('https://images.unsplash.com/photo-1495908333432-0ed4e08cf4fb?auto=format&fit=crop&w=800&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, mixBlendMode: 'overlay', pointerEvents: 'none' }}></div>

        {/* Soft Organic Floating Elements */}
        <CalendarHeart size={260} strokeWidth={0.5} style={{ position: 'absolute', top: '-20%', right: '-15%', opacity: 0.12, color: 'white', animation: 'float-reverse 9s ease-in-out infinite' }} />
        <Pill size={180} strokeWidth={0.5} style={{ position: 'absolute', bottom: '-5%', left: '-5%', opacity: 0.1, color: 'var(--color-primary-text)', animation: 'float 7s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '250px', height: '250px', background: 'rgba(255,255,255,0.4)', filter: 'blur(30px)', borderRadius: '50%', animation: 'float 8s infinite ease-in-out' }}></div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px', width: '100%', marginTop: '1rem' }}>
          <h1 style={{ color: 'var(--color-primary-text)', fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 800, letterSpacing: '-1px' }}>
            Your Routine
          </h1>
          <p style={{ color: 'var(--color-text)', margin: 0, fontSize: '1.15rem', fontWeight: 600 }}>
            Stay steady, one dose at a time.
          </p>
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 20, marginTop: '-4rem', paddingTop: 0 }}>

        {/* Medication Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '4rem' }}>
          {medications.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1.5rem', background: 'var(--color-card-bg)', borderRadius: '32px', boxShadow: '0 16px 40px rgba(42, 60, 53, 0.08)' }}>
              <p style={{ color: 'var(--color-text-light)', fontSize: '1.15rem', fontWeight: 600 }}>No medications scheduled.</p>
            </div>
          )}
          
          {medications.map(m => (
            <div key={m.id} style={{ 
              background: 'var(--color-card-bg)', 
              borderRadius: '28px', 
              boxShadow: '0 16px 40px rgba(42, 60, 53, 0.08)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '1rem', borderRadius: '20px' }}>
                       <Pill size={28} strokeWidth={2.5}/>
                    </div>
                    <div>
                      <h3 style={{ margin: '0 0 0.25rem 0', color: 'var(--color-primary-text)', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>{m.name}</h3>
                      <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '1rem', fontWeight: 500 }}>{m.dose}</p>
                    </div>
                 </div>
              </div>

              {/* Interaction Pills block */}
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                {m.periods && (Array.isArray(m.periods) ? m.periods : Object.keys(m.periods)).map((period) => {
                  const isTaken = todayMedLogs.some(log => log.medId === m.id && log.period === period);
                  return (
                    <button 
                      key={period}
                      onClick={() => toggleMedicationPeriod(m.id, period)}
                      style={{
                        background: isTaken ? 'var(--color-primary)' : 'var(--color-accent)',
                        color: isTaken ? 'white' : 'var(--color-primary-text)',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '1.15rem 1rem',
                        fontSize: '0.95rem',
                        fontWeight: isTaken ? 800 : 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: isTaken ? '0 12px 24px rgba(111, 174, 156, 0.3)' : '0 4px 12px rgba(42, 60, 53, 0.04)',
                        flex: 1,
                        minWidth: '80px',
                      }}
                    >
                      <div style={{ 
                        background: isTaken ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)', 
                        padding: '0.75rem', 
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isTaken ? <CheckCircle2 size={24} strokeWidth={3}/> : getPeriodIcon(period)}
                      </div>
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary-text)', marginBottom: '1.25rem', marginLeft: '0.5rem', letterSpacing: '-0.5px' }}>Add Treatment</h2>
        <div style={{ 
            background: 'linear-gradient(135deg, var(--color-bg), var(--color-card-bg))', 
            borderRadius: '32px', 
            padding: '2rem 1.5rem',
            boxShadow: '0 16px 40px rgba(42, 60, 53, 0.06)',
            marginBottom: '3rem'
        }}>
          <form onSubmit={handleAddMed}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <input type="text" placeholder="Medication Name" value={medName} onChange={e => setMedName(e.target.value)} style={{ padding: '1.25rem', borderRadius: '20px', border: 'none', background: 'var(--color-accent)', color: 'var(--color-primary-text)', fontSize: '1.05rem', fontFamily: 'inherit', fontWeight: 600, boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.02)' }} />
              <input type="text" placeholder="Dosage (e.g. 5mg)" value={medDose} onChange={e => setMedDose(e.target.value)} style={{ padding: '1.25rem', borderRadius: '20px', border: 'none', background: 'var(--color-accent)', color: 'var(--color-primary-text)', fontSize: '1.05rem', fontFamily: 'inherit', fontWeight: 600, boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.02)' }} />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {['morning', 'afternoon', 'night'].map(p => (
                <button 
                  type="button" 
                  key={p} 
                  onClick={() => togglePeriodConfig(p)}
                  style={{ 
                    background: medPeriods[p] ? 'var(--color-warning)' : 'var(--color-card-bg)', 
                    color: medPeriods[p] ? 'white' : 'var(--color-text)', 
                    border: medPeriods[p] ? 'none' : '1px solid var(--color-border)', 
                    borderRadius: '20px', 
                    padding: '1rem', 
                    fontSize: '0.95rem', 
                    fontWeight: medPeriods[p] ? 800 : 600, 
                    cursor: 'pointer', 
                    textTransform: 'capitalize', 
                    flex: 1,
                    transition: 'all 0.2s ease',
                    boxShadow: medPeriods[p] ? '0 8px 16px rgba(203, 164, 116, 0.3)' : 'none'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            <button type="submit" style={{ background: 'var(--color-primary)', color: 'white', borderRadius: '20px', padding: '1.25rem', width: '100%', border: 'none', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 12px 24px rgba(111,174,156,0.25)', transition: 'transform 0.2s ease' }}>
               <PlusCircle size={22} strokeWidth={2.5}/> Add to Routine
            </button>
          </form>
        </div>

        {medications.length > 0 && (
          <>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary-text)', marginBottom: '1.25rem', marginLeft: '0.5rem', letterSpacing: '-0.5px' }}>Current Routine</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {medications.map((m) => (
                <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'var(--color-card-bg)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(42, 60, 53, 0.04)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.15rem', color: 'var(--color-primary-text)', fontWeight: 800 }}>{m.name}</h4>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 700, background: 'var(--color-primary-light)', padding: '0.2rem 0.6rem', borderRadius: '8px', textTransform: 'capitalize' }}>
                      {m.periods.join(' • ')}
                    </span>
                  </div>
                  <button onClick={() => deleteMedication(m.id)} style={{ background: 'var(--color-alert-bg)', color: 'var(--color-danger)', border: 'none', borderRadius: '16px', padding: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s ease' }}>
                    <Trash2 size={20} strokeWidth={2.5}/>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default MedicationReminders;
