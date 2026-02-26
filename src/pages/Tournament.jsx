import React, { useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';

const Tournament = () => {
  const { userProfile, submitTournamentPayment, UPI_QR_CODE } = useFirebase();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [utrNumber, setUtrNumber] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);

  const isTop32Eligible = userProfile?.division === 1 && userProfile?.payment_status === 'verified';

  const handleSubmitPayment = async () => {
    if (!paymentScreenshot || !utrNumber) {
      alert('Please upload payment screenshot and enter UTR number');
      return;
    }

    setPaymentLoading(true);
    try {
      await submitTournamentPayment(paymentScreenshot, utrNumber);
      alert('Payment submitted for verification!');
      setShowPaymentModal(false);
    } catch (error) {
      alert('Error submitting payment: ' + error.message);
    }
    setPaymentLoading(false);
  };

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentScreenshot(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '24px', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Tournament</h1>
        <p style={{ color: '#a1a1aa', fontSize: '14px' }}>Champions League - The ultimate competitive event</p>
      </div>

      {/* Tournament Header - Responsive */}
      <div 
        className="tournament-header"
        style={{ 
          marginBottom: '24px',
          padding: '24px 16px',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.1))',
          border: '2px solid #06b6d4',
          borderRadius: '16px',
          textAlign: 'center',
          aspectRatio: '16/9',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(6, 182, 212, 0.15)'
        }}
      >
        <h2 style={{ fontSize: '22px', marginBottom: '8px' }}>🏆 Champions League</h2>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: 800, 
          color: '#06b6d4', 
          fontFamily: 'Orbitron, sans-serif',
          textShadow: '0 0 30px rgba(6, 182, 212, 0.5)'
        }}>
          ₹100,000 PRIZE POOL
        </div>
        
        {/* Prize Breakdown - Responsive */}
        <div 
          className="prize-breakdown"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '12px', 
            marginTop: '20px',
            width: '100%',
            maxWidth: '500px'
          }}
        >
          <div 
            className="prize-card"
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px', 
              padding: '16px 12px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '18px', marginBottom: '4px' }}>🥇 1st</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#10b981', fontFamily: 'Orbitron, sans-serif' }}>₹100k</div>
          </div>
          <div 
            className="prize-card"
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px', 
              padding: '16px 12px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '18px', marginBottom: '4px' }}>🥈 2nd</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#10b981', fontFamily: 'Orbitron, sans-serif' }}>₹50k</div>
          </div>
          <div 
            className="prize-card"
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px', 
              padding: '16px 12px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '18px', marginBottom: '4px' }}>🥉 3rd</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#10b981', fontFamily: 'Orbitron, sans-serif' }}>₹30k</div>
          </div>
        </div>
      </div>

      {/* Entry Requirements */}
      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Entry Requirements</h3>
        
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px',
            background: '#111111',
            borderRadius: '8px'
          }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>Current Division</div>
              <div style={{ color: '#a1a1aa', fontSize: '12px' }}>Must be in Division 1</div>
            </div>
            <div style={{
              fontWeight: 700,
              color: userProfile?.division === 1 ? '#10b981' : '#ef4444',
              fontSize: '18px'
            }}>
              DIV {userProfile?.division || 10}
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px',
            background: '#111111',
            borderRadius: '8px'
          }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>Entry Fee</div>
              <div style={{ color: '#a1a1aa', fontSize: '12px' }}>One-time payment</div>
            </div>
            <div style={{ fontWeight: 700, color: '#f59e0b', fontSize: '18px' }}>₹1,500</div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px',
            background: '#111111',
            borderRadius: '8px'
          }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>Payment Status</div>
              <div style={{ color: '#a1a1aa', fontSize: '12px' }}>Verification required</div>
            </div>
            <div style={{
              fontWeight: 700,
              color: userProfile?.payment_status === 'verified' ? '#10b981' : '#f59e0b',
              fontSize: '16px',
              textTransform: 'uppercase'
            }}>
              {userProfile?.payment_status || 'Pending'}
            </div>
          </div>
        </div>

        {/* Pay Entry Fee Button */}
        {userProfile?.division === 1 && userProfile?.payment_status !== 'verified' && (
          <button
            className="neon-button"
            onClick={() => setShowPaymentModal(true)}
            style={{ 
              width: '100%', 
              marginTop: '20px', 
              padding: '14px',
              fontSize: '15px',
              transition: 'all 0.3s ease'
            }}
          >
            Pay Entry Fee
          </button>
        )}

        {isTop32Eligible && (
          <div style={{
            marginTop: '20px',
            padding: '14px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid #10b981',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontWeight: 600, color: '#10b981', fontSize: '15px' }}>✓ You're Qualified!</div>
            <div style={{ color: '#a1a1aa', fontSize: '12px', marginTop: '4px' }}>
              Champions League spot confirmed
            </div>
          </div>
        )}
      </div>

      {/* Tournament Rules */}
      <div className="glass-card">
        <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Tournament Rules</h3>
        
        <ul style={{ listStyle: 'none', display: 'grid', gap: '12px' }}>
          <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ color: '#06b6d4', fontWeight: 700, fontSize: '13px' }}>01.</span>
            <span style={{ fontSize: '14px', color: '#a1a1aa' }}>Top 32 Division 1 players qualify</span>
          </li>
          <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ color: '#06b6d4', fontWeight: 700, fontSize: '13px' }}>02.</span>
            <span style={{ fontSize: '14px', color: '#a1a1aa' }}>Entry fee of ₹1,500 required</span>
          </li>
          <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ color: '#06b6d4', fontWeight: 700, fontSize: '13px' }}>03.</span>
            <span style={{ fontSize: '14px', color: '#a1a1aa' }}>Payment verification needed</span>
          </li>
          <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ color: '#06b6d4', fontWeight: 700, fontSize: '13px' }}>04.</span>
            <span style={{ fontSize: '14px', color: '#a1a1aa' }}>Unpaid spots go to 33rd ranked</span>
          </li>
          <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ color: '#06b6d4', fontWeight: 700, fontSize: '13px' }}>05.</span>
            <span style={{ fontSize: '14px', color: '#a1a1aa' }}>Group stages (A-H) then knockout</span>
          </li>
        </ul>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center', fontSize: '20px' }}>Pay Entry Fee</h2>
            
            {/* QR Code */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <p style={{ color: '#a1a1aa', marginBottom: '12px', fontSize: '14px' }}>Scan to Pay</p>
              <img 
                src={UPI_QR_CODE} 
                alt="UPI QR Code" 
                style={{ 
                  width: '180px', 
                  height: '180px', 
                  borderRadius: '12px',
                  border: '2px solid #27272a'
                }} 
              />
              <p style={{ marginTop: '10px', color: '#06b6d4', fontWeight: 600 }}>₹1,500</p>
            </div>

            {/* UTR Input */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#a1a1aa', fontSize: '14px' }}>
                UTR Number
              </label>
              <input
                type="text"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                placeholder="Enter 12-digit UTR"
                className="input-field"
              />
            </div>

            {/* Screenshot Upload */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#a1a1aa', fontSize: '14px' }}>
                Payment Screenshot
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleScreenshotUpload}
                className="input-field"
                style={{ padding: '12px' }}
              />
              {paymentScreenshot && (
                <img 
                  src={paymentScreenshot} 
                  alt="Payment screenshot" 
                  style={{ 
                    width: '100%', 
                    marginTop: '12px', 
                    borderRadius: '8px',
                    border: '2px solid #27272a'
                  }} 
                />
              )}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                className="outline-button"
                onClick={() => setShowPaymentModal(false)}
                style={{ flex: 1, padding: '12px' }}
              >
                Cancel
              </button>
              <button
                className="neon-button"
                onClick={handleSubmitPayment}
                disabled={paymentLoading}
                style={{ flex: 1, padding: '12px' }}
              >
                {paymentLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tournament;
