import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';

const FirebaseContext = createContext(null);

// Gift card code
const GIFT_CARD_CODE = 'ARENA-PLAY-2026';

// UPI Payment Details
const UPI_QR_CODE = 'https://res.cloudinary.com/dwcguqqkk/image/upload/v1771798028/IMG_20260223_032934_mhoxzh.png';
const UPI_ID = 'arenaplay@upi';

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Division thresholds for Progression Tier
  const divisionThresholds = {
    10: 30,
    9: 35,
    8: 40,
    7: 45,
    6: 50,
    5: 55,
    4: 60
  };

  // K-factors for Elite Tier
  const kFactors = {
    3: 40,
    2: 32,
    1: 24
  };

  // Match limits per month
  const matchLimits = {
    1: 60,
    2: 70,
    3: 80
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchUserProfile(firebaseUser.uid);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
      } else {
        // Create new user profile if doesn't exist
        await createUserProfile(uid, {
          email: auth.currentUser?.email || '',
          username: auth.currentUser?.email?.split('@')[0] || 'Player'
        });
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError(err.message);
    }
  };

  // Create new user profile
  const createUserProfile = async (uid, data) => {
    const initialProfile = {
      uid,
      email: data.email,
      username: data.username,
      profilePhoto: '',
      division: 10,
      points: 0,
      elo_rating: 1500,
      matches_played_phase: 0,
      total_matches_season: 0,
      matches_left: 100,
      wins: 0,
      draws: 0,
      losses: 0,
      match_history: [],
      subscription_status: 'inactive',
      subscription_expiry: null,
      gift_card_used: false,
      payment_status: 'pending',
      wallet_balance: 0,
      payment_history: [],
      last_5_form: [],
      global_rank: 0,
      win_rate: 0,
      created_at: serverTimestamp(),
      season_reset: null,
      opponents_played: []
    };

    try {
      await setDoc(doc(db, 'users', uid), initialProfile);
      setUserProfile(initialProfile);
    } catch (err) {
      console.error('Error creating user profile:', err);
      setError(err.message);
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign up with email and password
  const signUp = async (email, password, username) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(result.user, {
        displayName: username
      });

      // Create user profile in Firestore
      await createUserProfile(result.user.uid, {
        email,
        username
      });

      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign out
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    if (!user) return;
    
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, updates);
      setUserProfile(prev => ({ ...prev, ...updates }));
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message);
      throw err;
    }
  };

  // Update profile photo
  const updateProfilePhoto = async (photoUrl) => {
    await updateUserProfile({ profilePhoto: photoUrl });
  };

  // Calculate Elo rating
  const calculateElo = (playerRating, opponentRating, actualScore, division) => {
    const k = kFactors[division] || 32;
    
    // Expected score calculation
    const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
    
    // New rating
    const newRating = playerRating + k * (actualScore - expectedScore);
    
    return Math.round(newRating);
  };

  // Check for promotion
  const checkPromotion = async () => {
    if (!userProfile) return;

    const { division, points } = userProfile;
    const threshold = divisionThresholds[division];

    if (threshold && points >= threshold) {
      // Calculate new division and carry over points
      const newDivision = division - 1;
      const remainingPoints = points - threshold;
      
      await updateUserProfile({
        division: newDivision,
        points: remainingPoints
      });
    }
  };

  // Submit match result
  const submitMatchResult = async (matchData) => {
    if (!user || !userProfile) return;

    const { opponentId, opponentRating, playerScore, opponentScore, roomId, screenshot } = matchData;
    const { division, points, elo_rating, wins, draws, losses, matches_played_phase, total_matches_season, matches_left, opponents_played = [] } = userProfile;

    let updates = {
      matches_played_phase: matches_played_phase + 1,
      total_matches_season: total_matches_season + 1,
      matches_left: Math.max(0, matches_left - 1),
      match_history: [
        ...(userProfile.match_history || []),
        {
          opponentId,
          playerScore,
          opponentScore,
          roomId,
          timestamp: new Date().toISOString()
        }
      ],
      opponents_played: [...opponents_played, opponentId]
    };

    // Determine result
    const isWin = playerScore > opponentScore;
    const isDraw = playerScore === opponentScore;

    if (isWin) {
      updates.wins = wins + 1;
    } else if (isDraw) {
      updates.draws = draws + 1;
    } else {
      updates.losses = losses + 1;
    }

    // Update last 5 form
    const last5 = [...(userProfile.last_5_form || [])];
    last5.unshift(isWin ? 'W' : isDraw ? 'D' : 'L');
    updates.last_5_form = last5.slice(0, 5);

    // Calculate win rate
    const totalGames = updates.wins + updates.draws + updates.losses;
    updates.win_rate = totalGames > 0 ? Math.round((updates.wins / totalGames) * 100) : 0;

    // Progression Tier (Div 10-4) - Points System
    if (division >= 4) {
      if (isWin) {
        updates.points = points + 3;
      } else if (isDraw) {
        updates.points = points + 1;
      }
      // Loss = 0 points
      
      // Check for promotion
      const threshold = divisionThresholds[division];
      if (threshold && updates.points >= threshold) {
        const newDivision = division - 1;
        const remainingPoints = updates.points - threshold;
        updates.division = newDivision;
        updates.points = remainingPoints;
      }
    } 
    // Elite Tier (Div 3-1) - Elo System
    else {
      const actualScore = isWin ? 1 : isDraw ? 0.5 : 0;
      const newRating = calculateElo(elo_rating, opponentRating, actualScore, division);
      updates.elo_rating = newRating;
    }

    await updateUserProfile(updates);
    return updates;
  };

  // Verify subscription
  const verifySubscription = async () => {
    if (!userProfile) return false;
    
    if (userProfile.gift_card_used) {
      return userProfile.subscription_status === 'active';
    }
    
    return userProfile.subscription_status === 'active';
  };

  // Apply gift card
  const applyGiftCard = async (code) => {
    if (!user) return { success: false, message: 'Please login first' };
    if (userProfile?.gift_card_used) {
      return { success: false, message: 'Gift card already used' };
    }
    if (code !== GIFT_CARD_CODE) {
      return { success: false, message: 'Invalid gift card code' };
    }

    await updateUserProfile({
      subscription_status: 'active',
      gift_card_used: true,
      subscription_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });

    return { success: true, message: 'Gift card applied successfully!' };
  };

  // Submit payment for subscription
  const submitSubscriptionPayment = async (screenshot, utrNumber) => {
    if (!user) return;

    const paymentData = {
      user_id: user.uid,
      amount: 50,
      screenshot_url: screenshot,
      utr_number: utrNumber,
      status: 'pending',
      type: 'subscription',
      created_at: serverTimestamp()
    };

    // Add to payments collection
    const paymentRef = doc(collection(db, 'payments'));
    await setDoc(paymentRef, paymentData);

    return { success: true, message: 'Payment submitted for verification' };
  };

  // Submit tournament entry payment
  const submitTournamentPayment = async (screenshot, utrNumber) => {
    if (!user) return;

    const paymentData = {
      user_id: user.uid,
      amount: 1500,
      screenshot_url: screenshot,
      utr_number: utrNumber,
      status: 'pending',
      type: 'tournament_entry',
      created_at: serverTimestamp()
    };

    const paymentRef = doc(collection(db, 'payments'));
    await setDoc(paymentRef, paymentData);

    return { success: true, message: 'Tournament entry payment submitted' };
  };

  // Get leaderboard
  const getLeaderboard = async (division = null, limitCount = 100) => {
    try {
      let q = query(
        collection(db, 'users'),
        orderBy('division', 'asc'),
        orderBy('elo_rating', 'desc'),
        limit(limitCount)
      );

      const snapshot = await import('firebase/firestore').then(({ getDocs }) => getDocs(q));
      let results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Filter by division if specified
      if (division !== null) {
        results = results.filter(u => u.division === division);
      }

      // Calculate global ranks
      const allUsers = await getLeaderboard(null, 1000);
      results.forEach((user, index) => {
        const rank = allUsers.findIndex(u => u.id === user.id) + 1;
        user.global_rank = rank;
      });

      return results;
    } catch (err) {
      console.error('Error getting leaderboard:', err);
      return [];
    }
  };

  // Get top 32 Division 1
  const getTop32Div1 = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('division', 'asc'),
        orderBy('elo_rating', 'desc'),
        limit(50)
      );

      const { getDocs } = await import('firebase/firestore');
      const snapshot = await getDocs(q);
      const results = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(u => u.division === 1)
        .slice(0, 32);

      return results;
    } catch (err) {
      console.error('Error getting top 32:', err);
      return [];
    }
  };

  // Delete account
  const deleteAccount = async () => {
    if (!user) return;
    
    try {
      // Delete user data from Firestore
      await import('firebase/firestore').then(({ deleteDoc, doc }) => 
        deleteDoc(doc(db, 'users', user.uid))
      );
      
      // Delete auth account
      await import('firebase/auth').then(({ deleteUser }) => 
        deleteUser(user)
      );
      
      setUser(null);
      setUserProfile(null);
    } catch (err) {
      console.error('Error deleting account:', err);
      throw err;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    error,
    signIn,
    signUp,
    logOut,
    updateUserProfile,
    updateProfilePhoto,
    submitMatchResult,
    verifySubscription,
    applyGiftCard,
    submitSubscriptionPayment,
    submitTournamentPayment,
    getLeaderboard,
    getTop32Div1,
    deleteAccount,
    divisionThresholds,
    kFactors,
    matchLimits,
    UPI_QR_CODE,
    UPI_ID,
    GIFT_CARD_CODE
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
