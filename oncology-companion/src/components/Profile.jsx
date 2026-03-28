import React, { useContext } from 'react';
import { PatientContext } from '../context/PatientContext';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, BarChart3, Settings, UserCircle, TriangleAlert } from 'lucide-react';

const Profile = () => {
  const { 
    patient, setPatient,
    chemo, setChemo,
    resetData
  } = useContext(PatientContext);

  const navigate = useNavigate();

  const handlePatientChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleChemoChange = (e) => {
    setChemo({ ...chemo, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to completely wipe all patient data? This cannot be undone.")) {
      resetData();
      navigate('/');
    }
  };

  return (
    <div style={{ paddingBottom: '3rem' }}>
      
      {/* 1. LAYERED EMOTIONAL HERO */}
      <div style={{
        background: 'linear-gradient(135deg, #EDE7E3, #FDFBFA)', // Gentle neutral
        padding: '2.5rem 1.5rem 5.5rem 1.5rem',
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(210, 196, 185, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Environmental Texture */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url('https://images.unsplash.com/photo-1495908333432-0ed4e08cf4fb?auto=format&fit=crop&w=800&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, mixBlendMode: 'overlay', pointerEvents: 'none' }}></div>

        {/* Soft Organic Floating Elements */}
        <Settings size={260} strokeWidth={0.5} style={{ position: 'absolute', top: '-20%', right: '-15%', opacity: 0.1, color: 'var(--color-primary-text)', animation: 'float 9s ease-in-out infinite' }} />
        <UserCircle size={180} strokeWidth={0.5} style={{ position: 'absolute', bottom: '-5%', left: '-5%', opacity: 0.08, color: 'var(--color-primary)', animation: 'float-reverse 7s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '10%', right: '20%', width: '250px', height: '250px', background: 'rgba(255,255,255,0.6)', filter: 'blur(30px)', borderRadius: '50%', animation: 'float-reverse 8s infinite ease-in-out' }}></div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px', width: '100%', marginTop: '1rem' }}>
          <h1 style={{ color: 'var(--color-primary-text)', fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 800, letterSpacing: '-1px' }}>
            Menu
          </h1>
          <p style={{ color: 'var(--color-text)', margin: 0, fontSize: '1.15rem', fontWeight: 600 }}>
            Reports and configuration.
          </p>
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 20, marginTop: '-4rem', paddingTop: 0 }}>
        
        {/* Elevated Floating Navigation Panel */}
        <div style={{ background: 'var(--color-card-bg)', borderRadius: '32px', boxShadow: '0 16px 40px rgba(42, 60, 53, 0.08)', display: 'flex', flexDirection: 'column', overflow: 'hidden', marginBottom: '3rem' }}>
          <Link to="/schedule" style={{ padding: '1.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text)', fontWeight: 600, textDecoration: 'none', background: 'var(--color-card-bg)', transition: 'background 0.2s ease' }} className="interactive-card">
            <span style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '1.1rem' }}>
              <div style={{ background: 'var(--color-primary-light)', padding: '0.8rem', borderRadius: '16px', color: 'var(--color-primary)' }}><Calendar size={24} strokeWidth={2.5}/></div>
              Treatment Schedule
            </span>
            <span style={{ color: 'var(--color-text-light)', fontSize: '1.5rem' }}>›</span>
          </Link>
          <Link to="/weekly-summary" style={{ padding: '1.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-text)', fontWeight: 600, textDecoration: 'none', background: 'var(--color-card-bg)', transition: 'background 0.2s ease' }} className="interactive-card">
            <span style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '1.1rem' }}>
              <div style={{ background: 'var(--color-primary-light)', padding: '0.8rem', borderRadius: '16px', color: 'var(--color-primary)' }}><BarChart3 size={24} strokeWidth={2.5}/></div>
              Weekly Report
            </span>
            <span style={{ color: 'var(--color-text-light)', fontSize: '1.5rem' }}>›</span>
          </Link>
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary-text)', marginBottom: '1.25rem', marginLeft: '0.5rem', letterSpacing: '-0.5px' }}>Identity</h2>
        
        {/* Config Floating Bubbles instead of rigid vertical form lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--color-bg)', padding: '1.5rem', borderRadius: '28px', border: '1px solid rgba(0,0,0,0.02)', boxShadow: 'inset 0 4px 12px rgba(42,60,53,0.02)' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--color-text)', fontSize: '1rem', paddingLeft: '0.5rem' }}>Your Name</label>
            <input 
              type="text" name="name" value={patient.name || ''} onChange={handlePatientChange} placeholder="Enter your name"
              style={{ padding: '1.25rem', width: '100%', borderRadius: '20px', border: 'none', boxSizing: 'border-box', background: 'var(--color-card-bg)', color: 'var(--color-primary-text)', fontSize: '1.1rem', fontFamily: 'inherit', fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}
            />
          </div>

          <div style={{ background: 'var(--color-bg)', padding: '1.5rem', borderRadius: '28px', border: '1px solid rgba(0,0,0,0.02)', boxShadow: 'inset 0 4px 12px rgba(42,60,53,0.02)' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--color-text)', fontSize: '1rem', paddingLeft: '0.5rem' }}>Diagnosis</label>
            <input 
              type="text" name="diagnosis" value={patient.diagnosis || ''} onChange={handlePatientChange} placeholder="e.g. Breast Cancer"
              style={{ padding: '1.25rem', width: '100%', borderRadius: '20px', border: 'none', boxSizing: 'border-box', background: 'var(--color-card-bg)', color: 'var(--color-primary-text)', fontSize: '1.1rem', fontFamily: 'inherit', fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}
            />
          </div>

          <div style={{ background: 'var(--color-bg)', padding: '1.5rem', borderRadius: '28px', border: '1px solid rgba(0,0,0,0.02)', boxShadow: 'inset 0 4px 12px rgba(42,60,53,0.02)' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--color-text)', fontSize: '1rem', paddingLeft: '0.5rem' }}>Next Schedule</label>
            <input 
              type="date" name="nextAppointment" value={chemo.nextAppointment || ''} onChange={handleChemoChange}
              style={{ padding: '1.25rem', width: '100%', borderRadius: '20px', border: 'none', boxSizing: 'border-box', background: 'var(--color-card-bg)', color: 'var(--color-primary-text)', fontSize: '1.1rem', fontFamily: 'inherit', fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}
            />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
          <button
            onClick={handleReset}
            style={{ 
              background: 'transparent', 
              color: 'var(--color-danger)', 
              border: '2px solid rgba(210, 156, 156, 0.3)', 
              borderRadius: '24px',
              fontSize: '1.05rem', 
              fontWeight: 700,
              padding: '1rem 3rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <TriangleAlert size={20} strokeWidth={2.5}/> Factory Reset
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
