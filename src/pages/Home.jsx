import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import {
  Sparkles,
  Code2,
  BookOpen,
  ArrowRight,
  Award,
  Users,
  Zap,
  Target,
  Trophy,
  UserPlus,
  Gift
} from "lucide-react";
import { Github } from "../components/ui/Icons";
import { fadeUp, staggerContainer } from "../utils/motion";
import GradientButton from "../components/ui/GradientButton";
import Card from "../components/ui/Card";
import logo from "../assets/logo.png";
import GlowRingLogo from "../components/ui/GlowRingLogo";

const AnimatedNumber = ({ value, suffix = "", decimals = 0, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    const endValue = parseFloat(value);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = percentage * (2 - percentage);
      
      const currentValue = easeProgress * endValue;
      setCount(currentValue);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, value, duration]);

  // Format count
  const formatted = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return <span ref={elementRef}>{formatted}{suffix}</span>;
};

export const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#features") {
      setTimeout(() => {
        const element = document.getElementById("features");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);



  const features = [
    {
      title: "GitRank",
      description: "Analyze commits, pull requests, and reviews to rank developers globally and by language.",
      icon: Github,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      accent: "from-blue-500/20 via-cyan-500/10 to-transparent",
      gradient: "from-blue-500/20 to-cyan-400/20 shadow-blue-500/10",
      stats: "PRs, reviews, language ranks",
      status: "Contribution intelligence"
    },
    {
      title: "RankHer",
      description: "A spotlight ranking and community to support female software engineers.",
      icon: Sparkles,
      color: "text-pink-500 bg-pink-500/10 border-pink-500/20",
      accent: "from-pink-500/20 via-rose-500/10 to-transparent",
      gradient: "from-pink-500/20 to-rose-400/20 shadow-pink-500/10",
      stats: "Spotlights, cohorts, recognition",
      status: "Inclusive rankings"
    },
    {
      title: "CodingVerse",
      description: "Solve daily algorithmic challenges, earn points, and climb the problem-solving ladder.",
      icon: Code2,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      accent: "from-violet-500/20 via-indigo-500/10 to-transparent",
      gradient: "from-violet-500/20 to-indigo-400/20 shadow-violet-500/10",
      stats: "Daily practice, XP, ladders",
      status: "Challenge arena"
    },
    {
      title: "CodingOwl",
      description: "Build ironclad habits. Follow streaks and focus sessions backed by a focused habit assistant.",
      icon: BookOpen,
      color: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      accent: "from-amber-500/20 via-orange-500/10 to-transparent",
      gradient: "from-amber-500/20 to-orange-400/20 shadow-amber-500/10",
      stats: "Streaks, focus sessions, rituals",
      status: "Habit companion"
    },
    {
      title: "Achievements System",
      description: "Turn consistent progress into badges, milestone trophies, and profile-ready proof of work.",
      icon: Trophy,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
      gradient: "from-emerald-500/20 to-teal-400/20 shadow-emerald-500/10",
      stats: "Badges, trophies, milestones",
      status: "Progress rewards"
    },
    {
      title: "Friends System",
      description: "Follow peers, compare momentum, and keep developer growth social without adding noise.",
      icon: UserPlus,
      color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
      accent: "from-sky-500/20 via-blue-500/10 to-transparent",
      gradient: "from-sky-500/20 to-blue-400/20 shadow-sky-500/10",
      stats: "Followers, activity, peer ranks",
      status: "Social coding graph"
    },
    {
      title: "Referral System",
      description: "Invite developers into the platform and reward community growth with meaningful perks.",
      icon: Gift,
      color: "text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/20",
      accent: "from-fuchsia-500/20 via-purple-500/10 to-transparent",
      gradient: "from-fuchsia-500/20 to-purple-400/20 shadow-fuchsia-500/10",
      stats: "Invites, rewards, growth loops",
      status: "Community expansion"
    }
  ];

  const valueProps = [
    { label: "Tracked Developers", numericValue: 85420, suffix: "+", decimals: 0, icon: Users },
    { label: "Challenges Solved", numericValue: 1.2, suffix: "M+", decimals: 1, icon: Target },
    { label: "Pull Requests Analyzed", numericValue: 3.4, suffix: "M+", decimals: 1, icon: Zap },
    { label: "Global Badges Issued", numericValue: 24000, suffix: "+", decimals: 0, icon: Award }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blob-purple-strong pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blob-blue-strong pointer-events-none -z-10 animate-pulse-slow" />

      <section className="relative min-h-screen w-full py-20 md:py-28 overflow-hidden flex items-center">
        <video
          className="absolute top-0 left-0 w-full h-[90%] object-cover opacity-50 pointer-events-none"
          src="/banner.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />

        <div className="absolute top-0 left-0 w-full h-[90%] bg-white/60 dark:bg-black/60 pointer-events-none" />

        <div className="relative z-10 w-full px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.1, 0.05)}
            className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-left"
          >
            <div className="flex-1 space-y-6">
              <motion.span
                variants={fadeUp()}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 backdrop-blur-sm"
              >
                The Developer Gamification Platform
              </motion.span>

              <motion.h1
                variants={fadeUp()}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white my-0"
              >
                Level Up Your Code. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-500">
                  Claim Your Leaderboard Rank.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp()}
                className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium"
              >
                RankerHub tracks commits, streaks, and problem-solving to gamify your software development journey. Build habits, spotlight contributions, and earn badges.
              </motion.p>

              <motion.div
                variants={fadeUp()}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link to="/login">
                  <GradientButton className="w-full sm:w-auto flex items-center justify-center">
                    Get Started <ArrowRight className="w-4 h-4 ml-1" />
                  </GradientButton>
                </Link>
               <a href="https://github.com/indresh404/RankerHub"
  target="_blank"
  rel="noopener noreferrer"
>
  <GradientButton variant="secondary" className="w-full sm:w-auto">
    View on GitHub
  </GradientButton>
</a>
              </motion.div>
            </div>

            <motion.div variants={fadeUp()} className="flex-shrink-0">
              <GlowRingLogo
                logoSrc={logo}
                type="logo"
                className="w-48 h-48 md:w-56 md:h-56 shadow-2xl transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {valueProps.map((prop) => {
            const Icon = prop.icon;
            return (
              <div key={prop.label} className="space-y-1">
                <div className="flex items-center justify-center text-violet-500 mb-2">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="block text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                  <AnimatedNumber
                    value={prop.numericValue}
                    suffix={prop.suffix}
                    decimals={prop.decimals}
                  />
                </span>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  {prop.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section id="features" className="py-20 space-y-8 overflow-hidden" aria-labelledby="features-heading">
        {/* Section header */}
        <div className="px-6 max-w-6xl mx-auto">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex w-fit items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-300">
              Feature suite
            </span>
            <h2 id="features-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white my-0">
              Everything developers need to turn progress into rank.
            </h2>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-7">
              A connected set of ranking, learning, habit, achievement, social, and referral systems designed for a modern developer platform.
            </p>
          </div>
        </div>

        {/* Feature slider using Swiper JS */}
        <div className="w-full max-w-6xl mx-auto px-6">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="swiper-container-features"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <SwiperSlide key={`${feature.title}-${idx}`}>
                  <div className="frosted-gradient-wrapper group">
                    {/* Vibrant frosted gradient backglow */}
                    <div className={`absolute -inset-1 bg-gradient-to-br ${feature.gradient} rounded-[28px] blur-xl opacity-25 dark:opacity-35 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none`} />
                    
                    <Card
                      glow={false}
                      className="frosted-glass-card group relative overflow-hidden p-0"
                    >
                      <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-br ${feature.accent}`} aria-hidden="true" />
                      <div className="relative flex h-full flex-col justify-between p-6 z-10">
                        <div className="space-y-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border shadow-sm transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md ${feature.color}`}>
                              <Icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <span className="rounded-full border border-slate-200/70 bg-white/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:border-slate-700/70 dark:bg-slate-950/40 dark:text-slate-400 transition-all duration-300 group-hover:border-violet-500/30 group-hover:text-violet-600 dark:group-hover:text-violet-400 group-hover:scale-105">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <div className="space-y-3">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-300">
                              {feature.status}
                            </p>
                            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                              {feature.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                              {feature.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 rounded-2xl border border-slate-200/70 bg-white/55 dark:bg-slate-950/35 px-4 py-3 shadow-sm transition-all duration-500 ease-out group-hover:border-violet-500/40 group-hover:bg-white/85 dark:group-hover:bg-slate-950/50 group-hover:shadow-md">
                          <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                            Built around
                          </span>
                          <span className="mt-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                            {feature.stats}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </div>
  );
};
//
export default Home;
