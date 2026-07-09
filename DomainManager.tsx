"use client";

import React, { useState } from "react";
import { 
  Globe, 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Loader2, 
  Lock, 
  RefreshCw,
  Info
} from "lucide-react";

interface Domain {
  id: string;
  name: string;
  type: "subdomain" | "custom";
  status: "active" | "pending_dns" | "provisioning";
  ssl: boolean;
}

export default function DomainManager() {
  const [domains, setDomains] = useState<Domain[]>([
    { id: "1", name: "shop-front-v2.deployai.app", type: "subdomain", status: "active", ssl: true },
    { id: "2", name: "shop.mybrand.com", type: "custom", status: "pending_dns", ssl: false }
  ]);
  const [newDomain, setNewDomain] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain) return;

    setIsAdding(true);
    setTimeout(() => {
      const added: Domain = {
        id: Date.now().toString(),
        name: newDomain,
        type: newDomain.endsWith("deployai.app") ? "subdomain" : "custom",
        status: "provisioning",
        ssl: false
      };
      setDomains(prev => [...prev, added]);
      setNewDomain("");
      setIsAdding(false);

      // Simulate DNS resolving after 4 seconds
      setTimeout(() => {
        setDomains(current => 
          current.map(d => d.name === newDomain ? { ...d, status: "active", ssl: true } : d)
        );
      }, 4000);
    }, 1000);
  };

  const checkDNS = (domainId: string) => {
    setDomains(prev => 
      prev.map(d => d.id === domainId ? { ...d, status: "active", ssl: true } : d)
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Domain Configuration</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Secure your application with custom domains, free automated subdomains, and Cloudflare Wildcard SSL.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Domains List & Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Add Domain Form */}
          <div className="p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel">
            <h3 className="text-sm font-bold mb-4">Add a Custom Domain</h3>
            
            <form onSubmit={handleAddDomain} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="app.yourdomain.com"
                value={newDomain}
                onChange={e => setNewDomain(e.target.value)}
                className="flex-grow h-10 px-4 rounded-xl border border-gray-250 dark:border-gray-855 bg-white dark:bg-gray-950 text-xs focus:border-blue-500 outline-none transition-all"
                required
              />
              <button
                type="submit"
                disabled={isAdding}
                className="flex items-center justify-center gap-1.5 px-4 h-10 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isAdding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                Add Domain
              </button>
            </form>
          </div>

          {/* Active Domains Table */}
          <div className="p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel space-y-4">
            <h3 className="text-sm font-bold">Configured Domains</h3>

            <div className="divide-y divide-gray-150 dark:divide-gray-900/60">
              {domains.map((dom) => (
                <div key={dom.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0">
                      <Globe className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-gray-900 dark:text-white truncate">{dom.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono mt-0.5 uppercase">{dom.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* SSL status */}
                    {dom.ssl ? (
                      <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> SSL Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">
                        No SSL
                      </span>
                    )}

                    {/* Status badge */}
                    {dom.status === "active" && (
                      <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                        Active
                      </span>
                    )}
                    {dom.status === "provisioning" && (
                      <span className="text-[10px] font-semibold text-blue-500 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20 flex items-center gap-1.5">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Provisioning
                      </span>
                    )}
                    {dom.status === "pending_dns" && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-yellow-500 bg-yellow-500/10 px-2.5 py-0.5 rounded-full border border-yellow-500/20">
                          Pending DNS
                        </span>
                        <button
                          onClick={() => checkDNS(dom.id)}
                          className="p-1 rounded border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                          title="Verify DNS settings now"
                        >
                          <RefreshCw className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: DNS Setup Instructions */}
        <div className="p-6 border border-gray-200/60 dark:border-gray-900 bg-white dark:bg-gray-950/30 rounded-2xl glass-panel space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-bold">DNS Setup Instructions</h3>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            To point your custom domain name to our autonomous deployment servers, log into your DNS registrar (GoDaddy, Namecheap, Route53, Cloudflare) and append the following DNS Records:
          </p>

          <div className="space-y-4 pt-2">
            {/* Record 1 */}
            <div className="p-3.5 rounded-xl border border-gray-150 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950/20 font-mono text-[10px] space-y-1.5">
              <div className="flex justify-between border-b border-gray-100 dark:border-gray-900 pb-1 text-gray-400">
                <span>Record TYPE</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">A RECORD</span>
              </div>
              <div className="flex justify-between">
                <span>Host / Name</span>
                <span className="font-bold text-gray-700 dark:text-gray-300">@</span>
              </div>
              <div className="flex justify-between">
                <span>Points to</span>
                <span className="font-bold text-blue-500">76.76.21.21</span>
              </div>
            </div>

            {/* Record 2 */}
            <div className="p-3.5 rounded-xl border border-gray-150 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950/20 font-mono text-[10px] space-y-1.5">
              <div className="flex justify-between border-b border-gray-100 dark:border-gray-900 pb-1 text-gray-400">
                <span>Record TYPE</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">CNAME RECORD</span>
              </div>
              <div className="flex justify-between">
                <span>Host / Name</span>
                <span className="font-bold text-gray-700 dark:text-gray-300">www</span>
              </div>
              <div className="flex justify-between">
                <span>Points to</span>
                <span className="font-bold text-blue-500">cname.deployai.app</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
