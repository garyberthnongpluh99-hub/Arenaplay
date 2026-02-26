import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ paddingTop: '24px', maxWidth: '800px' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/settings')}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#06b6d4',
          fontSize: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px'
        }}
      >
        ← Back to Settings
      </button>

      <div className="legal-content">
        <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Professional Support for Professional Players</h1>
        <p style={{ color: '#a1a1aa', marginBottom: '32px' }}>
          We're here to help you succeed in your competitive gaming journey
        </p>

        {/* Contact Info */}
        <div className="glass-card" style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '24px', color: '#06b6d4' }}>Technical Inquiries</h2>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            <div style={{
              padding: '20px',
              background: '#111111',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(6, 182, 212, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                📧
              </div>
              <div>
                <div style={{ color: '#71717a', fontSize: '14px', marginBottom: '4px' }}>Email Support</div>
                <div style={{ fontSize: '18px', fontWeight: 600 }}>support@arenaplay.16gmail.com</div>
              </div>
            </div>

            <div style={{
              padding: '20px',
              background: '#111111',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(6, 182, 212, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                🎮
              </div>
              <div>
                <div style={{ color: '#71717a', fontSize: '14px', marginBottom: '4px' }}>Discord Community</div>
                <div style={{ fontSize: '18px', fontWeight: 600 }}>Join our Discord server</div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="glass-card" style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '24px', color: '#06b6d4' }}>Connect With Us</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <a
              href="https://www.instagram.com/arenaplay16?igsh=MXg2eXY4OHY4dDh5ZA=="
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '20px',
                background: '#111111',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                color: '#fff',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ fontSize: '28px' }}>📸</span>
              <div>
                <div style={{ fontWeight: 600 }}>Instagram</div>
                <div style={{ fontSize: '12px', color: '#71717a' }}>@arenaplay16</div>
              </div>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61575643325555&sfnsn=wa"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '20px',
                background: '#111111',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                color: '#fff',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ fontSize: '28px' }}>📘</span>
              <div>
                <div style={{ fontWeight: 600 }}>Facebook</div>
                <div style={{ fontSize: '12px', color: '#71717a' }}>ArenaPlay</div>
              </div>
            </a>
          </div>
        </div>

        {/* Support Hours */}
        <div className="glass-card">
          <h2 style={{ marginBottom: '16px', color: '#06b6d4' }}>Support Hours</h2>
          <p style={{ color: '#a1a1aa', lineHeight: '1.8' }}>
            Our support team is available to assist you with any issues regarding account access, 
            bug reports, or site performance. We aim to respond to all inquiries within 24-48 hours.
          </p>
          <ul style={{ marginTop: '16px', color: '#a1a1aa' }}>
            <li>Monday - Friday: 10:00 AM - 8:00 PM IST</li>
            <li>Saturday: 10:00 AM - 4:00 PM IST</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>

        {/* Additional Info */}
        <div style={{ marginTop: '32px', textAlign: 'center', color: '#71717a' }}>
          <p>
            For urgent matters related to live tournaments, please reach out through our Discord 
            community for faster response times.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
