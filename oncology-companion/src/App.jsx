import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PatientProvider } from './context/PatientContext';

import Dashboard from './components/Dashboard';
import CheckIn from './components/CheckIn';
import Health from './components/Health';
import MedicationReminders from './components/MedicationReminders';
import SymptomCheckIn from './components/SymptomCheckIn';
import HydrationReminders from './components/HydrationReminders';
import ChemoCountdown from './components/ChemoCountdown';
import WeeklySummary from './components/WeeklySummary';
import Layout from './components/Layout';
import Profile from './components/Profile';
import Schedule from './components/Schedule';

const App = () => {
  return (
    <PatientProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/medications" element={<MedicationReminders />} />
            <Route path="/health" element={<Health />} />
            <Route path="/weekly-summary" element={<WeeklySummary />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/schedule" element={<Schedule />} />
            {/* Fully split page routes */}
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/health" element={<Health />} />
          </Routes>
        </Layout>
      </Router>
    </PatientProvider>
  );
};

export default App;
