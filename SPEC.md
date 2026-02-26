# ArenaPlay - eSports Competitive Platform Specification

## Project Overview
- **Project Name**: ArenaPlay (Compete.Connect.Conquer)
- **Type**: Full-stack eSports ranked ladder platform for eFootball
- **Core Functionality**: Professional competitive gaming platform with Firebase Auth, Firestore database, ranked matchmaking, tournaments, and subscription system
- **Target Users**: Competitive eFootball players seeking organized ranked competition

---

## Firebase Configuration
```
javascript
const firebaseConfig = {
  apiKey: "AIzaSyA7xzuy71leqNpFhBopAWr4uIQO6KzPpJU",
  authDomain: "arenaplay-fc65e.firebaseapp.com",
  projectId: "arenaplay-fc65e",
  storageBucket: "arenaplay-fc65e.firebasestorage.app",
  messagingSenderId: "504507935748",
  appId: "1:504507935748:web:985ab8c0223b18ef3a9951",
  measurementId: "G-01JWG4HM67"
};
```

---

## UI/UX Specification

### Color Palette
- **Primary Background**: #050505 (Deep Black)
- **Secondary Background**: #0a0a0a (Card backgrounds)
- **Tertiary Background**: #111111 (Input fields)
- **Neon Cyan (Primary Accent)**: #06b6d4
- **Neon Cyan Light**: #22d3ee
- **Success Green**: #10b981
- **Warning Orange**: #f59e0b
- **Error Red**: #ef4444
- **Text Primary**: #ffffff
- **Text Secondary**: #a1a1aa
- **Text Muted**: #71717a
- **Border Color**: #27272a
- **Glass Effect**: rgba(255, 255, 255, 0.05)

### Typography
- **Primary Font**: 'Orbitron', sans-serif (Headers - futuristic gaming feel)
- **Secondary Font**: 'Rajdhani', sans-serif (Body text - clean, technical)
- **Heading 1**: 48px, 700 weight
- **Heading 2**: 32px, 600 weight
- **Heading 3**: 24px, 600 weight
- **Body**: 16px, 400 weight
- **Small**: 14px, 400 weight
- **Caption**: 12px, 400 weight

### Spacing System
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Visual Effects
- **Glass Panels**: backdrop-filter: blur(10px), background: rgba(255, 255, 255, 0.05)
- **Glow Effect**: box-shadow: 0 0 20px rgba(6, 182, 212, 0.3)
- **Card Hover**: transform: translateY(-2px), box-shadow: 0 0 30px rgba(6, 182, 212, 0.2)
- **Button Hover**: brightness(1.1), scale(1.02)
- **Transitions**: all 0.3s ease

---

## Page Structure

