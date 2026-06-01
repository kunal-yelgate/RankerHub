/**
 * Static leaderboard seed data has been removed.
 *
 * All leaderboard rankings are now loaded in real time from the Firestore
 * `users` collection (filtered to onboardingStatus == "complete" and sorted
 * by points.totalPoints descending), matching the approach used in GitRank.jsx.
 *
 * These empty exports are kept so that any import in searchUtils.js or other
 * files continues to compile without error while the migration is complete.
 * They can be removed once all consumers have been updated.
 */

export const leaderboardData = [];
export const womenLeaderboardData = [];
