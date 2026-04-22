import { useState } from 'react';
import BookingView from './components/BookingView';
import DashboardView from './components/DashboardView';

function App() {
  const [view, setView] = useState('booking'); // 'booking' or 'dashboard'

  return (
    <div className="app-container">
      {/* Top Navigation for switching views (Only for MVP demonstration purposes) */}
      <div className="dev-mode-toggle">
        <button 
          className={view === 'booking' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setView('booking')}
        >
          Client View
        </button>
        <button 
          className={view === 'dashboard' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setView('dashboard')}
        >
          Pro Dashboard
        </button>
      </div>

      <div className="main-content">
        {view === 'booking' ? <BookingView /> : <DashboardView />}
      </div>
    </div>
  );
}

export default App;
