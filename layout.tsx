import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "DeployAI — Autonomous AI DevOps Engineer",
  description: "DeployAI acts as your dedicated AI DevOps engineer. It analyzes your repository, configures secure cloud infrastructure, automatically resolves build and runtime deployment errors, and keeps your apps continuously optimized.",
  keywords: ["DevOps", "AI", "Deployment", "Infrastructure", "CI/CD", "Docker", "Kubernetes", "Next.js", "Stripe", "Clerk"],
  authors: [{ name: "DeployAI Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
}
