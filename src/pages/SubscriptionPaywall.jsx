import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';

const SubscriptionPaywall = ({ onClose }) => {
  const { applyGiftCard, submitSubscriptionPayment, UPI_QR_CODE, GIFT_CARD_CODE } = useFirebase();
  const navigate = useNavigate();
  const [giftCardCode, setGiftCardCode] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [showGiftCard, setShowGiftCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle gift card submission
  const handleGiftCardSubmit = async () => {
    if (!giftCardCode.trim()) {
      setMessage('Please enter a gift card code');
      return;
    }

    setLoading(true);
    try {
      const result = await applyGiftCard(giftCardCode.trim());
      setMessage(result.message);
      if (result.success) {
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
    setLoading(false);
  };

  // Handle UPI payment submission
  const handlePaymentSubmit = async () => {
    if (!utrNumber.trim() || !paymentScreenshot) {
      setMessage('Please enter UTR number and upload payment screenshot');
      return;
    }

    setLoading(true);
    try {
      await submitSubscriptionPayment(paymentScreenshot, utrNumber);
      setMessage('Payment submitted for verification! You will be notified once verified.');
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
    setLoading(false);
  };

  // Handle screenshot upload
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
    <div className="paywall-overlay">
      <div className="paywall-card animate-slide-in">
        {/* NO Close Button - User must complete subscription */}

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            marginBottom: '8px'
          }}>
            ARENAPLAY
          </h2>
          <p style={{ color: '#a1a1aa' }}>Premium eSports Experience</p>
        </div>

        {/* Price */}
        <div style={{ marginBottom: '32px' }}>
          <span className="paywall-price">₹50</span>
          <span className="paywall-period">/month</span>
        </div>

        {/* Features */}
        <ul className="paywall-features">
          <li>Access to ranked matchmaking</li>
          <li>Division 1 tournament entries</li>
          <li>Priority match verification</li>
          <li>Global leaderboard access</li>
          <li>Exclusive rewards & badges</li>
        </ul>

        {/* Gift Card Section Toggle */}
        <button
          onClick={() => setShowGiftCard(!showGiftCard)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#06b6d4',
            fontSize: '14px',
            marginBottom: '16px',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {showGiftCard ? 'Hide Gift Card' : 'Have a Gift Card?'}
        </button>

        {/* Gift Card Input */}
        {showGiftCard && (
          <div style={{ marginBottom: '24px' }}>
            <input
              type="text"
              value={giftCardCode}
              onChange={(e) => setGiftCardCode(e.target.value)}
              placeholder="Enter gift card code"
              className="input-field"
              style={{ marginBottom: '12px' }}
            />
            <button
              className="neon-button"
              onClick={handleGiftCardSubmit}
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? 'Applying...' : 'Apply Gift Card'}
            </button>
          </div>
        )}

        {/* UPI Payment (if no gift card) */}
        {!showGiftCard && (
          <>
            {/* QR Code */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <p style={{ color: '#a1a1aa', marginBottom: '12px' }}>Scan to Pay ₹50</p>
              <img 
                src={UPI_QR_CODE} 
                alt="UPI QR Code" 
                style={{ 
                  width: '150px', 
                  height: '150px', 
                  borderRadius: '8px',
                  border: '2px solid #27272a'
                }} 
              />
            </div>

            {/* UTR Input */}
            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                placeholder="Enter UTR number"
                className="input-field"
              />
            </div>

            {/* Screenshot Upload */}
            <div style={{ marginBottom: '16px' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleScreenshotUpload}
                className="input-field"
                style={{ padding: '10px' }}
              />
              {paymentScreenshot && (
                <img 
                  src={paymentScreenshot} 
                  alt="Payment" 
                  style={{ 
                    width: '100px', 
                    marginTop: '8px', 
                    borderRadius: '4px' 
                  }} 
                />
              )}
            </div>

            <button
              className="neon-button"
              onClick={handlePaymentSubmit}
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? 'Submitting...' : 'Submit Payment'}
            </button>
          </>
        )}

        {/* Message */}
        {message && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            borderRadius: '8px',
            background: message.includes('success') || message.includes('verified') 
              ? 'rgba(16, 185, 129, 0.1)' 
              : 'rgba(239, 68, 68, 0.1)',
            color: message.includes('success') || message.includes('verified') 
              ? '#10b981' 
              : '#ef4444',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        {/* NO Skip button - User must complete subscription */}
      </div>
    </div>
  );
};

export default SubscriptionPaywall;
