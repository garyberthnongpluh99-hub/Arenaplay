import React from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';

const DebugBar = () => {
  const { user, userProfile, logOut } = useFirebase();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="debug-bar" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '40px',
      zIndex: 200,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 24px',
      background: '#0a0a0a',
      borderBottom: '1px solid #27272a'
    }}>
      {/* Status Indicator */}
      <div className="status-indicator">
        <div className="status-dot" style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#10b981',
          animation: 'pulse 2s infinite'
        }}></div>
        <span style={{ fontSize: '12px', color: '#10b981' }}>STATUS: Connected</span>
      </div>

      {/* User Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {userProfile && (
          <>
            <span style={{ fontSize: '12px', color: '#a1a1aa' }}>
              {user.email} • Div {userProfile.division} • {userProfile.points}pts • Rating: {userProfile.elo_rating}
            </span>
            <button
              onClick={handleSignOut}
              style={{
                background: 'transparent',
                border: '1px solid #06b6d4',
                color: '#06b6d4',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DebugBar;
