import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
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
        <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Terms of Service</h1>
        <p style={{ color: '#71717a', marginBottom: '32px' }}>Last Updated: February 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By creating an account on ArenaPlay, you agree to be bound by these Terms of Service 
          and all applicable laws and regulations. If you do not agree to these terms, you should 
          not use our service. Your continued use of ArenaPlay following any changes to these 
          terms constitutes your acceptance of those changes.
        </p>

        <h2>2. User Eligibility</h2>
        <p>
          To use ArenaPlay, you must be at least 13 years of age. Users under 18 should have 
          parental or guardian consent to use our platform. You are responsible for ensuring 
          that your use of the service complies with all applicable laws and regulations in 
          your jurisdiction.
        </p>

        <h2>3. Account Registration and Security</h2>
        <p>
          Users must provide accurate information during registration. You are responsible for 
          maintaining the confidentiality of your account credentials and for all activities 
          that occur under your account. You agree to notify us immediately of any unauthorized 
          use of your account.
        </p>

        <h2>4. User Conduct</h2>
        <p>
          We maintain a Zero Tolerance Policy toward cheating, hacking, or the use of 
          third-party software to gain an unfair advantage. This includes but is not limited to:
        </p>
        <ul>
          <li>Using aimbots, wallhacks, or other cheating software</li>
          <li>Match fixing or colluding with opponents</li>
          <li>Creating multiple accounts to manipulate rankings</li>
          <li>Exploiting bugs or glitches for unfair advantage</li>
        </ul>

        <h2>5. Harassment and Toxic Behavior</h2>
        <p>
          Harassment, hate speech, and toxic behavior are grounds for immediate account 
          suspension. This includes but is not limited to:
        </p>
        <ul>
          <li>Verbal abuse toward other players</li>
          <li>Discriminatory language or actions</li>
          <li>Threats or intimidation</li>
          <li>Spamming or disruptive behavior</li>
        </ul>

        <h2>6. Prohibited Activities</h2>
        <p>
          You agree not to engage in any activity that:
        </p>
        <ul>
          <li>Violates any applicable laws or regulations</li>
          <li>Infringes upon the rights of others</li>
          <li>Interferes with or disrupts the service</li>
          <li>Attempts to gain unauthorized access to any part of the platform</li>
          <li>Engages in any form of commercial solicitation</li>
        </ul>

        <h2>7. Intellectual Property</h2>
        <p>
          All content, features, and functionality of ArenaPlay are owned by us and are 
          protected by international copyright, trademark, patent, trade secret, and other 
          intellectual property laws. You may not copy, modify, distribute, sell, or lease 
          any part of our service without prior written consent.
        </p>

        <h2>8. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your account immediately, without prior 
          notice or liability, for any reason, including but not limited to breach of these 
          Terms of Service. Upon termination, your right to use the service will immediately cease.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          In no event shall ArenaPlay be liable for any indirect, incidental, special, 
          consequential, or punitive damages, including without limitation, loss of profits, 
          data, use, goodwill, or other intangible losses, resulting from your use of or 
          inability to use the service.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms of Service shall be governed by and construed in accordance with the 
          laws of India, without regard to its conflict of law provisions.
        </p>

        <h2>11. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us at 
          support@arenaplay.16gmail.com
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
