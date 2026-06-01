import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

// Asynchronously fetch real users from Firebase
export const fetchDevelopers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
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
        mutualFriends: Math.floor(Math.random() * 10), 
        online: Math.random() > 0.5, 
        activity: "Recently joined RankerHub"
      };
    });
  } catch (error) {
    console.error("Error fetching developers: ", error);
    return [];
  }
};

export const toggleFollowStatus = (followingIds, developerId) => {
  if (followingIds.includes(developerId)) {
    return followingIds.filter((id) => id !== developerId);
  }
  return [...followingIds, developerId];
};

export const hydrateConnections = (developers, followingIds, followerIds) => {
  // Defensive check in case developers is undefined during loading
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