### 1. Authentication Page (Auth.js)
- Single component toggling between Sign In and Sign Up
- Deep black background (#050505)
- Neon cyan accents for buttons and focus states
- Mobile-responsive with large touch-friendly inputs (min-height: 50px)
- Glass panel card design
- Logo at top with tagline "Compete.Connect.Conquer"

### 2. Dashboard / Leaderboard Page
- Hero background: Stadium image with dark overlay
- Top navigation bar (Desktop)
- Bottom navigation bar (Mobile)
- User Debug Bar at top showing email and Sign Out button
- Status indicator: Pulsing green dot "STATUS: Connected"
- Division cards showing:
  - Current Division
  - Points / Elo Rating
  - Matches Left
  - Win Rate %
  - Global Ranking
- Promotion Progress Bar (segmented: Rel., Remain., Promo.)
- Find Match button
- Leaderboard with division tabs
- Top 32 Division 1 leaderboard with ₹10,000 prize pool

### 3. Subscription Paywall
- Netflix-style dark paywall
- ₹50/month subscription card
- UPI QR code for payment
- UTR input field
- Gift card input box (hidden code: ARENA-PLAY-2026)
- Features locked until subscription active

### 4. Tournament Page
- Champions League Tournament
- ₹100,000 Prize Pool
- Prize Breakdown: 1st ₹100k, 2nd ₹50k, 3rd ₹30k each
- Entry Fee system with payment verification
- Group Stage (Groups A-H) for Top 32
- Payment status tracking

### 5. Settings Page
- Profile Photo Upload
- Username display
- Security & Account Management section:
  - Sign Out button
  - Delete Account button (with warning)
- Navigation to other pages

### 6. About Us Page
- "The Future of Competitive Gaming" headline
- Core pillars: Compete, Connect, Conquer
- Justified text, 16px minimum font

### 7. Terms of Service Page
- Last Updated: February 2026
- User eligibility and conduct
- Zero tolerance policy for cheating

### 8. Privacy Policy Page
- Data collection info
- Data usage explanation
- Third-party sharing policy
- User rights

### 9. Contact Us Page
- Technical inquiries: support@arenaplay.16gmail.com
- Social media links (Instagram, Facebook)

### 10. Rules Page
- 30-day season structure
- Decay rules
- Match verification rules

---

## State Management

### App States
- IDLE
- IN_QUEUE
- MATCH_FOUND_PENDING
- IN_ACTIVE_MATCH
- DISPUTED
- SUSPENDED

### User States
- NOT_LOGGED_IN
- LOGGED_IN_NO_SUBSCRIPTION
- LOGGED_IN_SUBSCRIPTION_INACTIVE
- LOGGED_IN_SUBSCRIPTION_ACTIVE
- IN_QUEUE
- IN_MATCH

---

## Firestore Schema

### users Collection
```
javascript
{
  uid: string, // Auth ID
  email: string,
  username: string,
  profilePhoto: string, // Base64 or URL
  division: number, // 10-1
  points: number, // Progression tier
  elo_rating: number, // Elite tier (starts 1500)
  matches_played_phase: number,
  total_matches_season: number,
  matches_left: number,
  wins: number,
  draws: number,
  losses: number,
  match_history: array,
  subscription_status: 'active' | 'inactive',
  subscription_expiry: timestamp,
  gift_card_used: boolean,
  payment_status: 'pending' | 'verified',
  wallet_balance: number,
  payment_history: array,
  last_5_form: array,
  global_rank: number,
  win_rate: number,
  created_at: timestamp,
  season_reset: timestamp
}
```

### matches Collection
```
javascript
{
  match_id: string,
  player1_id: string,
  player2_id: string,
  player1_room_id: string,
  player2_room_id: string,
  player1_score: number,
  player2_score: number,
  player1_screenshot: string,
  player2_screenshot: string,
  status: 'pending' | 'verified' | 'disputed',
  winner_id: string,
  created_at: timestamp,
  verified_at: timestamp
}
```

### payments Collection
```
javascript
{
  payment_id: string,
  user_id: string,
  amount: number,
  screenshot_url: string,
  utr_number: string,
  status: 'pending' | 'approved' | 'rejected',
  type: 'subscription' | 'tournament_entry',
  created_at: timestamp
}
```

### tournaments Collection
```
javascript
{
  tournament_id: string,
  name: string,
  prize_pool: number,
  entry_fee: number,
  participants: array,
  status: 'upcoming' | 'active' | 'completed',
  created_at: timestamp
}
```

---

## Division System

### Progression Tier (Division 10-4)
- **Points System**: Win = +3pts, Draw = +1pt, Loss = 0pts
- **Thresholds**:
  - Div 10: 30pts
  - Div 9: 35pts
  - Div 8: 40pts
  - Div 7: 45pts
  - Div 6: 50pts
  - Div 5: 55pts
  - Div 4: 60pts
- **Auto-Promotion**: When points >= threshold, increment division, carry over remainder

### Elite Tier (Division 3-1)
- **MMR System**: Elo-based rating starting at 1500
- **K-Factors**:
  - Div 3: K=40
  - Div 2: K=32
  - Div 1: K=24
- **Formula**: NewRating = OldRating + K × (ActualScore - ExpectedScore)
- **Expected Score**: 1 / (1 + 10^((OpponentRating - PlayerRating) / 400))

---

## Matchmaking Rules
- Match players within ±200 rating
- Match Limits:
  - Div 1: 60/month
  - Div 2: 70/month
  - Div 3: 80/month
- Prevent playing same opponent more than once per week
- Both players must submit screenshots
- Room ID required for match verification

---

## Season System
- 30-day season structure
- Rating Compression at season end:
  - Div 1: 75% of rating
  - Div 2-3: 80% of rating
  - Progression Divisions: 0 points
- Inactivity decay rules

---

## Components List

### Shared Components
1. GlassCard - Glassmorphism card container
2. NeonButton - Glowing button component
3. Input - Custom styled input field
4. Modal - Overlay modal component
5. StatusIndicator - Pulsing status dot
6. ProgressBar - Segmented progress bar
7. NavigationBar - Top/Bottom navigation
8. LeaderboardTable - Sortable leaderboard
9. DivisionCard - User stats card
10. MatchResultModal - Submit match results

### Page Components
1. AuthPage - Sign In/Sign Up
2. Dashboard - Main hub
3. Leaderboard - Rankings
4. Tournament - Championship
5. Settings - User settings
6. AboutUs - Company info
7. Terms - Legal
8. Privacy - Data policy
9. Contact - Support
10. Rules - Game rules

---

## Acceptance Criteria

### Authentication
- [ ] Sign In/Sign Up toggle works
- [ ] Firebase Auth integration functional
- [ ] Session persistence via onAuthStateChange
- [ ] New users auto-created in Firestore profiles

### Subscription
- [ ] Netflix-style paywall displays
- [ ] ₹50/month with UPI QR code
- [ ] Gift card code ARENA-PLAY-2026 works
- [ ] Features locked for inactive subscriptions

### Division System
- [ ] Points calculation (Win=3, Draw=1, Loss=0)
- [ ] Auto-promotion at thresholds
- [ ] Elo rating for Div 3-1
- [ ] K-factors applied correctly

### Matchmaking
- [ ] Find Match button functional
- [ ] Rating range ±200
- [ ] Match limits enforced
- [ ] Room ID required
- [ ] Screenshot submission

### Tournament
- [ ] ₹100,000 prize pool display
- [ ] Entry fee system
- [ ] Payment verification
- [ ] Top 32 display

### UI/UX
- [ ] Dark premium theme
- [ ] Glass panels and glowing buttons
- [ ] Mobile responsive
- [ ] Desktop navigation
- [ ] Profile photo upload works

### Settings
- [ ] Profile photo upload
- [ ] Username display
- [ ] Sign Out functional
- [ ] Delete Account with warning
- [ ] Exit to Settings from all pages
