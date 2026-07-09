"use client";

import React from "react";
import { 
  Rocket, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Plus, 
  ArrowUpRight, 
  ExternalLink,
  ShieldCheck,
  Globe
} from "lucide-react";
import { Github } from "@/components/Icons";

export interface Project {
  id: string;
  name: string;
  framework: string;
  language: string;
  status: "deployed" | "deploying" | "failed" | "idle";
  branch: string;
  lastCommit: string;
  lastUpdated: string;
  url: string;
  repo: string;
}

interface MainDashboardProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onImportNewProject: () => void;
  onSelectTab: (tab: string) => void;
}

export default function MainDashboard({ 
  projects, 
  onSelectProject, 
  onImportNewProject,
  onSelectTab
}: MainDashboardProps) {

  const stats = [
    { label: "Success Rate", value: "98.4%", icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, desc: "vs 94.2% traditional" },
    { label: "Avg Deploy Time", value: "2m 14s", icon: <Clock className="w-5 h-5 text-blue-500" />, desc: "Fully automated pipeline" },
    { label: "Active Servers", value: "8 Pods", icon: <Rocket className="w-5 h-5 text-purple-500" />, desc: "Kubernetes containers" },
    { label: "Secured Domains", value: "3 SSL", icon: <Globe className="w-5 h-5 text-teal-500" />, desc: "Cloudflare provisioned" }
  ];

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "deployed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-550/10 dark:bg-emerald-500/10 text-green-650 dark:text-emerald-400 border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Deployed
          </span>
        );
      case "deploying":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
            Deploying
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20">
            <AlertTriangle className="w-3.5 h-3.5" />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-150 dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700">
            Idle
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">DevOps Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monitor and manage your autonomous AI DevOps infrastructure.
          </p>
        </div>
        <button 
          onClick={onImportNewProject}
          className="flex items-center justify-center gap-2 px-4 h-10 text-sm font-semibold text-white rounded-lg bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/15 active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" />
          Import Repository
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <div key={idx} className="p-6 rounded-2xl border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 glass-panel">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{s.label}</span>
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800">{s.icon}</div>
            </div>
            <div className="text-2xl font-bold mb-1">{s.value}</div>
            <p className="text-xs text-gray-400 dark:text-gray-500">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Active Projects Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight">Active Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div 
              key={p.id}
              className="rounded-2xl border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 glass-panel glass-card-hover p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-gray-900 dark:text-white truncate">{p.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono mt-0.5">{p.framework} • {p.language}</span>
                  </div>
                  {getStatusBadge(p.status)}
                </div>

                <div className="flex items-center gap-2 mb-4 text-xs text-gray-500 dark:text-gray-400 font-mono">
                  <Github className="w-3.5 h-3.5" />
                  <span className="truncate">{p.repo}</span>
                  <span className="text-gray-300 dark:text-gray-850">|</span>
                  <span>{p.branch}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-900/60 pt-4 mt-2 flex items-center justify-between">
                <span className="text-[10px] text-gray-400">Updated {p.lastUpdated}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onSelectProject(p.id)}
                    className="flex items-center gap-1 px-3 h-7 text-xs font-semibold text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    Manage
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                  {p.status === "deployed" && (
                    <a 
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DevOps Activity Log Stream (Mock) */}
      <div className="p-6 rounded-2xl border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 glass-panel">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <h3 className="text-sm font-bold">Recent DevOps Operations</h3>
            <p className="text-xs text-gray-400">AI activity logs from your cloud server environment</p>
          </div>
          <button 
            onClick={() => onSelectTab("logs")}
            className="text-xs font-semibold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
          >
            View all logs
          </button>
        </div>

        <div className="space-y-4">
          {[
            {
              time: "10:14:02",
              type: "success",
              msg: "Successfully generated Docker container layer for project 'nexus-api'",
              meta: "DeployAI Bot v1.2"
            },
            {
              time: "09:44:11",
              type: "warning",
              msg: "Warning: High memory usage detected on pod 'core-frontend-32b'. AI scaling up CPU allocation.",
              meta: "Kubernetes AutoScale"
            },
            {
              time: "08:12:45",
              type: "info",
              msg: "SSL certificate for subdomain 'api.deployai.app' successfully auto-renewed (Cloudflare)",
              meta: "SSL Guard Agent"
            },
            {
              time: "07:05:12",
              type: "success",
              msg: "Database schema migration completed: Prisma migration file '20260709_init' applied to Neon PostgreSQL",
              meta: "Prisma DevOps Plugin"
            }
          ].map((log, idx) => (
            <div key={idx} className="flex gap-4 text-xs items-start border-b border-gray-50 dark:border-gray-900/60 pb-3 last:border-0 last:pb-0">
              <span className="font-mono text-gray-400 mt-0.5">{log.time}</span>
              <div className="flex-grow">
                <span className={`font-semibold mr-2 ${
                  log.type === "success" 
                    ? "text-green-600 dark:text-emerald-400" 
                    : log.type === "warning" 
                      ? "text-yellow-600 dark:text-yellow-500" 
                      : "text-blue-600 dark:text-blue-400"
                }`}>
                  [{log.type.toUpperCase()}]
                </span>
                <span className="text-gray-600 dark:text-gray-300">{log.msg}</span>
              </div>
              <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-800">
                {log.meta}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
