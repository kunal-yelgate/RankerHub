import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import ContributorCard from "./ContributorCard";

export const ContributorsGrid = ({ fadeInUp, staggerContainer }) => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://api.github.com/repos/indresh404/RankerHub/contributors");
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        
        // Filter out owner (indresh404) and collaborator (divyagsharma2006-blip)
        const excludedUsers = ["indresh404", "divyagsharma2006-blip"];
        const filtered = data.filter(
          (user) => !excludedUsers.includes(user.login.toLowerCase())
        );
        
        setContributors(filtered);
        setError(null);
      } catch (err) {
        console.error("Error fetching contributors:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white/20 dark:bg-slate-950/20 animate-pulse flex flex-col items-center space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-xl border border-rose-500/20 bg-rose-500/5 text-center text-xs text-slate-650 dark:text-slate-400 flex flex-col items-center justify-center gap-2">
        <AlertCircle className="w-5 h-5 text-rose-500" />
        <div>
          <p className="font-bold text-rose-500 mb-1">Could not fetch contributors dynamically</p>
          <p>GitHub API rate limit exceeded or network offline. You can view all activity directly on GitHub.</p>
        </div>
        <a 
          href="https://github.com/indresh404/RankerHub/graphs/contributors" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block mt-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-150 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition duration-200 font-bold"
        >
          View Contributors on GitHub
        </a>
      </div>
    );
  }

  if (contributors.length === 0) {
    return (
      <div className="p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/20 dark:bg-slate-950/20 text-center text-xs text-slate-500 dark:text-slate-400">
        <p className="font-bold">No external contributors found yet.</p>
        <p className="mt-1">Be the first to submit a pull request and join the community!</p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4"
    >
      {contributors.map((contrib) => (
        <ContributorCard
          key={contrib.id}
          login={contrib.login}
          avatarUrl={contrib.avatar_url}
          contributions={contrib.contributions}
          htmlUrl={contrib.html_url}
          variants={fadeInUp}
        />
      ))}
    </motion.div>
  );
};

export default ContributorsGrid;
