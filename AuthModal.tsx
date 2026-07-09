"use client";

import React, { useState } from "react";
import { X, Mail, Lock, Terminal, Loader2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [method, setMethod] = useState<"oauth" | "email">("oauth");

  if (!isOpen) return null;

  const handleLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
      onClose();
    }, 1500);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-8 shadow-2xl glass-panel animate-fade-in-up">
        
        {/* Decorative Ambient Light */}
        <div className="absolute -top-12 -left-12 w-28 h-28 rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-28 h-28 rounded-full bg-purple-500/10 dark:bg-purple-500/20 blur-xl pointer-events-none" />

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-gray-100 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 items-center justify-center text-white mb-4 shadow-lg shadow-indigo-500/10">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-2">Welcome to DeployAI</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Autonomous DevOps at your fingertips.
          </p>
        </div>

        {isLoading ? (
          <div className="h-48 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-xs font-mono text-gray-500 dark:text-gray-400">Securely authenticating credentials...</p>
          </div>
        ) : method === "oauth" ? (
          <div className="space-y-4">
            {/* Google Login */}
            <button 
              onClick={() => handleLogin("Google")}
              className="w-full flex items-center justify-center gap-3 px-4 h-11 text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path d="M21.35,11.1H12v2.7h5.38C16.88,16.27,14.67,18,12,18c-3.31,0-6-2.69-6-6s2.69-6,6-6c1.55,0,2.97,0.59,4.04,1.56l2.1-2.1C16.48,3.9,14.34,3,12,3C7.03,3,3,7.03,3,12s4.03,9,9,9c4.7,0,8.73-3.41,9.35-8.21A3.7,3.7,0,0,0,21.35,11.1Z" fill="#34A853" />
                  <path d="M21.35,11.1H12v2.7h5.38C16.88,16.27,14.67,18,12,18c-3.31,0-6-2.69-6-6s2.69-6,6-6c1.55,0,2.97,0.59,4.04,1.56l2.1-2.1C16.48,3.9,14.34,3,12,3C7.03,3,3,7.03,3,12s4.03,9,9,9c4.7,0,8.73-3.41,9.35-8.21A3.7,3.7,0,0,0,21.35,11.1Z" fill="#4285F4" />
                  <path d="M21.35,11.1H12v2.7h5.38C16.88,16.27,14.67,18,12,18c-3.31,0-6-2.69-6-6s2.69-6,6-6c1.55,0,2.97,0.59,4.04,1.56l2.1-2.1C16.48,3.9,14.34,3,12,3C7.03,3,3,7.03,3,12s4.03,9,9,9c4.7,0,8.73-3.41,9.35-8.21A3.7,3.7,0,0,0,21.35,11.1Z" fill="#FBBC05" />
                  <path d="M21.35,11.1H12v2.7h5.38C16.88,16.27,14.67,18,12,18c-3.31,0-6-2.69-6-6s2.69-6,6-6c1.55,0,2.97,0.59,4.04,1.56l2.1-2.1C16.48,3.9,14.34,3,12,3C7.03,3,3,7.03,3,12s4.03,9,9,9c4.7,0,8.73-3.41,9.35-8.21A3.7,3.7,0,0,0,21.35,11.1Z" fill="#EA4335" />
                </g>
              </svg>
              Continue with Google
            </button>

            {/* GitHub Login */}
            <button 
              onClick={() => handleLogin("GitHub")}
              className="w-full flex items-center justify-center gap-3 px-4 h-11 text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              Continue with GitHub
            </button>

            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-gray-150 dark:border-gray-800"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs font-mono">or</span>
              <div className="flex-grow border-t border-gray-150 dark:border-gray-800"></div>
            </div>

            {/* Switch to Email Form */}
            <button 
              onClick={() => setMethod("email")}
              className="w-full flex items-center justify-center gap-2 px-4 h-11 text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <Mail className="w-4 h-4 text-gray-500" />
              Sign in with Email
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  required
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  required
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full h-11 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all"
            >
              Sign In
            </button>

            <button 
              type="button"
              onClick={() => setMethod("oauth")}
              className="w-full text-xs font-semibold text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors pt-2"
            >
              ← Back to Social Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
