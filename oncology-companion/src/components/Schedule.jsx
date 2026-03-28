import React, { useContext, useState } from 'react';
import { PatientContext } from '../context/PatientContext';

const Schedule = () => {
  const { appointments, addAppointment, deleteAppointment } = useContext(PatientContext);

  const [apptTitle, setApptTitle] = useState('');
  const [apptDate, setApptDate] = useState('');
  const [apptTime, setApptTime] = useState('');
  const [apptType, setApptType] = useState('chemo');

  const handleAddAppt = (e) => {
    e.preventDefault();
    if (!apptTitle || !apptDate || !apptTime) return;
    addAppointment({ title: apptTitle, date: apptDate, time: apptTime, type: apptType });
    setApptTitle('');
    setApptDate('');
    setApptTime('');
    setApptType('chemo');
  };

  // Sort strictly by Date + Time chronologically
  const sortedAppointments = [...appointments].sort((a, b) => {
    const aDate = new Date(`${a.date}T${a.time || '00:00'}`);
    const bDate = new Date(`${b.date}T${b.time || '00:00'}`);
    return aDate.getTime() - bDate.getTime();
  });

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2rem', marginTop: '1rem' }}>
        <h1 style={{ color: 'var(--color-primary-text)', fontSize: '1.75rem', marginBottom: '0.25rem' }}>Treatment Schedule</h1>
        <p style={{ color: 'var(--color-text-light)', margin: 0 }}>Manage your upcoming appointments and clinical events.</p>
      </div>

      <section className="card">
        <h3 style={{ marginTop: 0 }}>Upcoming Appointments</h3>
        {sortedAppointments.length === 0 ? (
          <p style={{ color: 'var(--color-text-light)' }}>No active appointments scheduled.</p>
        ) : (
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {sortedAppointments.map(a => (
              <li key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary-text)', fontSize: '1.1rem' }}>
                    {a.title} <span style={{ fontSize: '0.85rem', background: 'var(--color-primary-light)', padding: '0.15rem 0.5rem', borderRadius: '12px', textTransform: 'capitalize', marginLeft: '0.4rem', fontWeight: 500, color: 'var(--color-primary-text)' }}>{a.type}</span>
                  </div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--color-text-light)', marginTop: '0.4rem', fontWeight: 500 }}>
                    {new Date(`${a.date}T${a.time || '00:00'}`).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <button onClick={() => deleteAppointment(a.id)} style={{ background: 'var(--color-alert-bg)', color: 'var(--color-danger)', border: 'none', borderRadius: '24px', fontSize: '0.85rem', padding: '0.5rem 1rem', cursor: 'pointer', transition: 'all 0.3s' }}>Remove</button>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleAddAppt} style={{ marginTop: '2.5rem', background: 'var(--color-bg)', padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)' }}>
          <h4 style={{ margin: '0 0 1.25rem 0', color: 'var(--color-primary-text)', fontSize: '1.15rem' }}>Add New Event</h4>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <input type="text" placeholder="Title (e.g. Blood Draw)" value={apptTitle} onChange={e => setApptTitle(e.target.value)} style={{ padding: '0.85rem', flex: 1, minWidth: '150px', borderRadius: '12px', border: '1px solid var(--color-border)' }} />
            <select value={apptType} onChange={e => setApptType(e.target.value)} style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--color-border)', flex: 0.5 }}>
              <option value="chemo">Chemo</option>
              <option value="doctor">Doctor</option>
              <option value="lab">Lab</option>
              <option value="followup">Follow-up</option>
              <option value="injection">Injection</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <input type="date" value={apptDate} onChange={e => setApptDate(e.target.value)} style={{ padding: '0.85rem', flex: 1, borderRadius: '12px', border: '1px solid var(--color-border)' }} />
            <input type="time" value={apptTime} onChange={e => setApptTime(e.target.value)} style={{ padding: '0.85rem', flex: 1, borderRadius: '12px', border: '1px solid var(--color-border)' }} />
          </div>
          <button type="submit" className="primary-action-button" style={{ borderRadius: '16px', padding: '0.85rem 1.5rem', width: 'auto', border: 'none', cursor: 'pointer' }}>Save Appointment</button>
        </form>
      </section>
    </div>
  );
};

export default Schedule;
