import React, { useState, useEffect } from 'react';
import './BookingView.css';

function BookingView() {
  const [step, setStep] = useState(0);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedService, setSelectedService] = useState(null);
  const [showPolicy, setShowPolicy] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => {
        setStep(1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Generate next 30 days dynamically
  const next30Days = Array.from({length: 30}, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      dayName: i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: d.getDate(),
      full: d.toISOString().split('T')[0]
    };
  });

  // Real data structure inspired by Ma Beauté Studio
  const categories = ['ALL', 'GEL NAILS', 'ACRYLIC', 'BROWS', 'LASHES'];
  
  const allServices = [
    { id: 1, category: 'GEL NAILS', name: 'Gel Manicure', duration: '45 min', price: '$55+' },
    { id: 2, category: 'GEL NAILS', name: 'Structured Gel Overlay', duration: '1h 15m', price: '$75+' },
    { id: 3, category: 'ACRYLIC', name: 'Full Set Acrylic', duration: '2h', price: '$90+' },
    { id: 4, category: 'ACRYLIC', name: 'Acrylic Fill', duration: '1h 30m', price: '$65+' },
    { id: 5, category: 'BROWS', name: 'Brow Shaping & Tint', duration: '30 min', price: '$45' },
    { id: 6, category: 'LASHES', name: 'Volume Lash Extensions', duration: '2h 15m', price: '$150' },
  ];

  const filteredServices = activeCategory === 'ALL' 
    ? allServices 
    : allServices.filter(s => s.category === activeCategory);

  const getAddonsForCategory = (category) => {
    switch(category) {
      case 'GEL NAILS':
      case 'ACRYLIC':
        return [
          { id: 'art', name: 'Custom Nail Art', time: '+15 mins', price: 15 },
          { id: 'wax', name: 'Paraffin Wax', time: '+10 mins', price: 20 },
          { id: 'french', name: 'French Tip', time: '+15 mins', price: 15 }
        ];
      case 'BROWS':
        return [
          { id: 'tint', name: 'Brow Tint', time: '+15 mins', price: 15 },
          { id: 'lip', name: 'Lip Wax', time: '+5 mins', price: 10 }
        ];
      case 'LASHES':
        return [
          { id: 'bottom', name: 'Bottom Lashes', time: '+30 mins', price: 30 },
          { id: 'bath', name: 'Lash Bath', time: '+10 mins', price: 15 }
        ];
      default:
        return [];
    }
  };

  const selectedServiceObject = allServices.find(s => s.id === selectedService);
  const currentAddons = selectedServiceObject ? getAddonsForCategory(selectedServiceObject.category) : [];

  const addonTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = currentAddons.find(a => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);
  
  const basePrice = selectedServiceObject ? parseInt(selectedServiceObject.price.replace(/[^0-9]/g, '')) : 0;

  return (
    <div className="booking-wrapper">
      <header className="salon-header animate-in">
        <img src="/logo.png" alt="AuraSync Studio Logo" className="salon-avatar-img" />
        <h1>AuraSync Studio</h1>
        <div className="reviews-badge">
          <span>★ 5.0</span> (124 reviews)
        </div>
        <p className="salon-bio mt-2">Elevate your natural aura.</p>
      </header>

      <div className="glass-panel booking-panel">
        {step === 0 && (
          <div className="step-content welcome-screen animate-in">
            <div className="welcome-sparkle">✨</div>
            <h2 className="welcome-title">Welcome back, Jessica.</h2>
            <p className="welcome-copy">
              Your time is your ultimate luxury.<br/>
              Reserve your space and let us elevate your presence.
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="step-content animate-in">
            <h2>Select a Service</h2>
            
            {/* Interactive Category Pills */}
            <div className="category-tabs">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="services-list">
              {filteredServices.map(service => (
                <div 
                  key={service.id} 
                  className={`service-card ${selectedService === service.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedService(service.id);
                    setSelectedAddons([]); // Clear addons if service changes
                  }}
                >
                  <div className="service-info">
                    <h3>{service.name}</h3>
                    <span>{service.duration}</span>
                  </div>
                  <div className="service-price">{service.price}</div>
                </div>
              ))}
            </div>
            
            {selectedService && currentAddons.length > 0 && (
              <div className="addons-section animate-in mt-4">
                <h3>Enhance Your Experience</h3>
                <div className="addons-list">
                  {currentAddons.map(addon => (
                    <div 
                      key={addon.id}
                      className={`addon-card ${selectedAddons.includes(addon.id) ? 'selected' : ''}`}
                      onClick={() => toggleAddon(addon.id)}
                    >
                      <div>
                        <h4>{addon.name}</h4>
                        <p>{addon.time}</p>
                      </div>
                      <div className="addon-price">+${addon.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button 
              className="btn-primary w-full mt-4" 
              disabled={!selectedService}
              onClick={() => setStep(2)}
            >
              Select Time
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step-content animate-in">
            <div className="step-header-row">
              <h2>Select a Date</h2>
              <button 
                className="extend-cal-btn" 
                onClick={() => setShowFullCalendar(!showFullCalendar)}
              >
                {showFullCalendar ? 'Hide Calendar' : 'View Full Month'}
              </button>
            </div>

            {showFullCalendar ? (
              <div className="full-calendar-grid animate-in">
                {next30Days.map((d, index) => (
                  <button 
                    key={index}
                    className={`date-btn mini ${selectedDate === d.full ? 'active' : ''}`}
                    onClick={() => setSelectedDate(d.full)}
                  >
                    <span className="day">{d.dayName}</span>
                    <span className="num">{d.dayNum}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="date-strip">
                {next30Days.slice(0, 14).map((d, index) => (
                  <button 
                    key={index}
                    className={`date-btn ${selectedDate === d.full ? 'active' : ''}`}
                    onClick={() => setSelectedDate(d.full)}
                  >
                    <span className="day">{d.dayName}</span>
                    <span className="num">{d.dayNum}</span>
                  </button>
                ))}
              </div>
            )}
            
            <h2 className="mt-4">Select a Time</h2>
            <div className="time-slots">
              {['10:00 AM', '11:30 AM', '1:00 PM', '3:00 PM'].map(time => (
                <button 
                  key={time}
                  className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            <div className="btn-group mt-4">
              <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button 
                className="btn-primary" 
                disabled={!selectedTime || !selectedDate}
                onClick={() => setStep(3)}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content animate-in">
            <h2>Client Details</h2>
            <div className="client-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Jessica Vergutz" className="form-input" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="(555) 123-4567" className="form-input" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="jessica@example.com" className="form-input" />
              </div>
            </div>

            <div className="order-summary mt-4">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>{selectedServiceObject?.name}</span>
                <span>${basePrice}.00</span>
              </div>
              {selectedAddons.map(addonId => {
                const addon = currentAddons.find(a => a.id === addonId);
                if (!addon) return null;
                return (
                  <div className="summary-row" key={addon.id}>
                    <span>+ {addon.name}</span>
                    <span>${addon.price}.00</span>
                  </div>
                );
              })}
              <div className="summary-row total">
                <span>Total</span>
                <span>${basePrice + addonTotal}.00</span>
              </div>
              <div className="summary-row deposit">
                <span>Deposit Required Now</span>
                <span>$20.00</span>
              </div>
            </div>

            <div className="btn-group mt-4">
              <button className="btn-secondary" onClick={() => setStep(2)} disabled={isProcessing}>Back</button>
              <button 
                className="btn-apple-pay" 
                onClick={() => {
                  setIsProcessing(true);
                  setTimeout(() => {
                    setIsProcessing(false);
                    setStep(4);
                  }, 1500);
                }}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Pay $20 with Apple Pay '}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-content animate-in success-state">
            <div className="success-icon">✨</div>
            <h2>Booking Confirmed!</h2>
            <p>Your appointment is locked in.</p>
            <p className="sub-text">We've sent your calendar invite and pre-appointment details to your email.</p>
            <button className="btn-secondary mt-4" onClick={() => {
              setStep(1);
              setSelectedService(null);
            }}>Book Another</button>
          </div>
        )}
      </div>

      {/* Studio Policy & Info moved to bottom footer style */}
      <div style={{ textAlign: 'center', marginTop: '24px', paddingBottom: '24px' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
          📍 Alexandria, VA
        </p>
        <button className="policy-btn" onClick={() => setShowPolicy(!showPolicy)}>
          {showPolicy ? 'Hide Studio Policy' : 'View Studio Policy ✨'}
        </button>
        
        {showPolicy && (
          <div className="policy-card animate-in">
            <p><strong>Grace Period:</strong> 10 mins. After that, a $20 late fee applies.</p>
            <p><strong>Cancellations:</strong> Please cancel 48hrs in advance to avoid full charges.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingView;
