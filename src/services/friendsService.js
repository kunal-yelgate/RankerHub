import { collection, getDocs, doc, setDoc, deleteDoc, onSnapshot, query, where, limit, documentId } from "firebase/firestore";
import { db } from "../lib/firebase";

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

// --- NEW FIX: Chunked Firestore Query to bypass 30-item limit ---
export const fetchUsersByIds = async (userIds) => {
  if (!userIds || userIds.length === 0) return [];

  // Firestore "in" queries max out at 30 items. We must chunk the array.
  const chunks = [];
  for (let i = 0; i < userIds.length; i += 30) {
    chunks.push(userIds.slice(i, i + 30));
  }

  try {
    const users = [];
    for (const chunk of chunks) {
      const q = query(collection(db, "users"), where(documentId(), "in", chunk));
      const snapshot = await getDocs(q);
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        users.push({
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
        });
      });
    }
    return users;
  } catch (error) {
    console.error("Error fetching chunked users:", error);
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

// Toggle logic with Firestore
export const toggleFollowStatus = async (currentUserId, developerId, isFollowing) => {
  if (!currentUserId || !developerId) return;
  const followDocId = `${currentUserId}_${developerId}`;
  const followRef = doc(db, "follows", followDocId);

  try {
    if (isFollowing) {
      await deleteDoc(followRef);
    } else {
      await setDoc(followRef, {
        followerId: currentUserId,
        followedId: developerId,
        createdAt: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error("Error toggling follow status:", error);
  }
};

// --- UPDATED FIX: Now async and fetches missing profiles dynamically ---
export const hydrateConnections = async (suggestedDevelopers, followingIds, followerIds) => {
  // 1. Get a unique list of all IDs we actually need to render
  const uniqueConnectionIds = [...new Set([...followingIds, ...followerIds])];

  // 2. Fetch specific user profiles dynamically (ignoring the 50 limit constraint)
  const fetchedConnections = await fetchUsersByIds(uniqueConnectionIds);

  // 3. Map them for quick lookup
  const connectionMap = {};
  fetchedConnections.forEach(dev => {
    connectionMap[dev.id] = dev;
  });

  // 4. Hydrate exact arrays (filter(Boolean) removes deleted accounts automatically)
  const following = followingIds.map(id => connectionMap[id]).filter(Boolean);
  const followers = followerIds.map(id => connectionMap[id]).filter(Boolean);
  
  const friendIds = followingIds.filter(id => followerIds.includes(id));
  const friends = friendIds.map(id => connectionMap[id]).filter(Boolean);

  // 5. Suggested pool remains the standard fetchDevelopers result, minus those we follow
  const suggested = (suggestedDevelopers || []).filter(dev => !followingIds.includes(dev.id));

  return {
    friends,
    followers,
    following,
    suggested
  };
};