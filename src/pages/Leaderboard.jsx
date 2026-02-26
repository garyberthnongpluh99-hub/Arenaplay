import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFirebase } from '../context/FirebaseContext';

const Leaderboard = () => {
  const { getLeaderboard, getTop32Div1 } = useFirebase();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [showTop32, setShowTop32] = useState(false);

  useEffect(() => {
    loadLeaderboard();
  }, [selectedDivision]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await getLeaderboard(selectedDivision, 100);
      setPlayers(data);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    }
    setLoading(false);
  };

  const loadTop32 = async () => {
    setLoading(true);
    setShowTop32(true);
    try {
      const data = await getTop32Div1();
      setPlayers(data);
    } catch (error) {
      console.error('Error loading top 32:', error);
    }
    setLoading(false);
  };

  const divisions = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  const getRankStyle = (index) => {
    if (index < 3) {
      return {
        background: index === 0 ? 'linear-gradient(135deg, #ffd700, #ffb700)' :
                   index === 1 ? 'linear-gradient(135deg, #c0c0c0, #a0a0a0)' :
                   'linear-gradient(135deg, #cd7f32, #b87333)',
        color: '#000'
      };
    }
    return {};
  };

  return (
    <motion.div 
      className="container" 
      style={{ paddingTop: '24px', paddingBottom: '100px' }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '24px' }}>Leaderboard</h1>

      {/* Division Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '24px',
        overflowX: 'auto',
        paddingBottom: '8px',
        flexWrap: 'nowrap'
      }}>
        <button
          onClick={() => { setShowTop32(false); setSelectedDivision(null); loadLeaderboard(); }}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: !selectedDivision && !showTop32 ? 'linear-gradient(135deg, #06b6d4, #22d3ee)' : '#111111',
            color: !selectedDivision && !showTop32 ? '#050505' : '#a1a1aa',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s ease'
          }}
        >
          All
        </button>
        
        {divisions.map(div => (
          <button
            key={div}
            onClick={() => { setShowTop32(false); setSelectedDivision(div); }}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              background: selectedDivision === div ? 'linear-gradient(135deg, #06b6d4, #22d3ee)' : '#111111',
              color: selectedDivision === div ? '#050505' : '#a1a1aa',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease'
            }}
          >
            Div {div}
          </button>
        ))}

        <button
          onClick={loadTop32}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '2px solid #ffd700',
            background: showTop32 ? 'linear-gradient(135deg, #ffd700, #ffb700)' : 'transparent',
            color: showTop32 ? '#050505' : '#ffd700',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s ease'
          }}
        >
          🏆 Top 32 Div 1
        </button>
      </div>

      {/* Leaderboard Table */}
      <div style={{ 
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        {/* Table Header - Sticky */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '60px 1fr 80px 100px 100px',
          gap: '12px',
          padding: '16px 20px',
          background: '#111111',
          borderBottom: '1px solid #27272a',
          fontWeight: 600,
          fontSize: '12px',
          color: '#71717a',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          minWidth: '600px'
        }}>
          <div>Rank</div>
          <div>Player</div>
          <div>Div</div>
          <div>Points</div>
          <div>Rating</div>
        </div>

        {/* Table Body - Horizontal Scroll */}
        <div style={{ 
          overflowX: 'auto',
          maxHeight: '70vh',
          overflowY: 'auto'
        }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#71717a' }}>
              Loading...
            </div>
          ) : players.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#71717a' }}>
              No players found
            </div>
          ) : (
            players.map((player, index) => (
              <div
                key={player.id || index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 80px 100px 100px',
                  gap: '12px',
                  padding: '16px 20px',
                  borderBottom: '1px solid #27272a',
                  alignItems: 'center',
                  minWidth: '600px',
                  background: index < 3 && showTop32 ? 'rgba(255, 215, 0, 0.05)' : 'transparent',
                  transition: 'background 0.2s ease'
                }}
              >
                {/* Rank */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    className="rank-badge"
                    style={{
                      ...getRankStyle(index),
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '14px'
                    }}
                  >
                    {index + 1}
                  </span>
                </div>

                {/* Player */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: player.profilePhoto ? `url(${player.profilePhoto})` : 'linear-gradient(135deg, #06b6d4, #22d3ee)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '2px solid #27272a'
                  }}></div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '15px' }}>{player.username || 'Player'}</div>
                    <div style={{ fontSize: '12px', color: '#71717a' }}>
                      {player.win_rate || 0}% Win Rate
                    </div>
                  </div>
                </div>

                {/* Division */}
                <div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: 'rgba(6, 182, 212, 0.2)',
                    color: '#06b6d4',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}>
                    Div {player.division}
                  </span>
                </div>

                {/* Points */}
                <div style={{ fontWeight: 600, fontSize: '16px', color: '#06b6d4' }}>
                  {player.division >= 4 ? (player.points || 0) : '-'}
                </div>

                {/* Rating */}
                <div style={{ fontWeight: 700, fontSize: '16px', color: '#22d3ee' }}>
                  {player.elo_rating || 1500}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mobile Scroll Hint */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '12px', 
        fontSize: '12px', 
        color: '#71717a',
        display: 'block',
        '@media (min-width: 768px)': { display: 'none' }
      }}>
        ← Scroll horizontally to see all columns →
      </div>
    </motion.div>
  );
};

export default Leaderboard;
