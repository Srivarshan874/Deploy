"use client";

import React, { useState } from "react";
import { 
  Cpu, 
  Terminal, 
  Database, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  Play, 
  FileCode, 
  ChevronRight,
  Info,
  ShieldCheck,
  Settings
} from "lucide-react";

interface AIAnalysisProps {
  projectName: string;
  framework: string;
  language: string;
  onDeploy: (config: any) => void;
  onCancel: () => void;
}

export default function AIAnalysis({
  projectName,
  framework,
  language,
  onDeploy,
  onCancel
}: AIAnalysisProps) {
  const [dbStatus, setDbStatus] = useState("Needs binding");
  const [envStatus, setEnvStatus] = useState("Incomplete (3 variables missing)");
  const [dockerfileContent, setDockerfileContent] = useState(`FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]`);

  const dependencies = [
    { name: "next", version: "^14.2.3", status: "safe" },
    { name: "react", version: "^18.3.1", status: "safe" },
    { name: "react-dom", version: "^18.3.1", status: "safe" },
    { name: "tailwindcss", version: "^3.4.1", status: "safe" },
    { name: "typescript", version: "^5.4.5", status: "safe" },
    { name: "clerk-react", version: "^5.0.0", status: "warning", message: "Environment key CLERK_PUBLISHABLE_KEY missing in settings" }
  ];

  // Risk calculation: envStatus is key
  const riskScore = envStatus.includes("missing") ? 38 : 12;
  const estimatedTime = "1m 45s";

  const handleApplyFix = (fixId: string) => {
    if (fixId === "env") {
      setEnvStatus("Configured securely");
    } else if (fixId === "db") {
      setDbStatus("Neon PostgreSQL bound");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold text-blue-500 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10">Analysis Complete</span>
            <span className="text-xs font-mono text-gray-400">Project: {projectName}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">AI DevOps Blueprint</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            DeployAI has completed repository inspection. Review environment setups below.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onCancel}
            className="px-4 h-10 text-xs font-semibold text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onDeploy({ riskScore, dbStatus, envStatus })}
            className="flex items-center justify-center gap-2 px-5 h-10 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/10 active:scale-[0.98] transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Approve & Deploy
          </button>
        </div>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Inspection Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Framework</span>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-1">{framework}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Language</span>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-1">{language}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Build Commands</span>
              <span className="text-sm font-mono font-semibold text-gray-600 dark:text-gray-300 mt-1">npm run build</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Runtime Target</span>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-1">Node.js 20.x Standalone</span>
            </div>
          </div>

          {/* Dockerfile Editor */}
          <div className="p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold">Auto-Generated Dockerfile</h3>
              </div>
              <span className="text-[10px] font-mono text-gray-400 bg-gray-50 dark:bg-gray-900 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-800">
                Multi-stage build
              </span>
            </div>
            <textarea
              value={dockerfileContent}
              onChange={e => setDockerfileContent(e.target.value)}
              className="w-full h-80 p-4 rounded-xl border border-gray-250 dark:border-gray-855 bg-gray-950 text-gray-300 font-mono text-xs focus:ring-1 focus:ring-blue-500 outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Dependencies Audit */}
          <div className="p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-500" />
                <h3 className="text-sm font-bold">Package Dependency Audit</h3>
              </div>
              <span className="text-xs text-green-500 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Checked
              </span>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-900/65">
              {dependencies.map((dep, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-250">{dep.name}</span>
                    <span className="text-[10px] font-mono text-gray-400">{dep.version}</span>
                  </div>
                  {dep.status === "safe" ? (
                    <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Verified</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Info Missing
                      </span>
                      <span className="text-[10px] text-gray-400">{dep.message}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Risk Gauge & Suggestions */}
        <div className="space-y-6">
          
          {/* Risk Gauge */}
          <div className="p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-6">Deployment Risk Meter</span>
            
            <div className="relative w-40 h-40 mb-4 flex items-center justify-center">
              {/* SVG Ring */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="64"
                  className="stroke-gray-100 dark:stroke-gray-900"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="64"
                  className="transition-all duration-1000 ease-out"
                  stroke={riskScore > 20 ? "#F59E0B" : "#10B981"}
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={402}
                  strokeDashoffset={402 - (402 * riskScore) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-extrabold">{riskScore}%</span>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-0.5">
                  {riskScore > 20 ? "Medium Risk" : "Very Low"}
                </span>
              </div>
            </div>

            <div className="flex gap-4 text-xs font-mono text-gray-400 mt-2 border-t border-gray-150 dark:border-gray-900/60 pt-4 w-full justify-around">
              <div>
                <span className="block font-bold text-gray-700 dark:text-gray-300">{estimatedTime}</span>
                <span>Est. Deploy</span>
              </div>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-800" />
              <div>
                <span className="block font-bold text-gray-700 dark:text-gray-300">Clean build</span>
                <span>Audit Health</span>
              </div>
            </div>
          </div>

          {/* Suggested Improvements */}
          <div className="p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel space-y-4">
            <h3 className="text-sm font-bold">Actionable Blueprint Tasks</h3>
            
            <div className="space-y-4">
              {/* Env Var Fix */}
              <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950/20 space-y-3">
                <div className="flex gap-2.5">
                  <Settings className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold">Inject Required Env Vars</span>
                    <p className="text-[10px] text-gray-400 mt-0.5">Clerk publishable credentials should be provisioned securely.</p>
                  </div>
                </div>
                {envStatus.includes("missing") ? (
                  <button 
                    onClick={() => handleApplyFix("env")}
                    className="w-full h-8 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-white dark:hover:text-white border border-blue-500/20 hover:bg-blue-600 rounded-lg transition-colors"
                  >
                    Quick Add Demo Variables
                  </button>
                ) : (
                  <span className="text-[10px] font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded border border-green-500/25 flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> Configured Successfully
                  </span>
                )}
              </div>

              {/* DB Binding Fix */}
              <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950/20 space-y-3">
                <div className="flex gap-2.5">
                  <Database className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold">Bind PostgreSQL Database</span>
                    <p className="text-[10px] text-gray-400 mt-0.5">Application needs a PostgreSQL binding for database models.</p>
                  </div>
                </div>
                {dbStatus.includes("binding") ? (
                  <button 
                    onClick={() => handleApplyFix("db")}
                    className="w-full h-8 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-white dark:hover:text-white border border-blue-500/20 hover:bg-blue-600 rounded-lg transition-colors"
                  >
                    Auto-Bind Neon DB Plugin
                  </button>
                ) : (
                  <span className="text-[10px] font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded border border-green-500/25 flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> Neon Database Configured
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
