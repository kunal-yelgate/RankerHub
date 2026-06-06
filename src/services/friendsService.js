import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where, 
  limit,
  writeBatch,
  increment
} from "firebase/firestore";
import { db } from "../lib/firebase";

// Total number of distributed shards to handle high-concurrency increments
const SHARD_COUNT = 5;

// Asynchronously fetch real users from Firebase (capped at 50 to avoid
// downloading the entire collection on every page load)
export const fetchDevelopers = async () => {
  try {
    const q = query(collection(db, "users"), limit(50));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.displayName || data.name || data.githubUsername || "Unknown Developer",
        username: data.githubUsername || doc.id,
        avatar: data.photoURL || data.avatarUrl || `https://ui-avatars.com/api/?name=${data.displayName || 'Dev'}&background=random`,
        role: data.role || "Developer",
        bio: data.bio || "Building awesome projects on RankerHub.",
        tags: data.skills || ["Developer"],
        mutualFriends: 0,
        online: false,
        activity: "Recently joined RankerHub"
      };
    });
  } catch (error) {
    console.error("Error fetching developers: ", error);
    return [];
  }
};

// Real-time listener for users the current user is following
export const subscribeToFollowing = (currentUserId, callback) => {
  if (!currentUserId) return () => {};
  const q = query(collection(db, "follows"), where("followerId", "==", currentUserId));
  return onSnapshot(q, (snapshot) => {
    const followingIds = snapshot.docs.map(doc => doc.data().followedId);
    callback(followingIds);
  });
};

// Real-time listener for users following the current user
export const subscribeToFollowers = (currentUserId, callback) => {
  if (!currentUserId) return () => {};
  const q = query(collection(db, "follows"), where("followedId", "==", currentUserId));
  return onSnapshot(q, (snapshot) => {
    const followerIds = snapshot.docs.map(doc => doc.data().followerId);
    callback(followerIds);
  });
};

// Toggle logic with Firestore (Enhanced with Atomic Batches & Sharding)
export const toggleFollowStatus = async (currentUserId, developerId, isFollowing) => {
  if (!currentUserId || !developerId) return;
  const followDocId = `${currentUserId}_${developerId}`;
  const followRef = doc(db, "follows", followDocId);

  // 1. Initialize atomic write batch
  const batch = writeBatch(db);

  // 2. Select a randomized shard document to spread lock contention uniformly
  const randomShardId = Math.floor(Math.random() * SHARD_COUNT).toString();
  const globalConnectionsShardRef = doc(db, "aggregates", "global_connections", "shards", randomShardId);

  try {
    if (isFollowing) {
      // Unfollow
      batch.delete(followRef);
      // Decrement the distributed shard counter atomically
      batch.set(globalConnectionsShardRef, { count: increment(-1) }, { merge: true });
    } else {
      // Follow
      batch.set(followRef, {
        followerId: currentUserId,
        followedId: developerId,
        createdAt: new Date().toISOString()
      });
      // Increment the distributed shard counter atomically
      batch.set(globalConnectionsShardRef, { count: increment(1) }, { merge: true });
    }

    // Commit all updates atomically in a single network transaction write
    await batch.commit();
  } catch (error) {
    console.error("Error toggling follow status with batch:", error);
    throw error;
  }
};

/**
 * 🚀 FEATURE REQUIREMENT: Atomic Batch Update for Daily Streaks & Leaderboard Increments
 * Replaces un-batched direct sets/updates to address single document write limit constraints.
 * Fixed: Removed TypeScript type annotations for valid .js compilation.
 */
export const updateUserActivityAndStreak = async (userId, collegeId, newStreakValue, achievementData) => {
  if (!userId || !collegeId) return;

  const batch = writeBatch(db);
  
  const userRef = doc(db, "users", userId);
  const logRef = doc(collection(db, "activity_logs")); 
  
  // Choose randomized shard index to bypass Firestore's 1 write/sec limit on leaderboard increments
  const randomShardId = Math.floor(Math.random() * SHARD_COUNT).toString();
  const leaderboardShardRef = doc(db, "aggregates", collegeId, "shards", randomShardId);

  try {
    // A. Update user profile metrics & streaks atomically
    batch.update(userRef, {
      currentStreak: newStreakValue,
      lastActivityTimestamp: new Date().toISOString(),
      ...(achievementData && { totalPoints: increment(achievementData.points) })
    });

    // B. Log activity event inside the same transaction frame
    batch.set(logRef, {
      userId,
      activityType: "streak_increment",
      timestamp: new Date().toISOString(),
      details: achievementData || { description: "Daily system contribution logged" }
    });

    // C. Increment the Distributed Shard for high-concurrency rankings
    batch.set(leaderboardShardRef, { count: increment(1) }, { merge: true });

    // Execute everything atomically
    await batch.commit();
  } catch (error) {
    console.error("Atomic activity update failed:", error);
    throw error;
  }
};

/**
 * Distributed Counter Shard Aggregator for Leaderboard Metrics
 * Sums up distributed field allocations to compute exact realtime totals for the UI.
 * Fixed: Removed TypeScript return type annotation for valid .js compilation.
 */
export const getAggregatedLeaderboardMetric = async (collegeId) => {
  let combinedTotal = 0;
  try {
    const shardsSnapshot = await getDocs(collection(db, "aggregates", collegeId, "shards"));
    shardsSnapshot.forEach((shardDoc) => {
      const data = shardDoc.data();
      if (data && typeof data.count === "number") {
        combinedTotal += data.count;
      }
    });
  } catch (error) {
    console.error("Failed to compile aggregated metrics:", error);
  }
  return combinedTotal;
};

export const hydrateConnections = (developers, followingIds, followerIds) => {
  if (!developers) return { friends: [], followers: [], following: [], suggested: [] };

  const following = developers.filter((developer) => followingIds.includes(developer.id));
  const followers = developers.filter((developer) => followerIds.includes(developer.id));
  const friends = developers.filter(
    (developer) => followingIds.includes(developer.id) && followerIds.includes(developer.id)
  );
  const suggested = developers.filter((developer) => !followingIds.includes(developer.id));

  return {
    friends,
    followers,
    following,
    suggested
  };
};