"use client";

import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  ArrowUpRight, 
  Clock, 
  CheckCircle,
  HelpCircle,
  FolderGit2
} from "lucide-react";

export default function Analytics() {
  
  const metrics = [
    { label: "Total Deploys", value: "148", change: "+14 this week", trend: "up" },
    { label: "Success Rate", value: "98.4%", change: "+2.1% improvement", trend: "up" },
    { label: "Avg Build Time", value: "2m 14s", change: "-12s reduction", trend: "down" },
    { label: "Total Plugin Binds", value: "14 active", change: "4 databases", trend: "up" }
  ];

  // Mock data for build times line chart (6 builds)
  const buildTimes = [154, 142, 160, 134, 145, 134]; // in seconds

  const generateLinePath = (data: number[], height = 100, width = 400) => {
    const min = Math.min(...data) - 10;
    const max = Math.max(...data) + 10;
    const range = max - min;
    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height * 0.7 - 15;
      return `${x},${y}`;
    });
    return `M ${points.join(" L ")}`;
  };

  const generateAreaPath = (data: number[], height = 100, width = 400) => {
    const min = Math.min(...data) - 10;
    const max = Math.max(...data) + 10;
    const range = max - min;
    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height * 0.7 - 15;
      return `${x},${y}`;
    });
    return `M 0,${height} L ${points.join(" L ")} L ${width},${height} Z`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Operations Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Historical build times, success metrics, and third-party integration distributions.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-6 rounded-2xl border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 glass-panel">
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">{m.label}</span>
            <div className="text-2xl font-bold mt-2">{m.value}</div>
            <span className={`text-[10px] font-semibold mt-1 block ${
              m.trend === "up" ? "text-emerald-500" : "text-blue-500"
            }`}>
              {m.change}
            </span>
          </div>
        ))}
      </div>

      {/* Main Chart Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Build Time History (Line Chart) */}
        <div className="lg:col-span-2 p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4.5 h-4.5 text-blue-500" />
              <h3 className="text-sm font-bold">Build Duration History (Last 6 deploys)</h3>
            </div>
            <span className="text-xs text-gray-400 font-mono">Values in seconds</span>
          </div>

          <div className="h-44 w-full relative">
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="analGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d={generateAreaPath(buildTimes)} fill="url(#analGrad)" />
              <path d={generateLinePath(buildTimes)} fill="none" stroke="#3B82F6" strokeWidth="3" />
            </svg>
          </div>

          <div className="flex justify-between text-[10px] font-mono text-gray-400 mt-4 border-t border-gray-100 dark:border-gray-900 pt-3">
            <span>Deploy #143 (Failed)</span>
            <span>Deploy #144 (Patched)</span>
            <span>Deploy #145</span>
            <span>Deploy #146</span>
            <span>Deploy #147</span>
            <span>Deploy #148 (Latest)</span>
          </div>
        </div>

        {/* Plugin Usage statistics (Horizontal Bars) */}
        <div className="p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4.5 h-4.5 text-purple-500" />
            <h3 className="text-sm font-bold">Marketplace Category Bindings</h3>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { cat: "Databases (Neon/Supabase)", count: 4, pct: 80, color: "bg-emerald-500" },
              { cat: "Authentication (Clerk)", count: 3, pct: 60, color: "bg-blue-500" },
              { cat: "AI Models (OpenAI/Gemini)", count: 2, pct: 40, color: "bg-purple-500" },
              { cat: "Payments (Stripe)", count: 2, pct: 40, color: "bg-indigo-500" },
              { cat: "Cloud File Storage (S3)", count: 1, pct: 20, color: "bg-orange-500" }
            ].map((p, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold">{p.cat}</span>
                  <span className="text-gray-400 font-mono">{p.count} instances</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                  <div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Failure reasons pie simulation */}
      <div className="p-6 rounded-2xl border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 glass-panel">
        <h3 className="text-sm font-bold mb-6">Operations Failure Diagnostics</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          {[
            { reason: "Environment variables unresolved", pct: "45%", desc: "Auto-scan injected credential fallbacks automatically." },
            { reason: "TypeScript syntax build errors", pct: "35%", desc: "Code compiler declarations missing in package exports." },
            { reason: "Container Dockerfile mapping failures", pct: "20%", desc: "Alpine environment package versions mismatch triggers." }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-gray-150 dark:border-gray-900/65 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold">{item.reason}</span>
                <span className="text-base font-extrabold text-blue-500 font-mono">{item.pct}</span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
