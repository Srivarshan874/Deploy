"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Terminal, 
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
  FileCode2,
  Lock
} from "lucide-react";

interface DeploymentPipelineProps {
  projectName: string;
  framework: string;
  onDeploySuccess: () => void;
  onCancel: () => void;
}

type StageStatus = "waiting" | "running" | "success" | "failed";

interface Stage {
  name: string;
  desc: string;
  status: StageStatus;
}

export default function DeploymentPipeline({
  projectName,
  framework,
  onDeploySuccess,
  onCancel
}: DeploymentPipelineProps) {
  
  const [stages, setStages] = useState<Stage[]>([
    { name: "Uploading", desc: "Pushing repository code to secure build container", status: "running" },
    { name: "Analyzing", desc: "AI audit of configurations and package locks", status: "waiting" },
    { name: "Installing Dependencies", desc: "Resolving packages and verifying hashes", status: "waiting" },
    { name: "Building", desc: "Running production framework compilation scripts", status: "waiting" },
    { name: "Fixing Errors", desc: "Applying autonomous AI code resolution updates", status: "waiting" },
    { name: "Deploying", desc: "Spinning up secure Docker layers on Kubernetes", status: "waiting" },
    { name: "Completed", desc: "Routing DNS domain handles and enabling SSL certificates", status: "waiting" }
  ]);

  const [logs, setLogs] = useState<string[]>([]);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [showErrorCard, setShowErrorCard] = useState(false);
  const [isPatchApplied, setIsPatchApplied] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Stages simulation loop
  useEffect(() => {
    if (isDone) return;

    const runSimulation = async () => {
      // Step 0: Uploading
      if (currentStageIdx === 0) {
        addLog("info - Initializing build sandbox environment Node.js v20.12.0...");
        addLog(`info - Clone target: demo_user/${projectName} (ref: refs/heads/main)`);
        addLog("info - Compressing files and uploading artifacts to build workspace...");
        await wait(2000);
        addLog("info - Upload complete (14.2 MB archive file parsed successfully).");
        updateStageStatus(0, "success");
        updateStageStatus(1, "running");
        setCurrentStageIdx(1);
      }

      // Step 1: Analyzing
      if (currentStageIdx === 1) {
        addLog("[DeployAI] - Starting autonomous repository inspection...");
        addLog(`[DeployAI] - Framework detected: ${framework}`);
        addLog("[DeployAI] - Dependency audit: package-lock.json found. 6 main packages verified.");
        addLog("[DeployAI] - Auto-generating Docker build layer mapping instructions...");
        await wait(2500);
        addLog("[DeployAI] - Analysis blueprint generated. 1 environment variable warning identified.");
        updateStageStatus(1, "success");
        updateStageStatus(2, "running");
        setCurrentStageIdx(2);
      }

      // Step 2: Installing Dependencies
      if (currentStageIdx === 2) {
        addLog("info - Installing dependencies via npm ci...");
        addLog("npm WARN deprecated inflight@1.0.6: This module is leaks memory. Check out lru-cache.");
        addLog("npm WARN deprecated glob@7.2.3: Old version of glob contains security vulnerabilities.");
        await wait(1500);
        addLog("added 342 packages, audited 343 packages in 4.8s");
        addLog("info - Dependency verification complete. Checksums matched.");
        updateStageStatus(2, "success");
        updateStageStatus(3, "running");
        setCurrentStageIdx(3);
      }

      // Step 3: Building (Fails first time)
      if (currentStageIdx === 3 && !isPatchApplied) {
        addLog("info - Running framework compilation: npm run build");
        addLog("Creating an optimized production build...");
        await wait(2000);
        addLog("Failed to compile.");
        addLog("");
        addLog("error - TypeScript type validation failed at: src/app/page.tsx (L12:28)");
        addLog("error - TS2307: Could not find declaration module '@components/ui/card' or its type declarations.");
        addLog("error - Build failed. Exited compile scripts with code 1.");
        await wait(800);
        
        updateStageStatus(3, "failed");
        addLog("");
        addLog("[DeployAI] - Alert: Build failed. Initiating autonomous log inspection...");
        setShowErrorCard(true);
      }

      // Step 5: Deploying (After patch is applied)
      if (currentStageIdx === 5 && isPatchApplied) {
        addLog("info - Packaging Docker container layers...");
        addLog("Step 1/6 : FROM node:20-alpine AS base");
        addLog(" ---> 619c24df9872");
        addLog("Step 2/6 : WORKDIR /app");
        addLog(" ---> Using cache");
        await wait(1500);
        addLog("Successfully tagged deploy-container-latest");
        addLog("info - Deploying server container to Kubernetes pod cluster...");
        addLog("info - Provisioning ingress load-balancer, routing domains to Cloudflare CDN...");
        await wait(2000);
        updateStageStatus(5, "success");
        updateStageStatus(6, "running");
        setCurrentStageIdx(6);
      }

      // Step 6: Completed
      if (currentStageIdx === 6 && isPatchApplied) {
        addLog("[DeployAI] - Allocating SSL wildcard certificates (Cloudflare TLS 1.3)...");
        await wait(1500);
        addLog(`[DeployAI] - Route established. Live URL: https://${projectName.toLowerCase()}.deployai.app`);
        addLog("[DeployAI] - Health checks passed. Deployment complete on AWS server farm.");
        updateStageStatus(6, "success");
        setIsDone(true);
        onDeploySuccess();
      }
    };

    runSimulation();
  }, [currentStageIdx, isPatchApplied]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, msg]);
  };

  const updateStageStatus = (idx: number, status: StageStatus) => {
    setStages((prev) => {
      const copy = [...prev];
      copy[idx].status = status;
      return copy;
    });
  };

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleApplyAIPatch = async () => {
    setShowErrorCard(false);
    updateStageStatus(3, "success");
    updateStageStatus(4, "running");
    setCurrentStageIdx(4);
    
    addLog("");
    addLog("[DeployAI] - Applying autonomous code patch: resolving imports inside src/app/page.tsx");
    addLog("Updating line 12: replacing absolute module path '@components/ui/card' with relative '@/components/ui/card'");
    await wait(2000);
    
    addLog("[DeployAI] - Patch applied successfully. Re-triggering framework compile...");
    updateStageStatus(4, "success");
    updateStageStatus(5, "running");
    setIsPatchApplied(true);
    setCurrentStageIdx(5);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono text-gray-400">Deploying: {projectName}</span>
            <span className="text-gray-300 dark:text-gray-800">|</span>
            <span className="text-xs font-mono text-blue-500 font-semibold">{framework}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Deployment Operations Pipeline</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monitor real-time server creation, Docker compiles, and DNS routing logs.
          </p>
        </div>
        <button 
          onClick={onCancel}
          className="px-4 h-10 text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          Cancel Build
        </button>
      </div>

      {/* Main Grid: Pipeline stages and Console Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Pipeline Stages */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Pipeline Stages</h2>
          
          <div className="space-y-3">
            {stages.map((stage, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-xl border flex items-center gap-4 transition-all duration-300 ${
                  stage.status === "running" 
                    ? "border-blue-500/30 bg-blue-50/20 dark:bg-indigo-950/15 shadow-sm glow-border-blue" 
                    : stage.status === "success"
                      ? "border-emerald-500/20 bg-emerald-500/5 text-gray-700 dark:text-gray-350"
                      : stage.status === "failed"
                        ? "border-red-500/20 bg-red-500/5 text-red-700 dark:text-red-400"
                        : "border-gray-200/50 dark:border-gray-900/50 bg-white/40 dark:bg-gray-950/20 text-gray-400"
                }`}
              >
                <div>
                  {stage.status === "running" && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
                  {stage.status === "success" && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                  {stage.status === "failed" && <XCircle className="w-5 h-5 text-red-500" />}
                  {stage.status === "waiting" && <div className="w-5 h-5 rounded-full border-2 border-gray-200 dark:border-gray-800" />}
                </div>
                
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold">{stage.name}</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 truncate mt-0.5">{stage.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Live Logs Terminal */}
        <div className="lg:col-span-2 flex flex-col h-[520px] rounded-2xl border border-gray-250 dark:border-gray-900 bg-gray-950 text-gray-300 overflow-hidden shadow-xl font-mono">
          {/* Console Header */}
          <div className="px-5 h-12 bg-gray-900 border-b border-gray-850 flex items-center justify-between text-xs text-gray-400 shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-500" />
              <span>DevOps Terminal console.log</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="w-2 h-2 rounded-full bg-green-500" />
            </div>
          </div>

          {/* Log Outputs */}
          <div className="flex-grow p-5 overflow-y-auto space-y-2 text-xs leading-relaxed">
            {logs.length === 0 ? (
              <span className="text-gray-600">Connecting to server build environment...</span>
            ) : (
              logs.map((log, idx) => {
                let colorClass = "text-gray-300";
                if (log.startsWith("error")) {
                  colorClass = "text-red-400 font-semibold";
                } else if (log.startsWith("npm WARN")) {
                  colorClass = "text-yellow-500";
                } else if (log.startsWith("[DeployAI]")) {
                  colorClass = "text-indigo-400 font-bold";
                } else if (log.startsWith("info")) {
                  colorClass = "text-gray-500";
                }

                return (
                  <div key={idx} className={`terminal-line ${colorClass}`}>
                    {log}
                  </div>
                );
              })
            )}
            <div ref={logsEndRef} />
          </div>
        </div>

      </div>

      {/* AI Error Resolution Overlay Modal Card */}
      {showErrorCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm" />
          
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-red-500/20 bg-white dark:bg-gray-950 p-8 shadow-2xl glass-panel animate-fade-in-up glow-border-purple">
            <div className="absolute -top-12 -left-12 w-28 h-28 rounded-full bg-purple-500/10 dark:bg-purple-500/20 blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                <ShieldCheck className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-500 font-bold">Autonomous DevOps Assistant</span>
                <h3 className="text-lg font-bold">AI Resolved Build Failure</h3>
              </div>
            </div>

            <div className="space-y-6">
              {/* Description */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-150 dark:border-gray-800 text-xs leading-relaxed">
                <p className="font-bold text-gray-700 dark:text-gray-300">Explanation:</p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  The TS compiler failed to resolve the import path `@components/ui/card` in `src/app/page.tsx`. Next.js configuration is set to resolve absolute module shortcuts using `@/components/...` with a leading slash, which matches your custom imports configuration.
                </p>
              </div>

              {/* Code Diff Panel */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span className="flex items-center gap-1.5"><FileCode2 className="w-3.5 h-3.5" /> src/app/page.tsx (Line 12)</span>
                  <span className="font-semibold text-purple-500">Confidence: 96.5%</span>
                </div>
                
                <div className="rounded-xl overflow-hidden border border-gray-250 dark:border-gray-855 font-mono text-xs">
                  <div className="bg-red-500/10 text-red-600 dark:text-red-400 p-2.5 flex items-center gap-2 border-b border-gray-100 dark:border-gray-900">
                    <span className="w-4 text-center shrink-0">-</span>
                    <span>import &#123; Card &#125; from &quot;@components/ui/card&quot;;</span>
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-2.5 flex items-center gap-2">
                    <span className="w-4 text-center shrink-0">+</span>
                    <span>import &#123; Card &#125; from &quot;@/components/ui/card&quot;;</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => setShowErrorCard(false)}
                  className="px-4 h-10 text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  Ignore Fix
                </button>
                <button
                  onClick={handleApplyAIPatch}
                  className="flex items-center gap-2 px-5 h-10 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-650 to-purple-600 hover:opacity-95 rounded-lg shadow-md shadow-indigo-500/20 active:scale-[0.98] transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Apply Fix & Re-deploy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Done State URL Section */}
      {isDone && (
        <div className="p-6 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-500/5 glass-panel animate-fade-in flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-emerald-650 dark:text-emerald-400">Application Live & Secured</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                SSL certificate is active. Cloud containers are distributed over AWS US-East pods.
              </p>
            </div>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <a
              href={`https://${projectName.toLowerCase()}.deployai.app`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-1.5 px-4 h-9.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-md shadow-emerald-500/10 transition-all"
            >
              Visit Application
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
