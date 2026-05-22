import React from "react";
import { motion } from "framer-motion";
import { Github } from "../ui/Icons";

export const ContributorCard = ({ login, avatarUrl, contributions, htmlUrl, variants }) => {
  return (
    <motion.a
      variants={variants}
      href={htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-950/40 hover:border-violet-500/30 dark:hover:border-violet-500/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center space-y-2.5 group cursor-pointer"
      aria-label={`${login} contributor profile with ${contributions} contributions`}
    >
      {/* Avatar */}
      <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex-shrink-0 group-hover:border-violet-500/30 transition-all duration-350 relative">
        <img src={avatarUrl} alt={`${login} avatar`} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-violet-500/0 group-hover:bg-violet-500/5 transition-colors duration-300" />
      </div>
      
      {/* Info */}
      <div className="w-full overflow-hidden">
        <span className="block text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-violet-500 transition-colors duration-300">
          {login}
        </span>
        <span className="inline-block mt-1.5 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900/50 text-[9px] font-bold text-slate-550 dark:text-slate-400 border border-slate-200/10 dark:border-slate-800/20 shadow-sm transition-colors duration-300">
          {contributions} {contributions === 1 ? 'commit' : 'commits'}
        </span>
      </div>

      {/* GitHub Indicator */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full pt-1.5 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-center gap-1 text-[10px] text-violet-600 dark:text-violet-400 font-bold">
        <Github className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" /> Profile
      </div>
    </motion.a>
  );
};

export default ContributorCard;
