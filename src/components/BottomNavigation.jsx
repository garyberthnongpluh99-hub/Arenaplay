import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';

const BottomNavigation = () => {
  const { userProfile } = useFirebase();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/leaderboard', label: 'Rank', icon: '🏆' },
    { path: '/tournament', label: 'Tournament', icon: '🎯' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <nav 
      className="bottom-nav" 
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        background: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid #27272a',
        padding: '12px 0 24px 0',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)'
      }}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: '10px 16px',
            borderRadius: '12px',
            color: isActive ? '#06b6d4' : '#71717a',
            textDecoration: 'none',
            fontSize: '11px',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            background: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent'
          })}
        >
          <span style={{ fontSize: '22px', transition: 'transform 0.3s ease' }}>{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavigation;
