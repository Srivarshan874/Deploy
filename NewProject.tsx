"use client";

import React, { useState, useRef } from "react";
import { 
  FileArchive, 
  UploadCloud, 
  Search, 
  ArrowRight,
  GitBranch,
  Info,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { Github, Gitlab } from "@/components/Icons";

interface NewProjectProps {
  onImportComplete: (projectName: string, framework: string, language: string) => void;
  onCancel: () => void;
}

export default function NewProject({ onImportComplete, onCancel }: NewProjectProps) {
  const [activeTab, setActiveTab] = useState<"github" | "gitlab" | "bitbucket" | "zip">("github");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockRepos = [
    { name: "nexus-api-service", lang: "TypeScript", framework: "Express", stars: 12 },
    { name: "shop-front-v2", lang: "TypeScript", framework: "Next.js", stars: 45 },
    { name: "fast-inference-worker", lang: "Python", framework: "FastAPI", stars: 8 },
    { name: "dashboard-client", lang: "JavaScript", framework: "Vite + React", stars: 22 },
    { name: "data-sync-pipeline", lang: "Go", framework: "Go HTTP", stars: 3 },
  ];

  const filteredRepos = mockRepos.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].name.endsWith(".zip")) {
      setZipFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setZipFile(files[0]);
    }
  };

  const triggerImportRepo = (repoName: string, framework: string, language: string) => {
    onImportComplete(repoName, framework, language);
  };

  const triggerImportZip = () => {
    if (!zipFile) return;
    // Strip zip ext
    const name = zipFile.name.replace(".zip", "");
    // Default to Next.js detect mock
    onImportComplete(name, "Next.js", "TypeScript");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create a New Project</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Import an existing repository from your git provider or upload local archives.
          </p>
        </div>
        <button 
          onClick={onCancel}
          className="text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          Cancel
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex border-b border-gray-200 dark:border-gray-950">
        {[
          { id: "github", label: "GitHub", icon: <Github className="w-4 h-4" /> },
          { id: "gitlab", label: "GitLab", icon: <Gitlab className="w-4 h-4" /> },
          { id: "bitbucket", label: "Bitbucket", icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22.298 2.333a1.442 1.442 0 00-1.258-.693H2.96a1.439 1.439 0 00-1.42 1.636l2.36 17.518c.112.83.82 1.447 1.66 1.447h12.88c.84 0 1.548-.617 1.66-1.447l2.36-17.518c.038-.282-.03-.569-.222-.793zm-6.19 14.129h-8.216l-1.077-6.425h10.37z"/></svg> },
          { id: "zip", label: "ZIP Archive", icon: <FileArchive className="w-4 h-4" /> }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-6 h-12 text-sm font-semibold border-b-2 -mb-px transition-all ${
              activeTab === t.id
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="p-8 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel">
        
        {activeTab === "github" && (
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search GitHub repositories..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 dark:border-gray-855 bg-gray-50/50 dark:bg-gray-950/40 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>

            <div className="space-y-3">
              {filteredRepos.length > 0 ? (
                filteredRepos.map((repo, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-900 hover:border-blue-500/20 hover:bg-blue-50/10 dark:hover:bg-indigo-950/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300">
                        <Github className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                          demo_user / {repo.name}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono mt-0.5">
                          {repo.framework} • {repo.lang}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-[10px] text-gray-400 font-mono bg-gray-50 dark:bg-gray-900 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-800">
                        <GitBranch className="w-3 h-3" />
                        main
                      </span>
                      <button
                        onClick={() => triggerImportRepo(repo.name, repo.framework, repo.lang)}
                        className="flex items-center gap-1.5 px-3 h-8 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-all"
                      >
                        Import
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
                  No repositories found matching your query.
                </div>
              )}
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 text-xs text-blue-600 dark:text-blue-400">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <p>DeployAI connects via webhook. Future code pushes will automatically trigger rebuilds and deploys.</p>
            </div>
          </div>
        )}

        {(activeTab === "gitlab" || activeTab === "bitbucket") && (
          <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="max-w-sm">
              <h3 className="font-bold text-sm">Git integration connection pending</h3>
              <p className="text-xs text-gray-400 mt-1">
                You must grant write access permissions inside your {activeTab === "gitlab" ? "GitLab" : "Bitbucket"} developer console to import repos.
              </p>
            </div>
            <button className="px-4 h-9 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-500/10 transition-all">
              Connect {activeTab === "gitlab" ? "GitLab" : "Bitbucket"} Account
            </button>
          </div>
        )}

        {activeTab === "zip" && (
          <div className="space-y-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 ${
                isDragging 
                  ? "border-blue-500 bg-blue-50/20 dark:bg-indigo-950/15" 
                  : zipFile 
                    ? "border-emerald-500/40 bg-emerald-500/5" 
                    : "border-gray-250 dark:border-gray-800 hover:border-blue-500/40 hover:bg-gray-50/50 dark:hover:bg-gray-900/10"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                zipFile 
                  ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/25" 
                  : "bg-gray-50 dark:bg-gray-900 text-gray-400 border-gray-150 dark:border-gray-800"
              }`}>
                {zipFile ? <FileArchive className="w-6 h-6" /> : <UploadCloud className="w-6 h-6" />}
              </div>

              {zipFile ? (
                <div>
                  <h4 className="font-bold text-sm text-emerald-650 dark:text-emerald-400">{zipFile.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">{(zipFile.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze</p>
                </div>
              ) : (
                <div>
                  <h4 className="font-bold text-sm">Drag and drop ZIP archive</h4>
                  <p className="text-xs text-gray-400 mt-1">or click to browse local files (max 100MB)</p>
                </div>
              )}
            </div>

            {zipFile && (
              <button
                onClick={triggerImportZip}
                className="w-full flex items-center justify-center gap-2 px-4 h-11 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                Upload and Analyze Project
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
