/**
 * Calculate the detailed breakdown of how a user's rank is determined
 * @param {Object} userData - User data from Firestore
 * @returns {Object} Breakdown object with all point categories and explanations
 */
export const calculateRankingBreakdown = (userData) => {
  if (!userData) {
    return {
      gitPoints: { total: 0, commits: 0, prs: 0, reviews: 0, githubStreak: 0, explanation: "No GitHub activity yet" },
      codingVersePoints: { total: 0, easy: 0, medium: 0, hard: 0, explanation: "Complete challenges to earn points" },
      streakPoints: { total: 0, dailyStreak: 0, maxCap: 100, explanation: "Daily login streak (max 100 XP per cycle)" },
      referralPoints: { total: 0, successfulReferrals: 0, explanation: "Earn 100 XP per successful referral" },
      totalPoints: 0,
      pointsBreakdown: []
    };
  }

  const points = userData.points || {};
  
  // Git Points Breakdown
  const gitStats = userData.gitStats || {};
  const commits = gitStats.commits || 0;
  const prs = gitStats.pullRequests || 0;
  const reviews = gitStats.reviews || 0;
  const githubStreak = gitStats.streak || 0;
  
  const gitPointsDetail = {
    commits: commits * 2,
    prs: prs * 5,
    reviews: reviews * 10,
    githubStreak: githubStreak * 10,
    get total() {
      return this.commits + this.prs + this.reviews + this.githubStreak;
    },
    explanation: `GitHub contributions: ${commits} commits × 2 + ${prs} PRs × 5 + ${reviews} reviews × 10 + ${githubStreak} streak × 10`
  };

  // Coding Verse Points Breakdown
  const challenges = userData.challenges || {};
  const easyCompleted = challenges.easy || 0;
  const mediumCompleted = challenges.medium || 0;
  const hardCompleted = challenges.hard || 0;

  const codingVerseDetail = {
    easy: easyCompleted * 100,
    medium: mediumCompleted * 150,
    hard: hardCompleted * 200,
    get total() {
      return this.easy + this.medium + this.hard;
    },
    challengeCount: easyCompleted + mediumCompleted + hardCompleted,
    explanation: `Challenge completions: ${easyCompleted} Easy × 100 + ${mediumCompleted} Medium × 150 + ${hardCompleted} Hard × 200`
  };

  // Streak Points Breakdown
  const currentStreak = userData.currentStreak || 0;
  const maxStreakCap = 100;
  
  const streakDetail = {
    dailyStreak: currentStreak * 10,
    maxCap: maxStreakCap,
    get total() {
      return Math.min(this.dailyStreak, this.maxCap);
    },
    currentConsecutiveDays: currentStreak,
    explanation: `Daily login streak: ${currentStreak} consecutive days × 10 XP (capped at ${maxStreakCap} XP per cycle)`
  };

  // Referral Points Breakdown
  const successfulReferrals = userData.referralStats?.successful || 0;
  const referralDetail = {
    successfulReferrals: successfulReferrals,
    get total() {
      return this.successfulReferrals * 100;
    },
    explanation: `Successful referrals: ${successfulReferrals} × 100 XP per person`
  };

  // Calculate totals
  const totalFromBreakdown = gitPointsDetail.total + codingVerseDetail.total + streakDetail.total + referralDetail.total;
  
  // Build detailed breakdown array for UI
  const pointsBreakdown = [
    {
      category: "🐙 GitHub Contributions",
      points: gitPointsDetail.total,
      details: [
        { label: "Commits", value: commits, multiplier: 2, total: gitPointsDetail.commits },
        { label: "Pull Requests", value: prs, multiplier: 5, total: gitPointsDetail.prs },
        { label: "Code Reviews", value: reviews, multiplier: 10, total: gitPointsDetail.reviews },
        { label: "GitHub Streak", value: githubStreak, multiplier: 10, total: gitPointsDetail.githubStreak }
      ]
    },
    {
      category: "💻 Coding Challenges",
      points: codingVerseDetail.total,
      details: [
        { label: "Easy Challenges", value: easyCompleted, multiplier: 100, total: codingVerseDetail.easy },
        { label: "Medium Challenges", value: mediumCompleted, multiplier: 150, total: codingVerseDetail.medium },
        { label: "Hard Challenges", value: hardCompleted, multiplier: 200, total: codingVerseDetail.hard }
      ]
    },
    {
      category: "🔥 Daily Streak",
      points: streakDetail.total,
      details: [
        { 
          label: "Consecutive Days", 
          value: currentStreak, 
          multiplier: 10, 
          total: streakDetail.dailyStreak,
          note: `Capped at ${maxStreakCap} XP per cycle`
        }
      ]
    },
    {
      category: "🤝 Referrals",
      points: referralDetail.total,
      details: [
        { label: "Successful Referrals", value: successfulReferrals, multiplier: 100, total: referralDetail.total }
      ]
    }
  ].filter(item => item.points > 0); // Only show categories with points

  return {
    gitPoints: gitPointsDetail,
    codingVersePoints: codingVerseDetail,
    streakPoints: streakDetail,
    referralPoints: referralDetail,
    totalPoints: totalFromBreakdown,
    pointsBreakdown,
    rank: userData.rank || "N/A",
    nextMilestone: {
      points: Math.ceil(totalFromBreakdown / 250) * 250,
      pointsNeeded: Math.ceil(totalFromBreakdown / 250) * 250 - totalFromBreakdown
    }
  };
};

/**
 * Get a human-readable explanation for why a user has their current rank
 * @param {Object} breakdown - The breakdown object from calculateRankingBreakdown
 * @returns {string} Human-readable explanation
 */
export const getRankExplanation = (breakdown) => {
  const { totalPoints, pointsBreakdown } = breakdown;
  
  if (pointsBreakdown.length === 0) {
    return "Start earning points by completing challenges, contributing to GitHub, or logging in daily!";
  }

  const categories = pointsBreakdown.map(cat => cat.category).join(", ");
  return `Your rank is based on ${totalPoints} total points earned from: ${categories}`;
};
