import React from "react";
import { motion } from "framer-motion";
import { Link2, GitPullRequest, Terminal, Flame, Trophy, X, CheckCircle2 } from "lucide-react";
import Card from "./Card";

export const HowItWorksModal = ({ onClose }) => {
  const steps = [
    {
      num: "01",
      title: "Connect Your Profile",
      desc: "Link your GitHub account or developer credentials securely in seconds. RankerHub parses public contribution events, repositories, and active timelines. We prioritize security and privacy: our engine operates on public logs and never requests write scopes or access to private source code.",
      icon: Link2,
      color: "from-blue-600 to-cyan-500 text-blue-400"
    },
    {
      num: "02",
      title: "Track Live Coding Metrics",
      desc: "Our synchronization engine audits your active development metrics dynamically. We track active coding frequencies, pull requests created, code review suggestions submitted, and lines of code committed to assign your real-time global developer score.",
      icon: GitPullRequest,
      color: "from-violet-600 to-indigo-500 text-violet-400"
    },
    {
      num: "03",
      title: "Conquer CodingVerse Arenas",
      desc: "Step into the interactive CodingVerse arena to solve daily algorithmic challenges across arrays, pointers, stacks, and graph traversals. Compile your code and earn problem-solving XP (Experience Points) to boost your global standing.",
      icon: Terminal,
      color: "from-purple-600 to-pink-500 text-purple-400"
    },
    {
      num: "04",
      title: "Build Streaks in CodingOwl",
      desc: "Stay dedicated and build ironclad habits with our consistency companion, Oliver the Owl. Track consecutive active days, activate timed study/focus sessions, and avoid streak freezes to maintain point multipliers.",
      icon: Flame,
      color: "from-orange-600 to-red-500 text-orange-400"
    },
    {
      num: "05",
      title: "Climb Leaderboards & Mint Badges",
      desc: "Compare your ratings globally, locally, or in specialized tracks like RankHer. Unlock verified developer badges and showcase your achievements. Soon, badges builds will be minted as Polygon blockchain tokens for profile verification.",
      icon: Trophy,
      color: "from-amber-600 to-yellow-500 text-amber-400"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-md"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl max-h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800 p-6 md:p-8 text-slate-800 dark:text-slate-100 flex flex-col gap-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
            Platform Lifecycle
          </span>
          <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400 my-0">
            How RankerHub Works
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium my-0">
            Follow these steps to synchronize your metrics, conquer challenges, and unlock verified achievements.
          </p>
        </div>

        {/* Steps Vertical Timeline Layout */}
        <div className="relative border-l border-slate-200 dark:border-slate-800/80 ml-4 md:ml-6 my-4 pl-6 md:pl-8 space-y-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative group">
                {/* Timeline Node (Icon Wrapper) */}
                <div className={`absolute -left-[45px] md:-left-[53px] top-0 w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-indigo-500/5 group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-500/10 px-2 py-0.5 rounded border border-violet-200 dark:border-violet-500/20 tracking-wider">
                      STEP {step.num}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white my-0 leading-tight">
                      {step.title}
                    </h3>
                  </div>
                  
                  {/* Detailed Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold max-w-2xl my-0">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info banner */}
        <Card className="p-4 bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/20 dark:to-indigo-900/20 border-violet-200 dark:border-violet-800/40 text-center">
          <p className="text-xs text-indigo-700 dark:text-indigo-300 font-bold my-0 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Ready to climb? Link your profile, start coding, and watch your developer standings rise!
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default HowItWorksModal;