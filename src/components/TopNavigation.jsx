import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';

const TopNavigation = () => {
  const { userProfile } = useFirebase();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
    { path: '/tournament', label: 'Tournament', icon: '🎯' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <nav className="desktop-nav" style={{
      position: 'fixed',
      top: '40px',
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'rgba(5, 5, 5, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #27272a',
      padding: '0 24px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '60px'
      }}>
        {/* Logo */}
        <div 
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '24px',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            ARENAPLAY
          </div>
          <span style={{
            fontSize: '12px',
            color: '#a1a1aa',
            letterSpacing: '2px'
          }}>
            COMPETE • CONNECT • CONQUER
          </span>
        </div>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: isActive ? '#06b6d4' : '#a1a1aa',
                background: isActive ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              })}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* User Info */}
        {userProfile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: userProfile.profilePhoto ? `url(${userProfile.profilePhoto})` : 'linear-gradient(135deg, #06b6d4, #22d3ee)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '2px solid #06b6d4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: '#050505',
              fontSize: '14px'
            }}>
              {!userProfile.profilePhoto && userProfile.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>{userProfile.username}</div>
              <div style={{ fontSize: '12px', color: '#71717a' }}>Div {userProfile.division}</div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavigation;
