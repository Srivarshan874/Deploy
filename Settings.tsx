"use client";

import React, { useState } from "react";
import { 
  CreditCard, 
  Key, 
  Check, 
  ShieldAlert, 
  Plus, 
  Trash2, 
  Lock,
  Unlock,
  Coins
} from "lucide-react";

interface EnvVar {
  key: string;
  value: string;
  isSecret: boolean;
}

export default function Settings() {
  const [activePlan, setActivePlan] = useState("pro");
  const [envVars, setEnvVars] = useState<EnvVar[]>([
    { key: "DATABASE_URL", value: "postgresql://neondb_owner:***@ep-dark-flower-a5.us-east-2.aws.neon.tech/neondb", isSecret: true },
    { key: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", value: "pk_test_Y2xlcmsuYWNjb3VudHMuZGV2JA", isSecret: false }
  ]);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newIsSecret, setNewIsSecret] = useState(true);
  const [revealedKeys, setRevealedKeys] = useState<string[]>([]);

  const plans = [
    { id: "free", name: "Free Tier", price: "$0", desc: "For personal portfolios and testing configurations", features: ["1 active container pod", "Free *.deployai.app subdomain", "AI analysis audits", "Community Slack support"] },
    { id: "starter", name: "Starter", price: "$29", desc: "For small indie products and side projects", features: ["3 active container pods", "Custom domains + SSL", "Intelligent Error Resolution", "Standard email support"] },
    { id: "pro", name: "Pro Plan", price: "$99", desc: "For fast growing startup product teams", features: ["10 active container pods", "Multi-stage CDN caching", "Priority DevOps Bot triggers", "24/7 dedicated support", "Team permissions roles"] },
    { id: "enterprise", name: "Enterprise", price: "$999", desc: "For large enterprise clusters and microservices", features: ["Unlimited container pods", "Dedicated AWS server farms", "Custom SLA & compliance audits", "Dedicated DevOps Engineer support"] }
  ];

  const handleAddEnv = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey || !newValue) return;

    setEnvVars(prev => [...prev, { key: newKey, value: newValue, isSecret: newIsSecret }]);
    setNewKey("");
    setNewValue("");
    setNewIsSecret(true);
  };

  const handleRemoveEnv = (key: string) => {
    setEnvVars(prev => prev.filter(v => v.key !== key));
  };

  const toggleReveal = (key: string) => {
    setRevealedKeys(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Project Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your subscription plans, active pricing tiers, and project environment variables.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns: Environment Variables & Billing */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Environment Variables */}
          <div className="p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Key className="w-4.5 h-4.5 text-blue-500" />
              <h3 className="text-sm font-bold">Secure Environment Secrets</h3>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Define runtime keys injected securely into your container pods at startup. Secrets are encrypted at rest using AES-256.
            </p>

            {/* List Env Vars */}
            <div className="space-y-3 pt-2">
              {envVars.map((v) => {
                const isRevealed = revealedKeys.includes(v.key);
                return (
                  <div key={v.key} className="p-3.5 rounded-xl border border-gray-150 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950/20 flex items-center justify-between gap-4 text-xs font-mono">
                    <div className="min-w-0 flex-grow">
                      <span className="font-bold text-gray-800 dark:text-gray-250 block truncate">{v.key}</span>
                      <span className="text-gray-400 dark:text-gray-500 block truncate mt-1">
                        {v.isSecret && !isRevealed ? "••••••••••••••••••••••••••••••••" : v.value}
                      </span>
                    </div>

                    <div className="flex gap-1.5 shrink-0">
                      {v.isSecret && (
                        <button
                          onClick={() => toggleReveal(v.key)}
                          className="p-1.5 rounded border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-400"
                        >
                          {isRevealed ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveEnv(v.key)}
                        className="p-1.5 rounded border border-gray-200 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-450 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Env Form */}
            <form onSubmit={handleAddEnv} className="border-t border-gray-100 dark:border-gray-900/60 pt-4 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="VARIABLE_KEY"
                value={newKey}
                onChange={e => setNewKey(e.target.value.toUpperCase())}
                className="flex-1 h-9 px-3 rounded-lg border border-gray-250 dark:border-gray-850 bg-white dark:bg-gray-900 text-xs font-mono outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                placeholder="variable_value"
                value={newValue}
                onChange={e => setNewValue(e.target.value)}
                className="flex-1 h-9 px-3 rounded-lg border border-gray-250 dark:border-gray-855 bg-white dark:bg-gray-900 text-xs font-mono outline-none focus:border-blue-500"
                required
              />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-gray-500 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newIsSecret}
                    onChange={e => setNewIsSecret(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Secret
                </label>
                <button
                  type="submit"
                  className="px-3 h-9 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm"
                >
                  Add Key
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Right Column: Pricing Subscriptions */}
        <div className="p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-4.5 h-4.5 text-purple-500" />
            <h3 className="text-sm font-bold">Active Subscriptions</h3>
          </div>

          <div className="space-y-4">
            {plans.map((p) => {
              const isActive = activePlan === p.id;
              return (
                <div 
                  key={p.id}
                  onClick={() => setActivePlan(p.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? "border-blue-500 bg-blue-550/5 dark:bg-indigo-950/10 glow-border-blue" 
                      : "border-gray-200 dark:border-gray-900/60 bg-gray-50/30 dark:bg-gray-950/10 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-250">{p.name}</span>
                    <span className="text-sm font-extrabold font-mono text-blue-500">{p.price}<span className="text-[10px] text-gray-400 font-normal">/mo</span></span>
                  </div>
                  <p className="text-[10px] text-gray-400 mb-3">{p.desc}</p>
                  
                  {isActive && (
                    <span className="text-[9px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1 w-max">
                      <Check className="w-3 h-3" /> Active Tier
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
