"use client";

import React from "react";
import { 
  ShieldCheck, 
  Users, 
  Layers, 
  Boxes, 
  Activity, 
  DollarSign,
  TrendingUp,
  Cpu
} from "lucide-react";

export default function AdminPanel() {
  
  const systemStats = [
    { label: "Active Platform Users", value: "1,842 accounts", change: "+12% this month", icon: <Users className="w-4 h-4 text-blue-500" /> },
    { label: "Total Pod Deployments", value: "4,912 containers", change: "+34% this month", icon: <Layers className="w-4 h-4 text-purple-500" /> },
    { label: "Global System Load", value: "32.4% CPU", change: "AWS Cluster Load", icon: <Cpu className="w-4 h-4 text-yellow-500" /> },
    { label: "Monthly Revenue (MRR)", value: "$36,840 MRR", change: "+8.4% improvement", icon: <DollarSign className="w-4 h-4 text-emerald-500" /> }
  ];

  const recentTransactions = [
    { user: "dev_sara", plan: "Pro Plan", amount: "$99/mo", status: "succeeded", time: "14 mins ago" },
    { user: "cloud_ops_corp", plan: "Enterprise Tier", amount: "$1,200/yr", status: "succeeded", time: "2 hours ago" },
    { user: "startup_hub", plan: "Starter Plan", amount: "$29/mo", status: "succeeded", time: "4 hours ago" },
    { user: "indie_coder", plan: "Pro Plan", amount: "$99/mo", status: "succeeded", time: "1 day ago" }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Internal Admin Authority
        </div>
        <h1 className="text-2xl font-bold tracking-tight">DeployAI Global Oversight</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Supervise global Kubernetes clusters, platform billing telemetry, and API Gateway rates limits.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((s, idx) => (
          <div key={idx} className="p-6 rounded-2xl border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 glass-panel">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">{s.label}</span>
              <div className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">{s.icon}</div>
            </div>
            <div className="text-xl font-bold">{s.value}</div>
            <span className="text-[10px] text-gray-450 dark:text-gray-500 block mt-1">{s.change}</span>
          </div>
        ))}
      </div>

      {/* Two columns: Billing logs & Platform Node Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Billing Audits */}
        <div className="lg:col-span-2 p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel space-y-4">
          <h3 className="text-sm font-bold">Stripe Subscriptions Audit</h3>
          
          <div className="divide-y divide-gray-100 dark:divide-gray-900/65">
            {recentTransactions.map((tx, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between text-xs first:pt-0 last:pb-0">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800 dark:text-gray-250">{tx.user}</span>
                  <span className="text-[10px] text-gray-400 font-mono mt-0.5">{tx.plan} • Stripe Webhook</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 dark:text-white block">{tx.amount}</span>
                  <span className="text-[10px] text-emerald-500 font-semibold">{tx.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel space-y-4">
          <h3 className="text-sm font-bold">AWS Cluster Nodes</h3>
          
          <div className="space-y-4">
            {[
              { id: "us-east-cluster", location: "N. Virginia (Primary)", status: "healthy", load: "34%" },
              { id: "eu-west-cluster", location: "Frankfurt (Backup)", status: "healthy", load: "12%" },
              { id: "ap-south-cluster", location: "Mumbai (Edge CDN)", status: "healthy", load: "18%" }
            ].map((node, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-gray-150 dark:border-gray-900/65 bg-gray-50/50 dark:bg-gray-950/20 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-gray-850 dark:text-gray-250">{node.id}</span>
                  <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Healthy</span>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>{node.location}</span>
                  <span className="font-mono font-bold text-gray-700 dark:text-gray-300">Load: {node.load}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
