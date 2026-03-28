import React, { createContext, useState, useEffect } from 'react';

// Default empty states for true persistence
const defaultPatient = {
  name: '',
  age: '',
  diagnosis: '',
};

const defaultChemo = {
  nextAppointment: '',
  cycle: '',
  totalCycles: '',
};

const defaultMedications = [];
const defaultAppointments = [];

const defaultDailyLog = {
  hydration: { goalLiters: 2.5, consumedLiters: 0 },
  symptoms: [],
  mood: null,
  eating: null,
  sleep: null,
  vitals: null,
  medicationLogs: [],
  checkIn: { symptomsDone: false, moodDone: false, eatingDone: false, sleepDone: false, hydrationDone: false }
};

const defaultDailyLogs = {};

// Default notes structure for nurse communication
const defaultNotes = {
  questions: '',
  symptoms: '',
  worse: '',
  medication: ''
};

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  // Load persisted state from localStorage if present
  const loadState = (key, fallback) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const [patient, setPatient] = useState(() => loadState('patient', defaultPatient));
  const [chemo, setChemo] = useState(() => loadState('chemo', defaultChemo));
  const [medications, setMedications] = useState(() => loadState('medications', defaultMedications));
  const [appointments, setAppointments] = useState(() => loadState('appointments', defaultAppointments));
  const [dailyLogs, setDailyLogs] = useState(() => loadState('dailyLogs', defaultDailyLogs));
  const [notes, setNotes] = useState(() => loadState('notes', ''));

  // Persist state on change
  useEffect(() => {
    localStorage.setItem('patient', JSON.stringify(patient));
    localStorage.setItem('chemo', JSON.stringify(chemo));
    localStorage.setItem('medications', JSON.stringify(medications));
    localStorage.setItem('appointments', JSON.stringify(appointments));
    localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs));
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [patient, chemo, medications, appointments, dailyLogs, notes]);

  const getLogByDate = (dateStr) => {
    const log = dailyLogs[dateStr] || {};
    return {
      hydration: log.hydration || { goalLiters: 2.5, consumedLiters: 0 },
      symptoms: log.symptoms || [],
      mood: log.mood || null,
      eating: log.eating || null,
      sleep: log.sleep || null,
      vitals: log.vitals || null,
      medicationLogs: log.medicationLogs || [],
      checkIn: log.checkIn || { symptomsDone: false, moodDone: false, eatingDone: false, sleepDone: false, hydrationDone: false }
    };
  };
  
  const getTodayLog = () => {
    const today = new Date().toISOString().split('T')[0];
    return getLogByDate(today);
  };

  const updateTodayLog = (updater) => {
    const today = new Date().toISOString().split('T')[0];
    setDailyLogs(prev => {
      const todayLog = getLogByDate(today);
      return { ...prev, [today]: updater(todayLog) };
    });
  };

  // Simple helpers
  const logSymptom = (symptomObj) => {
    const symptomName = symptomObj.symptom || symptomObj;
    updateTodayLog(log => ({
      ...log,
      symptoms: [...log.symptoms, { symptom: symptomName, checked: true }],
      checkIn: { ...log.checkIn, symptomsDone: true }
    }));
  };

  const logMood = (moodValue) => {
    updateTodayLog(log => ({
      ...log,
      mood: moodValue,
      checkIn: { ...log.checkIn, moodDone: true }
    }));
  };

  const logEating = (eatingValue) => {
    updateTodayLog(log => ({
      ...log,
      eating: eatingValue,
      checkIn: { ...log.checkIn, eatingDone: true }
    }));
  };

  const logSleep = (sleepValue) => {
    updateTodayLog(log => ({
      ...log,
      sleep: sleepValue,
      checkIn: { ...log.checkIn, sleepDone: true }
    }));
  };

  const logVitals = (sys, dia) => {
    updateTodayLog(log => ({ ...log, vitals: { systolic: sys, diastolic: dia } }));
  };

  const toggleMedicationPeriod = (medId, period) => {
    updateTodayLog(log => {
      const exists = log.medicationLogs.some(m => m.medId === medId && m.period === period);
      return {
        ...log,
        medicationLogs: exists 
          ? log.medicationLogs.filter(m => !(m.medId === medId && m.period === period))
          : [...log.medicationLogs, { medId, period }]
      };
    });
  };

  // Profile Management CRUD API
  const addMedication = (med) => {
    setMedications(prev => {
      const newMed = { ...med, id: med.id || Date.now() };
      return [...prev, newMed];
    });
  };
  const editMedication = (id, updatedFields) => {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, ...updatedFields } : m));
  };
  const deleteMedication = (id) => {
    setMedications(prev => prev.filter(m => m.id !== id));
  };

  const logHydration = (litersAdded) => {
    updateTodayLog(log => {
      const newConsumed = Math.min(log.hydration.goalLiters, log.hydration.consumedLiters + litersAdded);
      return {
        ...log,
        hydration: { ...log.hydration, consumedLiters: newConsumed },
        checkIn: { ...log.checkIn, hydrationDone: newConsumed > 0 }
      };
    });
  };

  const addAppointment = (appt) => {
    setAppointments(prev => [...prev, { ...appt, id: Date.now() }]);
  };
  const deleteAppointment = (id) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const resetData = () => {
    setPatient(defaultPatient);
    setChemo(defaultChemo);
    setMedications(defaultMedications);
    setAppointments(defaultAppointments);
    setDailyLogs(defaultDailyLogs);
    setNotes('');
  };

  const value = {
    patient,
    setPatient,
    chemo,
    setChemo,
    medications,
    setMedications,
    addMedication,
    editMedication,
    deleteMedication,
    appointments,
    addAppointment,
    deleteAppointment,
    dailyLogs,
    getTodayLog,
    getLogByDate,
    toggleMedicationPeriod,
    logHydration,
    logSymptom,
    logMood,
    logEating,
    logSleep,
    logVitals,
    notes,
    setNotes,
    resetData,
  };

  return <PatientContext.Provider value={value}>{children}</PatientContext.Provider>;
};
