import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useFirebase } from './context/FirebaseContext';

// Components
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Tournament from './pages/Tournament';
import Settings from './pages/Settings';
import AboutUs from './pages/AboutUs';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';
import Rules from './pages/Rules';
import SubscriptionPaywall from './pages/SubscriptionPaywall';
import DebugBar from './components/DebugBar';
import TopNavigation from './components/TopNavigation';
import BottomNavigation from './components/BottomNavigation';

// Styles
import './index.css';

const App = () => {
  const { user, userProfile, loading } = useFirebase();
  const [showPaywall, setShowPaywall] = useState(false);
  const [appState, setAppState] = useState('IDLE'); // IDLE, IN_QUEUE, MATCH_FOUND_PENDING, IN_ACTIVE_MATCH, DISPUTED, SUSPENDED
  const navigate = useNavigate();
  const location = useLocation();

  // Check subscription status after login
  useEffect(() => {
    if (user && userProfile) {
      const isActive = userProfile.subscription_status === 'active' || userProfile.gift_card_used;
      const isAuthPage = location.pathname === '/auth';
      
      if (!isActive && !isAuthPage) {
        setShowPaywall(true);
      }
    }
  }, [user, userProfile, location.pathname]);

  // Show loading
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: '#050505'
      }}>
        <div className="animate-glow" style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '24px',
          color: '#06b6d4'
        }}>
          Loading ArenaPlay...
        </div>
      </div>
    );
  }

  // If not logged in, redirect to auth
  const isAuthPage = location.pathname === '/auth';
  const isPaywall = location.pathname === '/paywall';
  
  if (!user && !isAuthPage) {
    return <Navigate to="/auth" replace />;
  }

  // Auth page - no layout
  if (isAuthPage) {
    return <AuthPage />;
  }

  // Check if subscription is active
  const isSubscriptionActive = userProfile?.subscription_status === 'active' || userProfile?.gift_card_used;

  // Show paywall if subscription not active (except on paywall page itself)
  if (showPaywall && !isPaywall && location.pathname !== '/auth') {
    return (
      <>
        <DebugBar />
        <SubscriptionPaywall onClose={() => setShowPaywall(false)} />
      </>
    );
  }

  return (
    <div className="app">
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      
      <DebugBar />
      
      <TopNavigation />
      
      <main className="main-content" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <Routes>
          <Route path="/" element={<Dashboard appState={appState} setAppState={setAppState} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/paywall" element={<SubscriptionPaywall onClose={() => navigate('/')} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default App;
