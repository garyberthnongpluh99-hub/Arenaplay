import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';

const Settings = () => {
  const { user, userProfile, updateProfilePhoto, logOut, deleteAccount, GIFT_CARD_CODE } = useFirebase();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Handle profile photo upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must be less than 2MB');
      return;
    }

    setLoading(true);
    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        await updateProfilePhoto(base64String);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error uploading photo');
      setLoading(false);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Handle delete account
  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await deleteAccount();
      navigate('/auth');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Error deleting account: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ paddingTop: '24px', maxWidth: '800px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Settings</h1>
        <p style={{ color: '#a1a1aa' }}>Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '20px' }}>Profile</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {/* Profile Photo */}
          <div className="profile-photo-upload" style={{ position: 'relative' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: userProfile?.profilePhoto 
                ? `url(${userProfile.profilePhoto})` 
                : 'linear-gradient(135deg, #06b6d4, #22d3ee)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '3px solid #06b6d4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 700,
              color: '#050505'
            }}>
              {!userProfile?.profilePhoto && userProfile?.username?.charAt(0).toUpperCase()}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
                borderRadius: '50%'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              padding: '8px',
              textAlign: 'center',
              borderRadius: '0 0 50% 50%',
              fontSize: '12px',
              color: '#fff'
            }}>
              {loading ? 'Uploading...' : 'Change Photo'}
            </div>
          </div>

          {/* User Info */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ color: '#71717a', fontSize: '14px' }}>Username</label>
              <div style={{ fontSize: '24px', fontWeight: 600 }}>{userProfile?.username || 'Player'}</div>
            </div>
            <div>
              <label style={{ color: '#71717a', fontSize: '14px' }}>Email</label>
              <div style={{ color: '#a1a1aa' }}>{user?.email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Section */}
      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>Subscription</h3>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          background: '#111111',
          borderRadius: '8px'
        }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>Status</div>
            <div style={{ 
              color: userProfile?.subscription_status === 'active' || userProfile?.gift_card_used 
                ? '#10b981' 
                : '#f59e0b',
              textTransform: 'uppercase',
              fontWeight: 600
            }}>
              {userProfile?.subscription_status === 'active' || userProfile?.gift_card_used 
                ? 'Active' 
                : 'Inactive'}
            </div>
          </div>
          <button
            className="outline-button"
            onClick={() => navigate('/paywall')}
            style={{ padding: '10px 20px' }}
          >
            {userProfile?.subscription_status === 'active' || userProfile?.gift_card_used 
              ? 'Manage' 
              : 'Subscribe'}
          </button>
        </div>
      </div>

      {/* Security & Account Management */}
      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '20px' }}>Security & Account Management</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Sign Out */}
          <button
            className="outline-button"
            onClick={handleSignOut}
            style={{ 
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>

          {/* Delete Account */}
          <button
            className="danger-button"
            onClick={() => setShowDeleteConfirm(true)}
            style={{ 
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            <span>⚠️</span>
            <span>Delete Account</span>
          </button>
        </div>
      </div>

      {/* Legal Pages */}
      <div className="glass-card">
        <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>Information</h3>
        
        <div style={{ display: 'grid', gap: '12px' }}>
          <button
            onClick={() => navigate('/about')}
            style={{
              padding: '16px',
              background: '#111111',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>About Us</span>
            <span style={{ color: '#71717a' }}>→</span>
          </button>

          <button
            onClick={() => navigate('/terms')}
            style={{
              padding: '16px',
              background: '#111111',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Terms of Service</span>
            <span style={{ color: '#71717a' }}>→</span>
          </button>

          <button
            onClick={() => navigate('/privacy')}
            style={{
              padding: '16px',
              background: '#111111',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Privacy Policy</span>
            <span style={{ color: '#71717a' }}>→</span>
          </button>

          <button
            onClick={() => navigate('/contact')}
            style={{
              padding: '16px',
              background: '#111111',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Contact Us</span>
            <span style={{ color: '#71717a' }}>→</span>
          </button>

          <button
            onClick={() => navigate('/rules')}
            style={{
              padding: '16px',
              background: '#111111',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Rules</span>
            <span style={{ color: '#71717a' }}>→</span>
          </button>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ marginBottom: '16px', color: '#ef4444' }}>Delete Account</h2>
            <p style={{ color: '#a1a1aa', marginBottom: '24px' }}>
              You are about to delete your ArenaPlay identity. This action is irreversible. 
              All tournament history, rank achievements, and earned badges will be permanently 
              erased from our servers.
            </p>
            <p style={{ marginBottom: '24px', fontWeight: 600 }}>
              Do you wish to proceed?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                className="outline-button"
                onClick={() => setShowDeleteConfirm(false)}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                className="danger-button"
                onClick={handleDeleteAccount}
                disabled={loading}
                style={{ flex: 1 }}
              >
                {loading ? 'Deleting...' : 'Delete Forever'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
