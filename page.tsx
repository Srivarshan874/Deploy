"use client";

import React, { useState, useEffect } from "react";
import LandingPage from "@/components/LandingPage";
import AuthModal from "@/components/AuthModal";
import Sidebar, { SidebarTab } from "@/components/Sidebar";
import MainDashboard, { Project } from "@/components/MainDashboard";
import NewProject from "@/components/NewProject";
import AIAnalysis from "@/components/AIAnalysis";
import DeploymentPipeline from "@/components/DeploymentPipeline";
import PluginMarketplace from "@/components/PluginMarketplace";
import Monitoring from "@/components/Monitoring";
import LogsViewer from "@/components/LogsViewer";
import DomainManager from "@/components/DomainManager";
import Settings from "@/components/Settings";
import AdminPanel from "@/components/AdminPanel";
import AIAssistant from "@/components/AIAssistant";
import Analytics from "@/components/Analytics";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeTab, setActiveTab] = useState<SidebarTab>("dashboard");
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Flow states
  const [isImporting, setIsImporting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  // Selected details for analysis/build
  const [selectedProjectName, setSelectedProjectName] = useState("shop-front-v2");
  const [selectedFramework, setSelectedFramework] = useState("Next.js");
  const [selectedLanguage, setSelectedLanguage] = useState("TypeScript");

  // Installed plugins state
  const [installedPlugins, setInstalledPlugins] = useState<string[]>(["neon", "stripe"]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "shop-front-v2",
      framework: "Next.js",
      language: "TypeScript",
      status: "deployed",
      branch: "main",
      lastCommit: "feat: add stripe webhook triggers",
      lastUpdated: "2 hours ago",
      url: "https://shop-front-v2.deployai.app",
      repo: "demo_user/shop-front-v2"
    },
    {
      id: "2",
      name: "fast-inference-worker",
      framework: "FastAPI",
      language: "Python",
      status: "failed",
      branch: "main",
      lastCommit: "fix: update gemini system credentials",
      lastUpdated: "1 day ago",
      url: "",
      repo: "demo_user/fast-inference-worker"
    }
  ]);

  // Sync theme with HTML root class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  const handleStartDeploying = () => {
    if (isAuthenticated) {
      setIsImporting(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsImporting(false);
    setIsAnalyzing(false);
    setIsDeploying(false);
    setActiveTab("dashboard");
  };

  const handleImportComplete = (projectName: string, framework: string, language: string) => {
    setSelectedProjectName(projectName);
    setSelectedFramework(framework);
    setSelectedLanguage(language);
    setIsImporting(false);
    setIsAnalyzing(true);
  };

  const handleDeployStart = () => {
    setIsAnalyzing(false);
    setIsDeploying(true);
  };

  const handleDeploySuccess = () => {
    // Check if project exists, if not, create it
    const exists = projects.find(p => p.name === selectedProjectName);
    if (!exists) {
      const newProj: Project = {
        id: Date.now().toString(),
        name: selectedProjectName,
        framework: selectedFramework,
        language: selectedLanguage,
        status: "deployed",
        branch: "main",
        lastCommit: "chore: initial AI DevOps commit blueprint",
        lastUpdated: "Just now",
        url: `https://${selectedProjectName.toLowerCase()}.deployai.app`,
        repo: `demo_user/${selectedProjectName.toLowerCase()}`
      };
      setProjects(prev => [newProj, ...prev]);
    } else {
      setProjects(prev => 
        prev.map(p => p.name === selectedProjectName ? { ...p, status: "deployed", url: `https://${p.name.toLowerCase()}.deployai.app` } : p)
      );
    }
  };

  const handleInstallPlugin = (pluginId: string) => {
    setInstalledPlugins(prev => [...prev, pluginId]);
  };

  const handleUninstallPlugin = (pluginId: string) => {
    setInstalledPlugins(prev => prev.filter(id => id !== pluginId));
  };

  const handleSelectProject = (projectId: string) => {
    const proj = projects.find(p => p.id === projectId);
    if (proj) {
      setSelectedProjectName(proj.name);
      setSelectedFramework(proj.framework);
      setSelectedLanguage(proj.language);
      
      if (proj.status === "failed") {
        setIsDeploying(true);
      } else {
        setActiveTab("deployments");
        setIsDeploying(true);
      }
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <>
          <LandingPage 
            onStartDeploying={handleStartDeploying} 
            onOpenLogin={() => setIsAuthModalOpen(true)}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        </>
      ) : (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 bg-dot-pattern transition-colors duration-300">
          
          {/* Collapsible Sidebar */}
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setIsImporting(false);
              setIsAnalyzing(false);
              setIsDeploying(false);
            }} 
            onLogout={handleLogout}
            theme={theme}
            toggleTheme={toggleTheme}
            activeProjectName={selectedProjectName}
            isAssistantOpen={isAssistantOpen}
            setIsAssistantOpen={setIsAssistantOpen}
          />

          {/* Main content body viewport */}
          <main className="flex-grow p-8 max-w-7xl mx-auto overflow-y-auto h-screen relative">
            
            {isImporting ? (
              <NewProject 
                onImportComplete={handleImportComplete} 
                onCancel={() => setIsImporting(false)} 
              />
            ) : isAnalyzing ? (
              <AIAnalysis 
                projectName={selectedProjectName}
                framework={selectedFramework}
                language={selectedLanguage}
                onDeploy={handleDeployStart}
                onCancel={() => setIsAnalyzing(false)}
              />
            ) : isDeploying ? (
              <DeploymentPipeline 
                projectName={selectedProjectName}
                framework={selectedFramework}
                onDeploySuccess={handleDeploySuccess}
                onCancel={() => setIsDeploying(false)}
              />
            ) : (
              <>
                {activeTab === "dashboard" && (
                  <MainDashboard 
                    projects={projects} 
                    onSelectProject={handleSelectProject}
                    onImportNewProject={() => setIsImporting(true)}
                    onSelectTab={(tab) => setActiveTab(tab as SidebarTab)}
                  />
                )}

                {activeTab === "projects" && (
                  <MainDashboard 
                    projects={projects} 
                    onSelectProject={handleSelectProject}
                    onImportNewProject={() => setIsImporting(true)}
                    onSelectTab={(tab) => setActiveTab(tab as SidebarTab)}
                  />
                )}

                {activeTab === "deployments" && (
                  <DeploymentPipeline 
                    projectName={selectedProjectName}
                    framework={selectedFramework}
                    onDeploySuccess={handleDeploySuccess}
                    onCancel={() => setIsDeploying(false)}
                  />
                )}

                {activeTab === "marketplace" && (
                  <PluginMarketplace 
                    installedPlugins={installedPlugins}
                    onInstallPlugin={handleInstallPlugin}
                    onUninstallPlugin={handleUninstallPlugin}
                  />
                )}

                {activeTab === "monitoring" && (
                  <Monitoring />
                )}

                {activeTab === "logs" && (
                  <LogsViewer />
                )}

                {activeTab === "analytics" && (
                  <Analytics />
                )}

                {activeTab === "domains" && (
                  <DomainManager />
                )}

                {activeTab === "settings" && (
                  <Settings />
                )}

                {activeTab === "admin" && (
                  <AdminPanel />
                )}
              </>
            )}

            {/* Chat Overlay chatbot panel */}
            <AIAssistant 
              isOpen={isAssistantOpen} 
              onClose={() => setIsAssistantOpen(false)} 
            />

          </main>
        </div>
      )}
    </>
  );
}
