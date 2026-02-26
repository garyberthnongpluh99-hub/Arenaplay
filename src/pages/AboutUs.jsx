import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
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
        <h1 style={{ fontSize: '36px', marginBottom: '32px' }}>The Future of Competitive Gaming</h1>
        
        <p>
          At ArenaPlay, we believe that every gamer deserves a stage. What started as a vision 
          to organize play has evolved into a premier ecosystem where passion meets performance. 
          Our platform is engineered to provide a seamless transition from casual gaming to 
          professional-grade competition.
        </p>

        <h2>Our Core Pillars</h2>

        <h3>🎮 Compete</h3>
        <p>
          State-of-the-art tournament brackets and real-time matchmaking. We provide the 
          infrastructure for serious competition, ensuring fair play and accurate skill 
          tracking through our advanced Elo and points-based ranking systems.
        </p>

        <h3>🌐 Connect</h3>
        <p>
          A global community of players, scouts, and enthusiasts. ArenaPlay brings together 
          gamers from all walks of life, creating opportunities for networking, team formation, 
          and shared experiences in the competitive gaming landscape.
        </p>

        <h3>🏆 Conquer</h3>
        <p>
          A transparent leaderboard system that rewards skill and dedication. Every match 
          counts, every victory matters. Our clear progression paths ensure that your hard 
          work translates directly to your rank and recognition within the community.
        </p>

        <h2>Our Mission</h2>
        <p>
          Whether you are a solo player looking to prove your worth or a team aiming for 
          the championship, ArenaPlay is your digital coliseum. We are committed to providing 
          the tools, infrastructure, and community that competitive gamers need to succeed.
        </p>

        <h2>Why ArenaPlay?</h2>
        <ul>
          <li><strong>Fair Play Guaranteed</strong> - Advanced anti-cheat systems and verification processes</li>
          <li><strong>Transparent Ranking</strong> - Clear progression systems with verifiable results</li>
          <li><strong>Real Rewards</strong> - Actual prize pools and recognition for top performers</li>
          <li><strong>Community First</strong> - A supportive environment for gamers of all skill levels</li>
          <li><strong>Professional Support</strong> - Dedicated assistance for all players</li>
        </ul>

        <h2>Join the Revolution</h2>
        <p>
          The future of competitive gaming is here. Join thousands of players who have already 
          made ArenaPlay their home for serious eSports competition. Your journey to the top 
          starts now.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
