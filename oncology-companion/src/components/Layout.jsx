import React from 'react';
import { NavLink } from 'react-router-dom';

import { Home, ClipboardList, Pill, Activity, Menu } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      {/* Sidebar (Desktop) / Bottom Nav (Mobile) */}
      <nav className="app-sidebar">
        <h2 className="sidebar-brand no-print">Oncology Companion</h2>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <Home size={22} className="nav-icon" strokeWidth={2} />
            <span className="nav-label">Home</span>
          </NavLink>
          <NavLink to="/checkin" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <ClipboardList size={22} className="nav-icon" strokeWidth={2} />
            <span className="nav-label">Check-in</span>
          </NavLink>
          <NavLink to="/medications" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <Pill size={22} className="nav-icon" strokeWidth={2} />
            <span className="nav-label">Meds</span>
          </NavLink>
          <NavLink to="/health" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <Activity size={22} className="nav-icon" strokeWidth={2} />
            <span className="nav-label">Health</span>
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <Menu size={22} className="nav-icon" strokeWidth={2} />
            <span className="nav-label">Menu</span>
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
