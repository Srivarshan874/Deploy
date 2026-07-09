"use client";

import React, { useState, useEffect } from "react";
import { 
  Activity, 
  Cpu, 
  Database, 
  HardDrive, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle,
  ArrowUpRight,
  TrendingDown,
  Clock
} from "lucide-react";

export default function Monitoring() {
  const [cpuHistory, setCpuHistory] = useState<number[]>([12, 18, 15, 22, 19, 14, 25, 20, 24, 18]);
  const [memHistory, setMemHistory] = useState<number[]>([42, 43, 42, 44, 44, 45, 45, 43, 44, 44]);
  const [trafficHistory, setTrafficHistory] = useState<number[]>([150, 180, 210, 190, 240, 220, 260, 280, 250, 270]);
  const [pingHistory, setPingHistory] = useState<number[]>([44, 46, 42, 52, 48, 41, 45, 42, 43, 44]);

  const [alerts, setAlerts] = useState([
    { id: 1, type: "success", title: "All systems operational", desc: "No resource threshold failures reported.", time: "Just now" },
    { id: 2, type: "info", title: "Auto-scaled cluster", desc: "Successfully scaled up AWS container pod 'core-frontend-32b' in response to traffic increase.", time: "1 hour ago" }
  ]);

  // Live updates effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuHistory(prev => [...prev.slice(1), Math.floor(Math.random() * 25) + 10]);
      setMemHistory(prev => {
        const offset = Math.random() > 0.5 ? 1 : -1;
        const next = Math.max(30, Math.min(80, prev[prev.length - 1] + offset));
        return [...prev.slice(1), next];
      });
      setTrafficHistory(prev => {
        const delta = Math.floor(Math.random() * 60) - 30;
        const next = Math.max(80, prev[prev.length - 1] + delta);
        return [...prev.slice(1), next];
      });
      setPingHistory(prev => {
        const delta = Math.floor(Math.random() * 12) - 6;
        const next = Math.max(35, prev[prev.length - 1] + delta);
        return [...prev.slice(1), next];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const latestCpu = cpuHistory[cpuHistory.length - 1];
  const latestMem = memHistory[memHistory.length - 1];
  const latestTraffic = trafficHistory[trafficHistory.length - 1];
  const latestPing = pingHistory[pingHistory.length - 1];

  // Helper to generate SVG path string from history array
  const generatePath = (data: number[], max: number, height = 60, width = 240) => {
    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - (val / max) * height * 0.8 - 4; // Padding
      return `${x},${y}`;
    });
    return `M ${points.join(" L ")}`;
  };

  const generateFillPath = (data: number[], max: number, height = 60, width = 240) => {
    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - (val / max) * height * 0.8 - 4;
      return `${x},${y}`;
    });
    return `M 0,${height} L ${points.join(" L ")} L ${width},${height} Z`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Infrastructure Monitoring</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Real-time metrics streaming from Kubernetes pods and AWS Cloud Watch endpoints.
        </p>
      </div>

      {/* Grid of charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CPU Chart */}
        <div className="p-6 rounded-2xl border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 glass-panel">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500"><Cpu className="w-4 h-4" /></div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">CPU Usage</h3>
                <span className="text-2xl font-extrabold block mt-0.5">{latestCpu}%</span>
              </div>
            </div>
            <span className="text-xs text-gray-400 font-mono">10s window</span>
          </div>
          
          {/* SVG sparkline */}
          <div className="h-16 w-full mt-4">
            <svg className="w-full h-full" viewBox="0 0 240 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d={generateFillPath(cpuHistory, 50)} fill="url(#cpuGrad)" />
              <path d={generatePath(cpuHistory, 50)} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Memory Chart */}
        <div className="p-6 rounded-2xl border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 glass-panel">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500"><Database className="w-4 h-4" /></div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Memory Allocation</h3>
                <span className="text-2xl font-extrabold block mt-0.5">{latestMem}%</span>
              </div>
            </div>
            <span className="text-xs text-gray-400 font-mono">2.1 GB / 4.0 GB</span>
          </div>

          <div className="h-16 w-full mt-4">
            <svg className="w-full h-full" viewBox="0 0 240 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#A855F7" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d={generateFillPath(memHistory, 100)} fill="url(#memGrad)" />
              <path d={generatePath(memHistory, 100)} fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Network / Traffic Chart */}
        <div className="p-6 rounded-2xl border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 glass-panel">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500"><Activity className="w-4 h-4" /></div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Traffic (Requests)</h3>
                <span className="text-2xl font-extrabold block mt-0.5">{latestTraffic} req/m</span>
              </div>
            </div>
            <span className="text-xs text-green-500 font-semibold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12.4%
            </span>
          </div>

          <div className="h-16 w-full mt-4">
            <svg className="w-full h-full" viewBox="0 0 240 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d={generateFillPath(trafficHistory, 400)} fill="url(#trafficGrad)" />
              <path d={generatePath(trafficHistory, 400)} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Latency / Response Time Chart */}
        <div className="p-6 rounded-2xl border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 glass-panel">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-500"><Clock className="w-4 h-4" /></div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Avg Response Time</h3>
                <span className="text-2xl font-extrabold block mt-0.5">{latestPing} ms</span>
              </div>
            </div>
            <span className="text-xs text-blue-500 font-semibold flex items-center gap-0.5">
              <TrendingDown className="w-3.5 h-3.5" /> -4.1ms
            </span>
          </div>

          <div className="h-16 w-full mt-4">
            <svg className="w-full h-full" viewBox="0 0 240 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d={generateFillPath(pingHistory, 80)} fill="url(#pingGrad)" />
              <path d={generatePath(pingHistory, 80)} fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

      </div>

      {/* Storage and static numbers panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Storage */}
        <div className="p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel">
          <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Container Storage</span>
          <span className="text-xl font-bold block mt-2">14.2 GB / 50 GB</span>
          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-900 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: "28%" }} />
          </div>
          <span className="text-[9px] text-gray-400 mt-2 block">28.4% capacity utilized</span>
        </div>

        {/* Global Uptime */}
        <div className="p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel">
          <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Average Uptime</span>
          <span className="text-xl font-bold block mt-2 text-emerald-500">99.998%</span>
          <div className="flex gap-1 mt-4">
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} className="flex-grow h-4 bg-emerald-500 rounded-sm" title="Day Operational" />
            ))}
          </div>
          <span className="text-[9px] text-gray-400 mt-2 block">Last 30 days status checks</span>
        </div>

        {/* Bandwidth */}
        <div className="p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel">
          <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Monthly Bandwidth</span>
          <span className="text-xl font-bold block mt-2">234.8 GB</span>
          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-900 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: "47%" }} />
          </div>
          <span className="text-[9px] text-gray-400 mt-2 block">47% of 500GB quota limit</span>
        </div>

      </div>

      {/* Critical Warnings / Logs Section */}
      <div className="p-6 rounded-2xl border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 glass-panel">
        <h3 className="text-sm font-bold mb-4">Operations Health Notifications</h3>
        
        <div className="space-y-3">
          {alerts.map((a) => (
            <div key={a.id} className="p-4 rounded-xl border border-gray-150 dark:border-gray-900/65 flex gap-3 text-xs">
              <div className="mt-0.5">
                {a.type === "success" ? (
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
                ) : (
                  <CheckCircle className="w-4.5 h-4.5 text-blue-500" />
                )}
              </div>
              <div className="flex-grow">
                <span className="font-bold text-gray-800 dark:text-gray-250 block">{a.title}</span>
                <p className="text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{a.desc}</p>
              </div>
              <span className="text-[10px] font-mono text-gray-400 shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
