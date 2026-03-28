import React, { useContext, useState } from 'react';
import { PatientContext } from '../context/PatientContext';

const Profile = () => {
  const { 
    patient, setPatient,
    chemo, setChemo
  } = useContext(PatientContext);



  const handlePatientChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleChemoChange = (e) => {
    setChemo({ ...chemo, [e.target.name]: e.target.value });
  };





  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2rem', marginTop: '1rem' }}>
        <h1 style={{ color: 'var(--color-primary-text)', fontSize: '1.75rem', marginBottom: '0.25rem' }}>Patient Profile</h1>
        <p style={{ color: 'var(--color-text-light)', margin: 0 }}>Manage your treatment configuration.</p>
      </div>

      <section className="card">
        <h3 style={{ marginTop: 0 }}>Personal Details</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500, color: 'var(--color-text)' }}>Full Name</label>
            <input 
              type="text" name="name" value={patient.name || ''} onChange={handlePatientChange} placeholder="Enter your name"
              style={{ padding: '0.75rem', width: '100%', borderRadius: '12px', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500, color: 'var(--color-text)' }}>Diagnosis</label>
            <input 
              type="text" name="diagnosis" value={patient.diagnosis || ''} onChange={handlePatientChange} placeholder="e.g. Breast Cancer"
              style={{ padding: '0.75rem', width: '100%', borderRadius: '12px', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500, color: 'var(--color-text)' }}>Next Chemo Date</label>
            <input 
              type="date" name="nextAppointment" value={chemo.nextAppointment || ''} onChange={handleChemoChange}
              style={{ padding: '0.75rem', width: '100%', borderRadius: '12px', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      </section>



    </div>
  );
};

export default Profile;
