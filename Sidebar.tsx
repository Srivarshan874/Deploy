"use client";

import React from "react";
import { 
  LayoutDashboard, 
  FolderGit2, 
  Rocket, 
  Boxes, 
  Activity, 
  Terminal, 
  BarChart3, 
  Globe, 
  Settings, 
  ShieldCheck, 
  MessageSquareCode, 
  LogOut,
  Moon,
  Sun,
  User
} from "lucide-react";

export type SidebarTab = 
  | "dashboard"
  | "projects"
  | "deployments"
  | "marketplace"
  | "monitoring"
  | "logs"
  | "analytics"
  | "domains"
  | "settings"
  | "admin";

interface SidebarProps {
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;
  onLogout: () => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
  activeProjectName: string;
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  onLogout,
  theme,
  toggleTheme,
  activeProjectName,
  isAssistantOpen,
  setIsAssistantOpen
}: SidebarProps) {
  
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <FolderGit2 className="w-4 h-4" /> },
    { id: "deployments", label: "Deployments", icon: <Rocket className="w-4 h-4" /> },
    { id: "marketplace", label: "Plugin Marketplace", icon: <Boxes className="w-4 h-4" /> },
    { id: "monitoring", label: "Monitoring", icon: <Activity className="w-4 h-4" /> },
    { id: "logs", label: "Logs", icon: <Terminal className="w-4 h-4" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "domains", label: "Domains", icon: <Globe className="w-4 h-4" /> },
    { id: "settings", label: "Settings & Billing", icon: <Settings className="w-4 h-4" /> },
    { id: "admin", label: "Admin Panel", icon: <ShieldCheck className="w-4 h-4" />, isAdmin: true },
  ];

  return (
    <aside className="w-64 border-r border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950 flex flex-col justify-between h-screen sticky top-0 shrink-0">
      
      {/* Upper Brand Section */}
      <div className="p-6">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/10">
            <Terminal className="w-4.5 h-4.5" />
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-gray-950 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Deploy<span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">AI</span>
          </span>
        </div>

        {/* Selected Project Quick-Switch Indicator */}
        <div className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-150 dark:border-gray-800/80 mb-6 flex items-center justify-between">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Active Project</span>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">{activeProjectName}</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-500/40" />
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as SidebarTab)}
              className={`w-full flex items-center gap-3 px-3 h-9.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === item.id
                  ? "bg-blue-500/10 dark:bg-indigo-500/10 border-l-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/50 hover:text-gray-950 dark:hover:text-white"
              }`}
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
              {item.isAdmin && (
                <span className="ml-auto text-[9px] font-mono uppercase bg-red-150 dark:bg-red-950/40 text-red-500 px-1.5 py-0.5 rounded border border-red-500/20">
                  Admin
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Lower User/Control Section */}
      <div className="p-6 border-t border-gray-100 dark:border-gray-900/60">
        
        {/* Floating Chat Trigger */}
        <button
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className={`w-full flex items-center gap-3 px-3 h-10 text-xs font-semibold rounded-xl border border-blue-500/25 bg-blue-50/50 dark:bg-indigo-950/15 text-blue-600 dark:text-indigo-400 hover:bg-blue-100/50 dark:hover:bg-indigo-950/30 transition-all mb-4 ${
            isAssistantOpen ? "glow-border-blue" : ""
          }`}
        >
          <MessageSquareCode className="w-4 h-4 animate-bounce" />
          <span>Ask AI Assistant</span>
        </button>

        {/* User Account Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate">demo_user</span>
              <span className="text-[10px] text-gray-400 font-mono">Pro Member</span>
            </div>
          </div>

          <div className="flex gap-1">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-850 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-850 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              title="Log out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </aside>
  );
}
