"use client";

import React, { useState } from "react";
import { 
  Boxes, 
  Search, 
  Check, 
  Loader2,
  Lock,
  Database,
  CreditCard,
  HardDrive,
  Mail,
  Bell,
  BarChart3,
  Bot,
  Activity,
  Plus
} from "lucide-react";

interface Plugin {
  id: string;
  name: string;
  category: "auth" | "payments" | "databases" | "storage" | "emails" | "notifications" | "analytics" | "ai" | "monitoring";
  provider: string;
  desc: string;
  icon: React.ReactNode;
}

interface PluginMarketplaceProps {
  installedPlugins: string[];
  onInstallPlugin: (pluginId: string) => void;
  onUninstallPlugin: (pluginId: string) => void;
}

export default function PluginMarketplace({
  installedPlugins,
  onInstallPlugin,
  onUninstallPlugin
}: PluginMarketplaceProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [installingId, setInstallingId] = useState<string | null>(null);

  const plugins: Plugin[] = [
    // Auth
    { id: "clerk", name: "Clerk", category: "auth", provider: "Clerk Inc.", desc: "Complete user authentication and session administration APIs", icon: <Lock className="w-5 h-5 text-blue-500" /> },
    { id: "supabase-auth", name: "Supabase Auth", category: "auth", provider: "Supabase", desc: "OAuth, email logins, passwordless integrations", icon: <Lock className="w-5 h-5 text-emerald-500" /> },
    { id: "firebase-auth", name: "Firebase Auth", category: "auth", provider: "Google", desc: "Multiplatform authorization provider hooks", icon: <Lock className="w-5 h-5 text-yellow-500" /> },
    // Payments
    { id: "stripe", name: "Stripe", category: "payments", provider: "Stripe", desc: "Accept subscription charges and card checkouts globally", icon: <CreditCard className="w-5 h-5 text-indigo-500" /> },
    { id: "razorpay", name: "Razorpay", category: "payments", provider: "Razorpay", desc: "Instant payment gateway integrations for India", icon: <CreditCard className="w-5 h-5 text-sky-500" /> },
    { id: "paypal", name: "PayPal", category: "payments", provider: "PayPal", desc: "Global merchant payouts and client billing systems", icon: <CreditCard className="w-5 h-5 text-blue-600" /> },
    // Databases
    { id: "neon", name: "Neon PostgreSQL", category: "databases", provider: "Neon DB", desc: "Serverless branching Postgres database node", icon: <Database className="w-5 h-5 text-emerald-400" /> },
    { id: "supabase-db", name: "Supabase DB", category: "databases", provider: "Supabase", desc: "Realtime PostgreSQL backend storage layer", icon: <Database className="w-5 h-5 text-emerald-600" /> },
    { id: "mongodb", name: "MongoDB Atlas", category: "databases", provider: "MongoDB", desc: "Fully managed document NoSQL JSON schemas", icon: <Database className="w-5 h-5 text-green-500" /> },
    // Storage
    { id: "s3", name: "AWS S3", category: "storage", provider: "Amazon Web Services", desc: "Object store bucket for assets and files", icon: <HardDrive className="w-5 h-5 text-orange-500" /> },
    { id: "cloudinary", name: "Cloudinary", category: "storage", provider: "Cloudinary", desc: "Image video uploads optimization pipelines", icon: <HardDrive className="w-5 h-5 text-indigo-650" /> },
    // Emails
    { id: "resend", name: "Resend", category: "emails", provider: "Resend", desc: "Modern developer email dispatch infrastructure", icon: <Mail className="w-5 h-5 text-white bg-black dark:bg-zinc-800 rounded p-0.5" /> },
    { id: "sendgrid", name: "SendGrid", category: "emails", provider: "Twilio", desc: "Mass client newsletter delivery systems", icon: <Mail className="w-5 h-5 text-blue-500" /> },
    // Notifications
    { id: "onesignal", name: "OneSignal", category: "notifications", provider: "OneSignal", desc: "Client push notices, SMS and dashboard alerts", icon: <Bell className="w-5 h-5 text-orange-400" /> },
    // Analytics
    { id: "posthog", name: "PostHog", category: "analytics", provider: "PostHog", desc: "Product intelligence analytics, session recordings", icon: <BarChart3 className="w-5 h-5 text-orange-655" /> },
    { id: "ga", name: "Google Analytics", category: "analytics", provider: "Google", desc: "Tag manager insights and client flow indicators", icon: <BarChart3 className="w-5 h-5 text-yellow-600" /> },
    // AI
    { id: "openai", name: "OpenAI API", category: "ai", provider: "OpenAI", desc: "Integrate GPT-4o chat completions and vector models", icon: <Bot className="w-5 h-5 text-emerald-600" /> },
    { id: "gemini", name: "Gemini Pro", category: "ai", provider: "Google Cloud", desc: "Fast multi-modal text, video, and audio outputs", icon: <Bot className="w-5 h-5 text-blue-500" /> },
    // Monitoring
    { id: "sentry", name: "Sentry", category: "monitoring", provider: "Sentry", desc: "Live client-side bug audits and runtime errors tracking", icon: <Activity className="w-5 h-5 text-purple-600" /> },
    { id: "redis", name: "Redis Cache", category: "monitoring", provider: "Upstash", desc: "Serverless key-value cluster for caching", icon: <Database className="w-5 h-5 text-red-500" /> }
  ];

  const categories = [
    { id: "all", label: "All Plugins" },
    { id: "auth", label: "Authentication" },
    { id: "payments", label: "Payments" },
    { id: "databases", label: "Databases" },
    { id: "storage", label: "Storage" },
    { id: "emails", label: "Emails" },
    { id: "analytics", label: "Analytics" },
    { id: "ai", label: "AI Engines" },
    { id: "monitoring", label: "DevOps & Caching" }
  ];

  const filteredPlugins = plugins.filter(p => {
    const matchesCat = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleInstallClick = (pluginId: string) => {
    setInstallingId(pluginId);
    setTimeout(() => {
      onInstallPlugin(pluginId);
      setInstallingId(null);
    }, 1200);
  };

  const handleUninstallClick = (pluginId: string) => {
    onUninstallPlugin(pluginId);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Plugin Marketplace</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            One-click installations. DeployAI auto-provisions databases, keys, and security credentials.
          </p>
        </div>
        
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-250 dark:border-gray-855 bg-white dark:bg-gray-950 text-xs focus:border-blue-500 outline-none transition-all"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Categories Horizontal Scroller */}
      <div className="flex gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-4 h-8 text-xs font-semibold rounded-lg border whitespace-nowrap transition-colors ${
              activeCategory === c.id
                ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                : "border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Plugins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlugins.map((plugin) => {
          const isInstalled = installedPlugins.includes(plugin.id);
          const isInstalling = installingId === plugin.id;

          return (
            <div 
              key={plugin.id}
              className="p-6 rounded-2xl border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 glass-panel flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-900/60 border border-gray-150 dark:border-gray-800 flex items-center justify-center">
                    {plugin.icon}
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest font-semibold">
                    {plugin.category}
                  </span>
                </div>

                <h3 className="text-sm font-bold">{plugin.name}</h3>
                <span className="text-[10px] text-gray-400 mt-0.5 block">by {plugin.provider}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                  {plugin.desc}
                </p>
              </div>

              <div className="border-t border-gray-50 dark:border-gray-900/65 pt-4 mt-6 flex items-center justify-between">
                <span className="text-[10px] text-gray-400">Auto-configured</span>
                
                {isInstalling ? (
                  <button className="flex items-center gap-1.5 px-3 h-8 text-xs font-semibold text-blue-500 bg-blue-500/10 rounded-lg border border-blue-500/20" disabled>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Installing
                  </button>
                ) : isInstalled ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded border border-green-500/20 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Active
                    </span>
                    <button
                      onClick={() => handleUninstallClick(plugin.id)}
                      className="text-[10px] font-bold text-red-500 hover:text-red-600 transition-colors"
                    >
                      Uninstall
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleInstallClick(plugin.id)}
                    className="flex items-center gap-1 px-3 h-8 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm shadow-blue-500/10 active:scale-[0.98] transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Install
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
