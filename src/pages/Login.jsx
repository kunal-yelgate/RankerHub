import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import Card from "../components/ui/Card";
import GradientButton from "../components/ui/GradientButton";

export const Login = () => {
  const [email, setEmail] = useState("indresh@rankerhub.dev");
  const [password, setPassword] = useState("••••••••••••");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate minor transition delay for premium loader response
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#090D1A] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      
      {/* Premium Rotating Background Blobs (optimized with radial gradients instead of expensive blur filters) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blob-purple-strong pointer-events-none animate-blob transform-gpu" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blob-blue-strong pointer-events-none animate-blob [animation-delay:3s] transform-gpu" />
      <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-blob-indigo-strong pointer-events-none animate-pulse-slow transform-gpu" />

      {/* Grid Pattern overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Glassmorphic Portal Box */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="backdrop-blur-2xl bg-slate-950/40 border-slate-800/40 p-8 shadow-2xl space-y-6">

	{/* Back to Home */}
          <div className="flex justify-start -mb-2">
            <a
              href="/"
              className="group flex items-center gap-1 text-xs text-slate-400 hover:text-violet-400 transition-colors duration-200 font-semibold"
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
              Back to Home
            </a>
          </div>       
          {/* Logo Brand Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-600 items-center justify-center shadow-lg shadow-indigo-500/20 mx-auto">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            
            <div className="space-y-1">
              <h1 className="text-2xl font-black tracking-tight text-white my-0 leading-none">
                Sign in to RankerHub
              </h1>
              <p className="text-xs text-slate-400 font-semibold">
                Analyze your commits, streaks, and ratings.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4 pt-2">
            {/* Email Field Visual */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-800 bg-slate-900/30 text-slate-300 cursor-not-allowed focus:outline-none placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Password Field Visual */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Password
                </label>
                <span className="text-[10px] font-bold text-violet-400 hover:underline cursor-not-allowed">
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={password}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-800 bg-slate-900/30 text-slate-300 cursor-not-allowed focus:outline-none placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Security Indicator */}
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold justify-center py-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Verified Secure Connection
            </div>

            {/* Fake login button */}
            <GradientButton
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-2 text-sm font-bold flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </GradientButton>
          </form>

          {/* Prompt footer */}
          <div className="text-center pt-2 text-xs text-slate-400 font-semibold border-t border-slate-800">
            Don't have an account?{" "}
            <span className="text-violet-400 font-bold hover:underline cursor-not-allowed">
              Sign Up
            </span>
          </div>

        </Card>
      </motion.div>

    </div>
  );
};

export default Login;
