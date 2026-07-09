"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  MessageSquareCode, 
  Send, 
  X, 
  Sparkles, 
  HelpCircle,
  Cpu,
  CornerDownLeft,
  Bot
} from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello! I am your resident AI DevOps Engineer. I can inspect compile failure files, optimize CDN networks, or answer cluster scaling questions. What can I solve for you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const quickPrompts = [
    { label: "Why build failed?", query: "Why deployment failed" },
    { label: "Optimize LCP Performance", query: "How to improve performance" },
    { label: "Reduce bundle size", query: "How to reduce bundle size" },
    { label: "Secure application", query: "How to improve security" },
    { label: "Scale Kubernetes cluster", query: "How to scale application" }
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "";
      const q = text.toLowerCase();

      if (q.includes("fail") || q.includes("why")) {
        reply = "**Common build failure root causes in DeployAI:**\n\n1. **Environment keys missing**: Double check if database links or API secrets are bound in Settings.\n2. **Type check compiler issues**: TypeScript is strict on build. Use absolute aliases (`@/components/...`) correctly.\n3. **Casing mismatch**: Git repositories are case-sensitive. If you import `Card.tsx` as `card.tsx`, Docker compiling will fail on Linux servers.";
      } else if (q.includes("performance") || q.includes("lcp")) {
        reply = "**How to improve LCP response performance:**\n\n- **Asset compression**: Enable Gzip/Brotli compression under CDN configurations.\n- **Lazy-load components**: Defer loading heavy offscreen widgets using Next.js `dynamic` imports.\n- **Database caching**: Bind the **Redis** cache plugin from our marketplace to cache heavy database queries.\n- **Image pre-fetching**: Add priority tags to above-the-fold assets: `<Image src=\"...\" priority />`.";
      } else if (q.includes("bundle") || q.includes("size")) {
        reply = "**How to compress compile bundle sizes:**\n\n- **Inspect modules**: Open the **Analytics** tab to inspect Webpack bundle charts.\n- **Shake unused imports**: Import specific hooks instead of complete packages: `import { format } from 'date-fns'` instead of loading moment.\n- **Client components**: Mark only interactive components with `'use client'` to prevent leaking server dependencies to client bundles.";
      } else if (q.includes("security") || q.includes("secure")) {
        reply = "**Best security practices on DeployAI:**\n\n- **Auth provider**: Bind our **Clerk Auth** plugin to secure client user sessions.\n- **Environment secrets**: Never commit API keys. Use serverless secure environment binds.\n- **Sandbox Containers**: DeployAI packages builds inside isolated Docker layers with read-only filesystems by default.";
      } else if (q.includes("scale") || q.includes("kubernetes")) {
        reply = "**Scaling operations on DeployAI:**\n\n- DeployAI automatically deploys containers inside a Kubernetes pod cluster on AWS.\n- Go to **Settings > Scaling Policies** to declare Auto-Scale parameters:\n  - Set **CPU limit** triggers (e.g., auto-spin additional pod when average CPU exceeds 70% for 2 minutes).";
      } else {
        reply = "I've scanned our DevOps guides. To solve this, I recommend checking your environment variables configurations in Settings, or reviewing active console telemetry inside the **Logs** tab.";
      }

      setMessages(prev => [...prev, { sender: "bot", text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] border border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-950 rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden z-50 glass-panel animate-fade-in glow-border-purple">
      
      {/* Decorative Blur BG */}
      <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-purple-500/10 dark:bg-purple-500/20 blur-xl pointer-events-none" />

      {/* Header */}
      <div className="px-5 h-14 bg-gray-50/50 dark:bg-gray-900/30 border-b border-gray-200/50 dark:border-gray-900 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-900 dark:text-white">AI DevOps Assistant</span>
            <span className="flex items-center gap-1 text-[9px] text-green-500 font-mono mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" /> Online
            </span>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="p-1 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Conversation list */}
      <div className="flex-grow p-5 overflow-y-auto space-y-4 text-xs">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-2.5 ${m.sender === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
              m.sender === "user" 
                ? "bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800" 
                : "bg-purple-500/10 text-purple-500 border-purple-500/20"
            }`}>
              {m.sender === "user" ? "U" : <Bot className="w-3.5 h-3.5" />}
            </div>
            
            <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
              m.sender === "user" 
                ? "bg-blue-600 text-white rounded-tr-none" 
                : "bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 border border-gray-150 dark:border-gray-900/50 rounded-tl-none whitespace-pre-line"
            }`}>
              {m.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2.5">
            <div className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-150 dark:border-gray-900/50 text-gray-500 flex items-center gap-1 rounded-tl-none">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts list (Only shown if user hasn't asked anything complex yet) */}
      {messages.length < 3 && !isTyping && (
        <div className="px-5 pb-2 shrink-0 space-y-1.5">
          <span className="text-[9px] uppercase font-mono tracking-wider text-gray-400 block mb-1">Suggested Questions</span>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p.query)}
                className="px-2 py-1 text-[10px] font-medium rounded bg-gray-50 dark:bg-gray-900/80 border border-gray-150 dark:border-gray-850 hover:border-blue-500/30 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all text-left"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
        className="p-4 border-t border-gray-200/50 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          placeholder="Ask DevOps query..."
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-grow h-9 px-3 rounded-lg border border-gray-200 dark:border-gray-850 bg-white dark:bg-gray-900 text-xs focus:border-blue-500 outline-none"
        />
        <button
          type="submit"
          className="w-9 h-9 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-sm shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
}
