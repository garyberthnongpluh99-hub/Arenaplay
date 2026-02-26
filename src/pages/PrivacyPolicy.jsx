import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
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
        <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Privacy Policy</h1>
        <p style={{ color: '#71717a', marginBottom: '32px' }}>Last Updated: February 2026</p>

        <h2>Commitment to Data Integrity</h2>
        <p>
          At ArenaPlay, we take your privacy seriously. This Privacy Policy outlines how we 
          collect, use, disclose, and safeguard your information when you use our platform. 
          We are committed to protecting your personal data and ensuring transparency in all 
          our data practices.
        </p>

        <h2>1. Information Collection</h2>
        <p>
          We collect minimal data required for platform functionality:
        </p>
        <ul>
          <li><strong>Account Information:</strong> Username, email address, and password (encrypted)</li>
          <li><strong>Profile Data:</strong> Profile photo, game preferences, and display settings</li>
          <li><strong>Match Data:</strong> Game results, scores, and match history for ranking purposes</li>
          <li><strong>Payment Information:</strong> Transaction records for subscription and tournament entries</li>
        </ul>
        <p>
          We do not track your browsing habits outside of the ArenaPlay domain. We collect only 
          information that is necessary for the proper functioning of our competitive gaming platform.
        </p>

        <h2>2. Data Usage</h2>
        <p>
          Your data is used strictly for the following purposes:
        </p>
        <ul>
          <li><strong>Matchmaking:</strong> To pair you with appropriate opponents based on skill level</li>
          <li><strong>Tournament Processing:</strong> To manage and verify tournament entries and results</li>
          <li><strong>User Experience:</strong> To improve your experience on our platform</li>
          <li><strong>Communication:</strong> To send important updates about your account and matches</li>
          <li><strong>Analytics:</strong> To understand platform usage and improve our services</li>
        </ul>
        <p>
          We utilize industry-standard encryption to protect your account credentials and personal 
          information from unauthorized access.
        </p>

        <h2>3. Third-Party Sharing</h2>
        <p>
          ArenaPlay does not sell user data to third-party advertisers. Your personal information 
          is never shared with advertisers or marketing companies.
        </p>
        <p>
          Data is only shared with game API providers to verify match statistics when necessary 
          for tournament verification. All third-party partners are bound by confidentiality 
          agreements and are required to comply with applicable data protection laws.
        </p>

        <h2>4. Data Storage and Security</h2>
        <p>
          Your data is stored on secure servers with industry-standard security measures. We 
          implement various technical and organizational measures to protect your information, 
          including:
        </p>
        <ul>
          <li>SSL encryption for all data transmission</li>
          <li>Secure password hashing</li>
          <li>Regular security audits</li>
          <li>Access controls and authentication requirements</li>
        </ul>

        <h2>5. User Rights</h2>
        <p>
          Under global data protection laws, you have the following rights:
        </p>
        <ul>
          <li><strong>Right to Access:</strong> You can request a copy of all personal data we hold about you</li>
          <li><strong>Right to Export:</strong> You can request your data in a portable, machine-readable format</li>
          <li><strong>Right to Correction:</strong> You can request correction of inaccurate personal data</li>
          <li><strong>Right to Deletion:</strong> You can request deletion of your personal data at any time</li>
          <li><strong>Right to Object:</strong> You can object to certain processing of your data</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at support@arenaplay.16gmail.com or 
          use the account deletion option in your Profile Settings.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain your personal data only for as long as necessary to provide our services 
          and fulfill the purposes outlined in this policy. Match history and ranking data 
          may be retained longer for statistical purposes, but you can request deletion of 
          your account and associated data at any time.
        </p>

        <h2>7. Children's Privacy</h2>
        <p>
          Our service is not intended for children under 13 years of age. We do not knowingly 
          collect personal information from children under 13. If we become aware that we have 
          collected data from a child under 13, we will take steps to delete such information 
          promptly.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any 
          changes by posting the new Privacy Policy on this page and updating the "Last Updated" 
          date. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at 
          support@arenaplay.16gmail.com
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
