import React, { useContext, useEffect, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import { Link } from 'react-router-dom';

const ChemoCountdown = () => {
  const { chemo } = useContext(PatientContext);
  const [remaining, setRemaining] = useState('');

  const calculate = () => {
    const now = new Date();
    const target = new Date(chemo.nextAppointment);
    const diff = target - now;
    if (diff <= 0) {
      setRemaining('Appointment time reached');
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    setRemaining(`${days}d ${hours}h ${minutes}m`);
  };

  useEffect(() => {
    calculate();
    const timer = setInterval(calculate, 60000); // update every minute
    return () => clearInterval(timer);
  }, [chemo.nextAppointment]);

  return (
    <div className="container">
      <h1>Chemo Countdown</h1>
      <p>Next appointment: {new Date(chemo.nextAppointment).toLocaleString()}</p>
      <p>Cycle {chemo.cycle} of {chemo.totalCycles}</p>
      <p>Time remaining: {remaining}</p>
      <Link to="/">← Back to Dashboard</Link>
    </div>
  );
};

export default ChemoCountdown;
