import React from 'react';
import { useNavigate } from 'react-router-dom';

const Rules = () => {
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
        <h1 style={{ fontSize: '36px', marginBottom: '32px' }}>ArenaPlay Rules & Regulations</h1>

        <h2>Season Structure</h2>
        <p>
          Each ArenaPlay season lasts for 30 days. During this period, players compete in ranked 
          matches to climb the division ladder and earn rewards. Seasons are designed to provide 
          a fair and competitive environment for all skill levels.
        </p>

        <h2>Division System Overview</h2>
        <p>
          ArenaPlay uses a dual-tier ranking system to ensure fair competition at every level:
        </p>

        <h3>Progression Tier (Division 10-4)</h3>
        <ul>
          <li><strong>Points System:</strong> Win = 3pts, Draw = 1pt, Loss = 0pts</li>
          <li><strong>Promotion Thresholds:</strong></li>
          <ul>
            <li>Division 10 → 9: 30 points</li>
            <li>Division 9 → 8: 35 points</li>
            <li>Division 8 → 7: 40 points</li>
            <li>Division 7 → 6: 45 points</li>
            <li>Division 6 → 5: 50 points</li>
            <li>Division 5 → 4: 55 points</li>
            <li>Division 4 → 3: 60 points</li>
          </ul>
          <li><strong>Auto-Promotion:</strong> Automatically promoted when reaching the point threshold</li>
          <li><strong>Point Carryover:</strong> Remaining points carry over after promotion</li>
        </ul>

        <h3>Elite Tier (Division 3-1)</h3>
        <ul>
          <li><strong>MMR System:</strong> Elo-based rating starting at 1500</li>
          <li><strong>K-Factors:</strong></li>
          <ul>
            <li>Division 3: K=40 (High volatility)</li>
            <li>Division 2: K=32 (Medium volatility)</li>
            <li>Division 1: K=24 (Low volatility)</li>
          </ul>
          <li><strong>Rating Range:</strong> Matches within ±200 rating</li>
          <li><strong>Promotions:</strong> Based on being in Top Rated players list</li>
        </ul>

        <h2>Match Rules</h2>
        
        <h3>Matchmaking</h3>
        <ul>
          <li>Players are matched based on their current division and rating</li>
          <li>Matchmaking range: ±200 rating for Elite Tier</li>
          <li>Both players must accept the match within 30 seconds</li>
          <li>Declining a match may result in penalty points</li>
        </ul>

        <h3>Monthly Match Limits</h3>
        <ul>
          <li>Division 1: 60 matches/month</li>
          <li>Division 2: 70 matches/month</li>
          <li>Division 3: 80 matches/month</li>
          <li>Progression Tier (4-10): 100 matches/month</li>
        </ul>

        <h3>Opponent Restrictions</h3>
        <ul>
          <li>Cannot play the same opponent more than once per week</li>
          <li>This restriction resets every Sunday at midnight</li>
        </ul>

        <h3>Room ID Requirements</h3>
        <ul>
          <li>All players must share a valid Room ID before starting a match</li>
          <li>The Room ID must be entered in the match setup</li>
          <li>Room IDs are verified for match authentication</li>
        </ul>

        <h2>Match Verification</h2>
        
        <h3>Screenshot Submission</h3>
        <ul>
          <li>Both players must submit match screenshots</li>
          <li>Screenshots must clearly show the match result</li>
          <li>Verification is required for rating updates</li>
          <li>Discrepancies in scores lead to match disputes</li>
        </ul>

        <h3>Dispute Resolution</h3>
        <ul>
          <li>Disputes are reviewed by our moderation team</li>
          <li>Provide clear evidence when filing a dispute</li>
          <li>False disputes may result in penalties</li>
          <li>All decisions are final</li>
        </ul>

        <h2>Inactivity & Decay Rules</h2>
        
        <h3>Season End Rating Compression</h3>
        <ul>
          <li><strong>Division 1:</strong> Rating resets to 75%</li>
          <li><strong>Division 2-3:</strong> Rating resets to 80%</li>
          <li><strong>Progression Tier (4-10):</strong> Points reset to 0</li>
        </ul>

        <h3>Inactivity Decay</h3>
        <ul>
          <li>Players inactive for 7+ days may experience rating decay</li>
          <li>Decay is applied weekly during season</li>
          <li>Playing matches resets the decay timer</li>
          <li>Top Division 1 players are exempt from decay</li>
        </ul>

        <h2>Tournament Rules</h2>
        
        <h3>Champions League</h3>
        <ul>
          <li>Top 32 Division 1 players qualify</li>
          <li>Entry fee: ₹100 required</li>
          <li>Payment verification before participation</li>
          <li>If qualified player doesn't pay, spot goes to 33rd ranked player</li>
          <li>Prize pool: ₹100,000 (1st: ₹100k, 2nd: ₹50k, 3rd: ₹30k)</li>
        </ul>

        <h2>Code of Conduct</h2>
        <ul>
          <li>Zero tolerance for cheating, hacking, or exploiting bugs</li>
          <li>Harassment and toxic behavior are prohibited</li>
          <li>Multiple account creation is forbidden</li>
          <li>Match fixing results in immediate ban</li>
          <li>All violations may result in suspension or permanent ban</li>
        </ul>

        <h2>Penalties</h2>
        <ul>
          <li><strong>First Offense:</strong> Warning and temporary suspension</li>
          <li><strong>Second Offense:</strong> Extended suspension (30 days)</li>
          <li><strong>Third Offense:</strong> Permanent ban</li>
          <li>Severe violations result in immediate permanent ban</li>
        </ul>

        <div style={{ 
          marginTop: '48px', 
          padding: '24px', 
          background: 'rgba(6, 182, 212, 0.1)', 
          borderRadius: '12px',
          border: '1px solid #06b6d4'
        }}>
          <p style={{ margin: 0, color: '#06b6d4', fontWeight: 600 }}>
            By playing on ArenaPlay, you agree to follow all rules and regulations. 
            ArenaPlay reserves the right to modify these rules at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
