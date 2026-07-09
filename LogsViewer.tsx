"use client";

import React, { useState } from "react";
import { 
  Search, 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  Check, 
  AlertTriangle, 
  XCircle,
  HelpCircle,
  FileCode
} from "lucide-react";

interface LogLine {
  time: string;
  level: "info" | "warn" | "error";
  message: string;
  source: string;
}

export default function LogsViewer() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<"all" | "info" | "warn" | "error">("all");
  const [selectedLog, setSelectedLog] = useState<LogLine | null>(null);
  const [isResolved, setIsResolved] = useState<string[]>([]);

  const mockLogs: LogLine[] = [
    { time: "21:18:02", level: "info", message: "Starting container deployment pipeline v1.0.8", source: "orchestrator" },
    { time: "21:18:05", level: "info", message: "Running Prisma client generation schemas...", source: "database" },
    { time: "21:18:07", level: "info", message: "Successfully synced Prisma schemas with remote Neon cluster", source: "database" },
    { time: "21:18:12", level: "warn", message: "Prisma Warning: Database query latency exceeded 250ms threshold. [Query: SELECT * FROM User WHERE email = $1]", source: "database" },
    { time: "21:18:15", level: "info", message: "Compiling client bundles: next build", source: "builder" },
    { time: "21:18:22", level: "error", message: "Deployment Error: Missing environment key 'CLERK_SECRET_KEY' inside server execution shell.", source: "auth-plugin" },
    { time: "21:18:24", level: "warn", message: "Docker Daemon: Base image node:20-alpine has 3 minor CVE vulnerabilities. Upgrade recommended.", source: "docker" },
    { time: "21:18:30", level: "info", message: "Allocated ingress router ports: forwarding port 3000 to cluster edge", source: "network" }
  ];

  const filteredLogs = mockLogs.filter(l => {
    const matchesLevel = levelFilter === "all" || l.level === levelFilter;
    const matchesSearch = l.message.toLowerCase().includes(search.toLowerCase()) || 
                          l.source.toLowerCase().includes(search.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getAIAdvice = (log: LogLine) => {
    if (log.level === "error" && log.message.includes("CLERK_SECRET_KEY")) {
      return {
        title: "Missing Authentication Keys",
        desc: "The Clerk middleware is initialized but cannot retrieve Clerk credentials. This causes API crashes on authentication requests.",
        fix: "Define CLERK_SECRET_KEY and NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY inside Settings > Environment variables.",
        actionId: "clerk-env"
      };
    }
    if (log.level === "warn" && log.message.includes("latency")) {
      return {
        title: "Slow Database Latency",
        desc: "Database queries are running slow. This is commonly caused by missing table indexes on filtered columns like 'email'.",
        fix: "Add @@index([email]) inside your Prisma schema User model.",
        actionId: "prisma-index"
      };
    }
    if (log.level === "warn" && log.message.includes("CVE")) {
      return {
        title: "Docker Base Image CVEs",
        desc: "Your base container uses an older node:20-alpine digest which contains minor security vulnerabilities.",
        fix: "Change your Dockerfile base layer to node:20.12-alpine or node:22-alpine.",
        actionId: "docker-upgrade"
      };
    }
    return {
      title: "Clean Operations Log",
      desc: "This log represents standard system telemetry outputs without warnings or errors.",
      fix: "No action required.",
      actionId: ""
    };
  };

  const handleApplyAdvice = (actionId: string) => {
    setIsResolved(prev => [...prev, actionId]);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Deployment logs</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Audit raw execution stdout logs. Click on warnings or errors to consult the AI DevOps engineer.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex gap-2">
          {["all", "info", "warn", "error"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl as any)}
              className={`px-3 h-8 text-xs font-semibold rounded-lg border uppercase ${
                levelFilter === lvl
                  ? lvl === "error" 
                    ? "bg-red-500 border-red-500 text-white" 
                    : lvl === "warn" 
                      ? "bg-yellow-500 border-yellow-500 text-white" 
                      : "bg-blue-600 border-blue-600 text-white"
                  : "border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-950 text-gray-500"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Logs Console */}
        <div className="lg:col-span-2 flex flex-col h-[500px] rounded-2xl border border-gray-250 dark:border-gray-900 bg-gray-950 overflow-hidden font-mono shadow-xl">
          {/* Console Header */}
          <div className="px-5 h-12 bg-gray-900 border-b border-gray-850 flex items-center justify-between text-xs text-gray-400 shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-500" />
              <span>stdout / stderr</span>
            </div>
            
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search logs..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-48 h-7 pl-8 pr-3 rounded-lg border border-gray-800 bg-gray-950 text-[10px] focus:border-blue-500 outline-none"
              />
              <Search className="w-3 h-3 text-gray-500 absolute left-2.5 top-2" />
            </div>
          </div>

          {/* Logs Lines */}
          <div className="flex-grow p-5 overflow-y-auto space-y-1.5 text-xs text-gray-300">
            {filteredLogs.map((log, idx) => {
              const isSelected = selectedLog === log;
              let lineClass = "text-gray-400 hover:bg-gray-900/50 cursor-pointer p-1 rounded transition-colors";
              
              if (log.level === "error") {
                lineClass = "text-red-400 bg-red-500/5 hover:bg-red-500/10 cursor-pointer p-1 rounded transition-colors";
              } else if (log.level === "warn") {
                lineClass = "text-yellow-500 bg-yellow-500/5 hover:bg-yellow-500/10 cursor-pointer p-1 rounded transition-colors";
              }

              if (isSelected) {
                lineClass += " ring-1 ring-blue-500";
              }

              return (
                <div 
                  key={idx} 
                  className={lineClass}
                  onClick={() => setSelectedLog(log)}
                >
                  <span className="text-[10px] text-gray-500 mr-3">{log.time}</span>
                  <span className="font-semibold text-gray-500 mr-2 uppercase text-[9px] font-mono border border-gray-800 px-1 rounded bg-gray-900">
                    {log.source}
                  </span>
                  <span>{log.message}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Suggestions Side Panel */}
        <div className="p-6 border border-gray-250 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel space-y-4 flex flex-col justify-between h-[500px]">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <h3 className="text-sm font-bold">AI Diagnostics Engine</h3>
            </div>

            {selectedLog ? (
              <div className="space-y-4">
                <div className="flex items-center gap-1.5">
                  {selectedLog.level === "error" && <XCircle className="w-4 h-4 text-red-500" />}
                  {selectedLog.level === "warn" && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                  {selectedLog.level === "info" && <HelpCircle className="w-4 h-4 text-blue-500" />}
                  <span className="text-xs font-bold text-gray-850 dark:text-gray-200">
                    {getAIAdvice(selectedLog).title}
                  </span>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {getAIAdvice(selectedLog).desc}
                </p>

                <div className="p-3.5 rounded-xl border border-purple-500/15 bg-purple-500/5 text-xs font-mono">
                  <span className="block font-bold text-purple-600 dark:text-purple-400 text-[10px] uppercase mb-1">Recommended Patch</span>
                  {getAIAdvice(selectedLog).fix}
                </div>
              </div>
            ) : (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                <Terminal className="w-8 h-8 text-gray-400 animate-pulse-slow" />
                <p className="text-xs text-gray-500 max-w-[200px]">Click on any log line in the console to get instant AI fixes.</p>
              </div>
            )}
          </div>

          {selectedLog && getAIAdvice(selectedLog).actionId && (
            <div>
              {isResolved.includes(getAIAdvice(selectedLog).actionId) ? (
                <span className="w-full flex items-center justify-center gap-1.5 h-10 text-xs font-bold text-green-500 bg-green-500/10 border border-green-500/25 rounded-xl">
                  <Check className="w-4 h-4" /> Patch Applied
                </span>
              ) : (
                <button
                  onClick={() => handleApplyAdvice(getAIAdvice(selectedLog).actionId)}
                  className="w-full flex items-center justify-center gap-2 h-10 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-650 rounded-xl shadow-md active:scale-[0.98] transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Auto-Resolve this Log
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
