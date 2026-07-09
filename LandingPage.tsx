"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Play, 
  Check, 
  X, 
  Terminal, 
  Cpu, 
  ShieldAlert, 
  Boxes, 
  CloudLightning, 
  Activity, 
  RotateCcw, 
  Zap, 
  Globe, 
  Lock,
  Moon,
  Sun
} from "lucide-react";

interface LandingPageProps {
  onStartDeploying: () => void;
  onOpenLogin: () => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function LandingPage({ 
  onStartDeploying, 
  onOpenLogin,
  theme,
  toggleTheme
}: LandingPageProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Cpu className="w-6 h-6 text-blue-500" />,
      title: "AI Deployment Agent",
      desc: "Fully autonomous agent that acts as your dedicated resident DevOps engineer, writing config files and setting up tasks."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-purple-500" />,
      title: "Intelligent Error Resolution",
      desc: "Instantly reads build logs, explains the failure in plain language, generates code fixes, and retries the deployment."
    },
    {
      icon: <Boxes className="w-6 h-6 text-pink-500" />,
      title: "Plugin Marketplace",
      desc: "Install databases, auth providers, analytics, and messaging integrations with a single click, configured automatically."
    },
    {
      icon: <CloudLightning className="w-6 h-6 text-yellow-500" />,
      title: "Automatic Infra Config",
      desc: "Detects your framework, generates Dockerfiles, sets up reverse proxies, provisions DBs, and secures container routing."
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-500" />,
      title: "One Click Deployment",
      desc: "Connect your repository or drop a ZIP. Our AI agent takes care of the build, tests, environment configurations, and launch."
    },
    {
      icon: <Activity className="w-6 h-6 text-red-500" />,
      title: "Continuous Monitoring",
      desc: "Real-time metrics dashboards displaying CPU, memory, storage, bandwidth, and traffic statistics with smart warnings."
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-sky-500" />,
      title: "Automatic Rollback",
      desc: "If any deploy fails health checks, DeployAI immediately rolls back to the last stable container, minimizing downtime."
    },
    {
      icon: <Zap className="w-6 h-6 text-indigo-500" />,
      title: "Performance Optimization",
      desc: "AI inspects your code bundles and suggests optimizations to compress sizes, reduce asset sizes, and speed up LCP."
    },
    {
      icon: <Globe className="w-6 h-6 text-teal-500" />,
      title: "Free Subdomains",
      desc: "Receive instant free TLS-secured subdomains at `*.deployai.app` to preview and share your builds globally."
    },
    {
      icon: <Lock className="w-6 h-6 text-orange-500" />,
      title: "Custom Domains & SSL",
      desc: "Add your custom domain with automatic Cloudflare-powered DNS setup and wildcard SSL certificate provisioning."
    }
  ];

  const steps = [
    { title: "Connect GitHub", desc: "Select repository or drop a zip archive" },
    { title: "AI Project Analysis", desc: "Framework, language, and runtime detected" },
    { title: "Prepare Infra", desc: "Generate Dockerfiles and container layers" },
    { title: "Configure Plugins", desc: "Inject DBs, Auth, and APIs dynamically" },
    { title: "AI Deploy Application", desc: "Spin up secure container clusters" },
    { title: "Live URL Ready", desc: "Free SSL certificate and CDN enabled" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 bg-dot-pattern transition-colors duration-300">
      
      {/* Decorative Glow Bubbles */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-blue-600/10 dark:bg-blue-600/20 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-purple-600/15 dark:bg-purple-600/20 blur-[120px] pointer-events-none animate-pulse-slow" />
      
      {/* Floating Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 animate-pulse-slow">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-gray-950 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Deploy<span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">AI</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
            <a href="#features" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Features</a>
            <a href="#comparison" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Comparison</a>
            <a href="#how-it-works" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Workflow</a>
            <a href="#pricing" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
              onClick={onOpenLogin}
              className="text-sm font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors hidden sm:block"
            >
              Log in
            </button>
            <button 
              onClick={onStartDeploying}
              className="flex items-center gap-2 px-4 h-9 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/10 hover:shadow-indigo-500/20 active:scale-[0.98] transition-all"
            >
              Start Deploying
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-8 animate-fade-in-up">
          <Zap className="w-3.5 h-3.5" />
          DevOps on Autopilot
        </div>
        
        <h1 className="max-w-4xl mx-auto text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8 animate-fade-in-up">
          Deploy Production-Ready <br />
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Applications with AI
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
          DeployAI analyzes your application, configures infrastructure, resolves deployment errors, installs production-ready plugins, and launches your application in minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up [animation-delay:300ms]">
          <button 
            onClick={onStartDeploying}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 h-12 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 active:scale-[0.98] transition-all"
          >
            Start Deploying
            <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={onStartDeploying} 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 h-12 text-base font-semibold text-gray-700 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            <Play className="w-4 h-4 fill-current text-blue-500" />
            Watch Demo
          </button>
        </div>

        {/* Animated Backdrop: Cloud Architecture Network Mockup */}
        <div className="relative max-w-5xl mx-auto border border-gray-200/60 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-2xl p-4 sm:p-8 shadow-2xl animate-fade-in-up [animation-delay:400ms]">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-950 text-[11px] font-mono text-gray-500 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
              deployai-agent-v1.0.8.sh
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3 border border-blue-500/20">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold mb-1">GitHub Repo</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">nexus-api-main.zip</p>
            </div>

            <div className="p-5 rounded-xl border border-blue-500/30 dark:border-indigo-500/30 bg-blue-50/20 dark:bg-indigo-950/20 flex flex-col items-center justify-center text-center relative overflow-hidden glow-border-blue">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-30 animate-pulse" />
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mb-3 shadow-md">
                <Terminal className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold mb-1 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">AI DevOps Engineer</h4>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-mono">Deploying containers...</p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 mb-3 border border-purple-500/20">
                <Boxes className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold mb-1">Kubernetes Cluster</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">https://nexus.deployai.app</p>
            </div>

            {/* Connecting SVG lines with pulsating dashes */}
            <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ zIndex: -1 }}>
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M 230,70 L 320,70" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" fill="none" className="animate-dash" />
                <path d="M 590,70 L 680,70" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="2" fill="none" className="animate-dash" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200/50 dark:border-gray-900/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Built for modern product teams
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Everything your operations team needs, packed in a single autonomous agent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div 
              key={i} 
              onClick={onStartDeploying}
              className="p-6 rounded-2xl border border-gray-200/60 dark:border-gray-800 bg-white/50 dark:bg-gray-900/30 glass-panel glass-card-hover cursor-pointer"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="max-w-5xl mx-auto px-6 py-20 border-t border-gray-200/50 dark:border-gray-900/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            The DevOps Evolution
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Stop losing hours config-hunting. Let AI handle the complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional */}
          <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/10">
            <h3 className="text-xl font-bold mb-6 text-red-500 flex items-center gap-2">
              <X className="w-5 h-5" />
              Traditional Deployment
            </h3>
            <ul className="space-y-4">
              {[
                "Manual configuration files (Docker, Nginx, Kubernetes YAML)",
                "Debug deployment failures from cryptic error logs",
                "Configure cloud resources manually (AWS IAM, VPC, routing)",
                "Install and configure plugins and databases manually"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* DeployAI */}
          <div className="p-8 rounded-2xl border border-blue-500/20 dark:border-indigo-500/20 bg-blue-50/20 dark:bg-indigo-950/10 relative overflow-hidden glow-border-blue">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none" />
            <h3 className="text-xl font-bold mb-6 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Check className="w-5 h-5" />
              DeployAI Way
            </h3>
            <ul className="space-y-4">
              {[
                "AI understands your project framework and dependencies",
                "AI automatically identifies and fixes deployment failures",
                "AI installs required plugins and injects security credentials",
                "AI provisions and manages cloud infrastructure seamlessly"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-800 dark:text-gray-300 font-medium">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it Works / Timeline */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200/50 dark:border-gray-900/50 bg-gray-50/20 dark:bg-gray-900/10 rounded-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Six steps to deploy. DeployAI works with you at each checkpoint.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="absolute left-[33px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 opacity-20" />

          <div className="space-y-12">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={idx} 
                  className={`flex flex-col md:flex-row items-start md:items-center relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Step Bubble */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-[9px] md:-translate-x-1/2 z-10">
                    <div className={`w-[20px] h-[20px] rounded-full border-4 ${
                      isActive 
                        ? "bg-blue-500 border-blue-200 dark:border-blue-900 animate-ping" 
                        : "bg-gray-300 dark:bg-gray-700 border-gray-100 dark:border-gray-900"
                    }`} />
                    {isActive && (
                      <div className="absolute inset-0 w-[20px] h-[20px] rounded-full bg-blue-500 border-4 border-blue-200 dark:border-blue-900" />
                    )}
                  </div>

                  {/* Step Card */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    isEven ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}>
                    <div className={`p-6 rounded-2xl border transition-all duration-500 ${
                      isActive 
                        ? "border-blue-500/40 bg-white dark:bg-gray-900 shadow-md shadow-blue-500/5 glow-border-blue" 
                        : "border-gray-200/50 dark:border-gray-900/50 bg-white/40 dark:bg-gray-950/20"
                    }`}>
                      <span className="text-xs font-mono text-blue-500 dark:text-blue-400 font-bold block mb-1">
                        STEP 0{idx + 1}
                      </span>
                      <h4 className="text-base font-bold mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 dark:border-gray-900/50 bg-gray-50/30 dark:bg-gray-950/30 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">DeployAI Inc.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Security</a>
          </div>
          <p>© 2026 DeployAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
