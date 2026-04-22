import React, { useState } from 'react';
import './DashboardView.css';

function DashboardView() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileAgendaDay, setMobileAgendaDay] = useState('Mon');
  const [isAiListening, setIsAiListening] = useState(false);
  const [aiState, setAiState] = useState(''); // 'listening', 'processing', 'done'
  const [aiMessage, setAiMessage] = useState('');
  const [activeBriefing, setActiveBriefing] = useState(null);

  // Mock data for today's schedule
  const [appointments, setAppointments] = useState([
    { id: 1, time: '10:00 AM', client: 'Jessica V.', service: 'Volume Lashes', status: 'pending', price: '$150' },
    { id: 2, time: '12:30 PM', client: 'Sarah J.', service: 'Brow Tint & Wax', status: 'pending', price: '$55' },
    { id: 3, time: '2:00 PM', client: 'Maria G.', service: 'Gel Manicure', status: 'pending', price: '$75' }
  ]);

  const mockBriefings = {
    1: { tech: "Russian Volume, D-Curl (10-14mm). Single fiber.", alert: "⚠️ Sensitive eyes. Use soft silicone tape (allergic to micropore).", rapport: "Trip to Hawaii last month. Ask how it went." },
    2: { tech: "Henna Brow Design (Medium Brown). Processing time: 15 min.", alert: "No known restrictions.", rapport: "Her son (Leo) turned 5 last week." },
    3: { tech: "Gel Polish (Color: OPI Red). Almond shape.", alert: "Thin cuticles, do not push back aggressively.", rapport: "Works at the nearby hospital, usually does night shifts." }
  };

  const [generatedPost, setGeneratedPost] = useState(null);

  const handleVoiceCommand = () => {
    setIsAiListening(true);
    setAiState('listening');
    setAiMessage('Aguardando você falar...');
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setAiMessage('⚠️ Microfone bloqueado pelo Safari/iOS (Requer HTTPS ou Localhost).');
      setTimeout(() => { setIsAiListening(false); setAiState(''); }, 4000);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'pt-BR'; // Configurado para entender português!

    let finalTranscript = '';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setAiMessage(`"${finalTranscript || interimTranscript}"`);
    };

    recognition.onerror = (event) => {
      setAiMessage(`Erro: ${event.error}. Permita o uso do microfone.`);
      setTimeout(() => { setIsAiListening(false); setAiState(''); }, 4000);
    };

    recognition.onend = () => {
      if (!finalTranscript) {
        setAiMessage('Nada foi detectado. Tente novamente.');
        setTimeout(() => { setIsAiListening(false); setAiState(''); }, 3000);
        return;
      }
      
      setAiState('processing');
      setAiMessage('Processando via MegaBrain AI...');
      
      setTimeout(() => {
        setAiState('done');
        setAiMessage('✨ Comando transcrito e compreendido com sucesso!');
        
        // Se falar de "maria" ou "cancelar", a gente simula a remoção dela da agenda:
        if (finalTranscript.toLowerCase().includes('maria') || finalTranscript.toLowerCase().includes('cancelar')) {
          setAppointments(appointments.filter(a => a.id !== 3)); // Remove Maria
          setAiMessage('Sucesso: Maria cancelada ($37.50 cobrados). Lista avisada.');
        }
        
        setTimeout(() => {
          setIsAiListening(false);
          setAiState('');
          setAiMessage('');
        }, 5000);
      }, 2500);
    };

    try {
      recognition.start();
    } catch (err) {
      setAiMessage('Erro ao iniciar o microfone.');
    }
  };

  const handleAction = (id, action) => {
    if (action === 'noshow') {
      alert('⚠️ No-Show triggered! Client card will be charged the 50% policy fee instantly.');
      setAppointments(appointments.filter(a => a.id !== id));
    } else {
      setAppointments(appointments.map(a => a.id === id ? { ...a, status: action } : a));
    }
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="glass-panel sidebar">
        <img src="/logo.png" alt="AuraSync" className="sidebar-logo" />
        <nav className="nav-menu">
          <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>⚡ Overview</button>
          <button className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>📅 Calendar</button>
          <button className={`nav-item ${activeTab === 'crm' ? 'active' : ''}`} onClick={() => setActiveTab('crm')}>👥 Clients</button>
          <button className={`nav-item ${activeTab === 'finance' ? 'active' : ''}`} onClick={() => setActiveTab('finance')}>💰 Finances</button>
          <button className={`nav-item ${activeTab === 'marketing' ? 'active' : ''}`} onClick={() => setActiveTab('marketing')}>📈 Marketing</button>
        </nav>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <h2>
            {activeTab === 'overview' ? "Today's Overview" : 
             activeTab === 'crm' ? 'Client Management' : 
             activeTab === 'finance' ? 'Financial Hub' :
             activeTab === 'calendar' ? 'Schedule' : 'Marketing Center'}
          </h2>
        </header>

        {activeTab === 'overview' && (
          <div className="pulse-view animate-in">
            {/* Metric Row */}
            <div className="metric-row">
              <div className="metric-card glass-panel">
                <h4>Today's Revenue</h4>
                <div className="val">$850.00</div>
                <div className="trend positive">+$120 in Add-ons</div>
              </div>
              <div className="metric-card glass-panel">
                <h4>Schedule Health</h4>
                <div className="val">{appointments.length} Booked</div>
                <div className="trend warning">1 Gap at 3:30 PM</div>
              </div>
            </div>

            <div className="pulse-split">
              {/* Actionable Schedule */}
              <div className="schedule-column glass-panel">
                <h3>Actionable Schedule</h3>
                <div className="schedule-list">
                  {appointments.length === 0 && <p className="empty-state">No more appointments today.</p>}
                  {appointments.map(appt => (
                    <div key={appt.id} className={`schedule-card ${appt.status}`}>
                      <div className="appt-header">
                        <span className="appt-time">{appt.time}</span>
                        <span className="appt-price">{appt.price}</span>
                      </div>
                      <div className="appt-details">
                        <h4>{appt.client}</h4>
                        <p>{appt.service}</p>
                        <button className="ai-briefing-trigger" onClick={() => setActiveBriefing(activeBriefing === appt.id ? null : appt.id)}>
                          ⚡ AI Snapshot
                        </button>
                      </div>
                      
                      {activeBriefing === appt.id && (
                        <div className="ai-briefing-content animate-in">
                          <div className="briefing-item">
                            <span className="b-icon">📝</span>
                            <div>
                              <h5>Formula & Specs</h5>
                              <p>{mockBriefings[appt.id]?.tech}</p>
                            </div>
                          </div>
                          <div className="briefing-item alert">
                            <span className="b-icon">⚠️</span>
                            <div>
                              <h5>Safety & Alerts</h5>
                              <p>{mockBriefings[appt.id]?.alert}</p>
                            </div>
                          </div>
                          <div className="briefing-item rapport">
                            <span className="b-icon">💬</span>
                            <div>
                              <h5>Connection (Rapport)</h5>
                              <p>{mockBriefings[appt.id]?.rapport}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="appt-actions">
                        {appt.status === 'pending' ? (
                          <>
                            <button className="btn-action checkin" onClick={() => handleAction(appt.id, 'checked-in')}>Check-In</button>
                            <button className="btn-action noshow" onClick={() => handleAction(appt.id, 'noshow')}>No-Show ⚠️</button>
                          </>
                        ) : (
                          <button className="btn-action checkout" onClick={() => handleAction(appt.id, 'completed')}>Complete & Pay</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Command Center */}
              <div className="ai-log-column glass-panel">
                <h3>AI Command Center</h3>
                <div className="ai-log-list">
                  <div className="ai-log-item">
                    <span className="time">10:15 AM</span>
                    <p>Replied to 3 Instagram DMs regarding pricing.</p>
                  </div>
                  <div className="ai-log-item">
                    <span className="time">09:30 AM</span>
                    <p>Sent confirmation texts for tomorrow's appointments.</p>
                  </div>
                  <div className="ai-log-item success">
                    <span className="time">08:00 AM</span>
                    <p>Automatically filled 2:00 PM cancellation from the Smart Waitlist.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="calendar-view glass-panel animate-in">
            <div className="calendar-header">
              <h3>Weekly Schedule</h3>
            </div>
            <div className="calendar-grid">
              <div className="time-column">
                <div>9 AM</div><div>10 AM</div><div>11 AM</div><div>12 PM</div><div>1 PM</div><div>2 PM</div><div>3 PM</div><div>4 PM</div><div>5 PM</div>
              </div>
              <div className="day-columns">
                <div className="day-col">
                  <div className="day-header">Mon</div>
                  <div className="appt-block" style={{ top: '0px', height: '90px' }}>Sarah J. (Lashes)</div>
                  <div className="appt-block" style={{ top: '105px', height: '60px' }}>Emily R. (Tint)</div>
                  <div className="appt-block break" style={{ top: '180px', height: '60px' }}>☕ Lunch Break</div>
                  <div className="appt-block gap" style={{ top: '240px', height: '120px' }}>2h AI Gap</div>
                  <div className="appt-block" style={{ top: '360px', height: '120px' }}>Jessica V. (Full Set)</div>
                </div>
                <div className="day-col">
                  <div className="day-header">Tue</div>
                  <div className="appt-block" style={{ top: '30px', height: '120px' }}>Emma W. (Brows)</div>
                  <div className="appt-block break" style={{ top: '180px', height: '60px' }}>☕ Lunch Break</div>
                  <div className="appt-block" style={{ top: '240px', height: '90px' }}>Chloe (Fill)</div>
                  <div className="appt-block" style={{ top: '345px', height: '90px' }}>Amanda (Volume)</div>
                </div>
                <div className="day-col">
                  <div className="day-header">Wed</div>
                  <div className="appt-block" style={{ top: '0px', height: '180px' }}>Bridal Party (Group)</div>
                  <div className="appt-block break" style={{ top: '180px', height: '60px' }}>☕ Lunch Break</div>
                  <div className="appt-block gap" style={{ top: '240px', height: '180px' }}>3h AI Gap</div>
                  <div className="appt-block" style={{ top: '420px', height: '60px' }}>Maria G. (Removal)</div>
                </div>
              </div>
            </div>

            {/* Mobile Daily Agenda */}
            <div className="mobile-agenda-view">
              <div className="agenda-tabs">
                <button className={`agenda-tab ${mobileAgendaDay === 'Mon' ? 'active' : ''}`} onClick={() => setMobileAgendaDay('Mon')}>Mon</button>
                <button className={`agenda-tab ${mobileAgendaDay === 'Tue' ? 'active' : ''}`} onClick={() => setMobileAgendaDay('Tue')}>Tue</button>
                <button className={`agenda-tab ${mobileAgendaDay === 'Wed' ? 'active' : ''}`} onClick={() => setMobileAgendaDay('Wed')}>Wed</button>
              </div>
              
              <div className="agenda-list">
                {mobileAgendaDay === 'Mon' && (
                  <>
                    <div className="agenda-card">
                      <div className="time">9:00 AM</div>
                      <div className="details">
                        <h4>Sarah J.</h4>
                        <p>Volume Lashes</p>
                      </div>
                    </div>
                    <div className="agenda-card">
                      <div className="time">10:30 AM</div>
                      <div className="details">
                        <h4>Emily R.</h4>
                        <p>Brow Tint</p>
                      </div>
                    </div>
                    <div className="agenda-card break">
                      <div className="time">12:00 PM</div>
                      <div className="details">
                        <h4>☕ Lunch Break</h4>
                      </div>
                    </div>
                    <div className="agenda-card gap">
                      <div className="time">1:00 PM</div>
                      <div className="details">
                        <h4>2h AI Gap</h4>
                        <p>AI attempting to fill...</p>
                      </div>
                    </div>
                    <div className="agenda-card">
                      <div className="time">3:00 PM</div>
                      <div className="details">
                        <h4>Jessica V.</h4>
                        <p>Full Set</p>
                      </div>
                    </div>
                  </>
                )}
                {mobileAgendaDay === 'Tue' && (
                  <>
                    <div className="agenda-card">
                      <div className="time">9:30 AM</div>
                      <div className="details">
                        <h4>Emma W.</h4>
                        <p>Brows</p>
                      </div>
                    </div>
                    <div className="agenda-card break">
                      <div className="time">12:00 PM</div>
                      <div className="details">
                        <h4>☕ Lunch Break</h4>
                      </div>
                    </div>
                    <div className="agenda-card">
                      <div className="time">1:00 PM</div>
                      <div className="details">
                        <h4>Chloe</h4>
                        <p>Lash Fill</p>
                      </div>
                    </div>
                    <div className="agenda-card">
                      <div className="time">2:30 PM</div>
                      <div className="details">
                        <h4>Amanda</h4>
                        <p>Volume Lashes</p>
                      </div>
                    </div>
                  </>
                )}
                {mobileAgendaDay === 'Wed' && (
                  <>
                    <div className="agenda-card">
                      <div className="time">9:00 AM</div>
                      <div className="details">
                        <h4>Bridal Party</h4>
                        <p>Group Lashes</p>
                      </div>
                    </div>
                    <div className="agenda-card break">
                      <div className="time">12:00 PM</div>
                      <div className="details">
                        <h4>☕ Lunch Break</h4>
                      </div>
                    </div>
                    <div className="agenda-card gap">
                      <div className="time">1:00 PM</div>
                      <div className="details">
                        <h4>3h AI Gap</h4>
                        <p>AI attempting to fill...</p>
                      </div>
                    </div>
                    <div className="agenda-card">
                      <div className="time">4:00 PM</div>
                      <div className="details">
                        <h4>Maria G.</h4>
                        <p>Removal</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'crm' && (
          <div className="crm-view animate-in">
            <div className="crm-split">
              <div className="glass-panel waitlist-panel">
                <h3>⏳ Cancellation Waitlist</h3>
                <div className="waitlist-item">
                  <div className="wl-info">
                    <h4>Jessica V.</h4>
                    <p>Wants: Any time Friday</p>
                  </div>
                  <button className="btn-action checkin">Match Slot</button>
                </div>
                <div className="waitlist-item">
                  <div className="wl-info">
                    <h4>Amanda B.</h4>
                    <p>Wants: Volume Lashes (ASAP)</p>
                  </div>
                  <button className="btn-action checkin">Match Slot</button>
                </div>
              </div>
              <div className="glass-panel client-panel">
                <h3>⭐ Top Clients (Highest Spenders)</h3>
                <table className="client-table">
                  <thead>
                    <tr><th>Name</th><th>Total Spent</th><th>Warning</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Sarah Jenkins</td><td>$1,200</td><td><span className="tag vip">Loyal Client</span></td></tr>
                    <tr><td>Maria Garcia</td><td>$450</td><td><span className="tag risk">No-Show Risk</span></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="finance-view animate-in">
            <div className="metric-row">
              <div className="metric-card glass-panel">
                <h4>Net Revenue</h4>
                <div className="val">$3,240.00</div>
                <div className="trend positive">+15% vs last week</div>
              </div>
              <div className="metric-card glass-panel highlight">
                <h4>Available for Payout</h4>
                <div className="val">$1,800.00</div>
                <button className="btn-action checkout mt-2">Transfer to Bank</button>
              </div>
            </div>
            <div className="glass-panel chart-mockup mt-4">
              <h3>Revenue Growth</h3>
              <div className="bar-chart">
                <div className="bar" style={{height: '40%'}}><span>Mon</span></div>
                <div className="bar" style={{height: '60%'}}><span>Tue</span></div>
                <div className="bar" style={{height: '50%'}}><span>Wed</span></div>
                <div className="bar" style={{height: '90%'}}><span>Thu</span></div>
                <div className="bar highlight" style={{height: '100%'}}><span>Fri</span></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marketing' && (
          <div className="marketing-view glass-panel animate-in">
            <h3>📈 Social Media Automations</h3>
            <p className="sub-text mb-4">Let the AI Assistant handle your Instagram growth while you work.</p>
            
            <div className="marketing-grid">
              <div className="marketing-card">
                <h4>Instagram DMs</h4>
                <p>AI Assistant is currently set to auto-reply to pricing questions.</p>
                <div className="status-badge active mt-2">🟢 Active (8 handled today)</div>
              </div>
              <div className="marketing-card" style={{ gridColumn: generatedPost ? '1 / -1' : 'auto' }}>
                <h4>Generate Post</h4>
                <p>Need to fill a 3 hour gap tomorrow? Let your AI Assistant generate a creative graphic and write a promotional post.</p>
                
                {!generatedPost ? (
                  <button className="btn-secondary w-full mt-4" onClick={() => {
                    setGeneratedPost('loading');
                    setTimeout(() => {
                      setGeneratedPost('done');
                    }, 2500);
                  }}>
                    {generatedPost === 'loading' ? 'Generating...' : 'Generate IG Post ✨'}
                  </button>
                ) : generatedPost === 'loading' ? (
                  <div className="loading-state mt-4" style={{textAlign: 'center', padding: '20px', color: 'var(--gold-primary)'}}>
                    <span className="pulse-text">AI Assistant is generating the creative graphic and writing copy...</span>
                  </div>
                ) : (
                  <div className="generated-post-preview mt-4 animate-in">
                    <div className="ig-mockup">
                      <div className="ig-header">
                        <div className="ig-avatar"></div>
                        <span className="ig-username">aurasync.studio</span>
                      </div>
                      <div className="ig-graphic-container">
                        <img src="/ig-post.png" alt="AI Generated Graphic" className="ig-image-real" />
                        <div className="ig-graphic-overlay">
                          <span className="overlay-tag">LAST MINUTE</span>
                          <h2 className="overlay-title">15% OFF</h2>
                          <p className="overlay-sub">ANY LASH SET</p>
                        </div>
                      </div>
                      <div className="ig-caption">
                        <p><strong>aurasync.studio</strong> ✨ SURPRISE OPENING! ✨<br/><br/>
                        I just had a last-minute cancellation for tomorrow at 1:00 PM! 
                        First person to DM me gets 15% OFF any Volume Lash Set! 🤍👇<br/><br/>
                        #LashArtist #VolumeLashes #AuraSync</p>
                      </div>
                    </div>
                    <div className="post-actions mt-4" style={{display: 'flex', gap: '12px'}}>
                      <button className="btn-primary" style={{flex: 1}} onClick={() => alert('Post sent to Instagram API for auto-publishing!')}>
                        Auto-Publish Now
                      </button>
                      <button className="btn-secondary" style={{flex: 1}} onClick={() => setGeneratedPost(null)}>
                        Discard
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Voice AI FAB */}
        <div className={`voice-ai-fab ${aiState}`} onClick={handleVoiceCommand}>
          <div className="fab-icon">🎙️</div>
        </div>
        
        {isAiListening && (
          <div className="ai-overlay">
            <div className={`ai-dialog glass-panel animate-in ${aiState}`}>
              <div className="ai-waveform">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
              <p>{aiMessage}</p>
            </div>
          </div>
        )}
      </main>

      {/* Premium Mobile Bottom Navigation */}
      <div className="mobile-nav-base">
        <nav className="bottom-nav premium-bar">
          <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <span className="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </span>
            <span className="label">Overview</span>
          </button>
          <button className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>
            <span className="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </span>
            <span className="label">Schedule</span>
          </button>
          <button className={`nav-item ${activeTab === 'crm' ? 'active' : ''}`} onClick={() => setActiveTab('crm')}>
            <span className="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </span>
            <span className="label">Clients</span>
          </button>
          <button className={`nav-item ${activeTab === 'finance' ? 'active' : ''}`} onClick={() => setActiveTab('finance')}>
            <span className="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
            </span>
            <span className="label">Finances</span>
          </button>
          <button className={`nav-item ${activeTab === 'marketing' ? 'active' : ''}`} onClick={() => setActiveTab('marketing')}>
            <span className="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            </span>
            <span className="label">Marketing</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default DashboardView;
