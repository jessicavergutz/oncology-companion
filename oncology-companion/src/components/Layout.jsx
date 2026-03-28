import React from 'react';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      {/* Sidebar (Desktop) / Bottom Nav (Mobile) */}
      <nav className="app-sidebar">
        <h2 className="sidebar-brand no-print">Oncology Companion</h2>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <span className="nav-icon">🏠</span>
            <span className="nav-label">Home</span>
          </NavLink>
          <NavLink to="/checkin" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <span className="nav-icon">📝</span>
            <span className="nav-label">Check-in</span>
          </NavLink>
          <NavLink to="/medications" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <span className="nav-icon">💊</span>
            <span className="nav-label">Medications</span>
          </NavLink>
          <NavLink to="/health" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <span className="nav-icon">❤️</span>
            <span className="nav-label">Health</span>
          </NavLink>
          <NavLink to="/schedule" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <span className="nav-icon">📅</span>
            <span className="nav-label">Schedule</span>
          </NavLink>
          <NavLink to="/weekly-summary" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <span className="nav-icon">📊</span>
            <span className="nav-label">Reports</span>
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <span className="nav-icon">👤</span>
            <span className="nav-label">Profile</span>
          </NavLink>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="app-main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
