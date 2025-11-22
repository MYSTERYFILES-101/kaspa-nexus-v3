// v1.1.1 - DeFi Platform Detail Page with English Descriptions
"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { DeFiPlatform } from "@/types/defi";

// Import platforms data (we'll need to export this from the main page)
const DEFI_PLATFORMS: DeFiPlatform[] = [
  {
    id: "kaspacom",
    name: "KaspaCom",
    logo: "/images/defi/kaspacom.jpg",
    description: "The leading DeFi platform in the Kaspa ecosystem. Combines DEX, Lending & Borrowing, Token Launchpad (LFG.KASPA), NFT Marketplace, and KNS Domains under one interface. Community-driven with GameFi points system to reward active users. Gateway to the entire Kaspa Digital Economy.",
    category: "All-in-One",
    features: [
      "DEX Swaps",
      "Lending & Borrowing",
      "Token Launchpad",
      "NFT Marketplace",
      "KNS Domains",
      "Web Wallet",
      "KCOM Rewards"
    ],
    tvl: undefined,
    website: "https://kaspa.com",
    twitter: "https://x.com/KaspaCom",
    telegram: null,
    discord: null,
    github: null,
    status: "live",
    launched: new Date("2024-01-01"),
  },
  {
    id: "chainge",
    name: "Chainge DEX",
    logo: "/images/defi/chainge.jpg",
    description: "Cross-chain DEX aggregator with 60+ integrated blockchains. Enables KRC-20 token swaps with optimal liquidity through multi-chain routing. Utilizes Fusion DCRM technology for secure, non-custodial transactions. Offers spot, futures, and options trading in an all-in-one DeFi hub.",
    category: "DEX",
    features: [
      "KRC20 Trading",
      "Liquidity Pools",
      "LP Tokens",
      "Stablecoins",
      "Cross-chain Support"
    ],
    tvl: undefined,
    website: "https://chainge.finance",
    twitter: "https://x.com/Chainge_Finance",
    telegram: "https://t.me/chainge_finance",
    discord: null,
    github: null,
    status: "live",
    launched: new Date("2024-06-01"),
  },
  {
    id: "zealousswap",
    name: "Zealous Swap",
    logo: "/images/defi/zealousswap.jpg",
    description: "First Automated Market Maker (AMM) DEX on the Kaspa blockchain. Brings DeFi features like token swaps, liquidity pools, and yield farming directly to Kaspa Layer-1. Leverages Kaspa's blockDAG architecture for lightning-fast transactions with minimal fees. Focus on simple UX for all users.",
    category: "DEX",
    features: [
      "Token Swaps",
      "Liquidity Pools",
      "AMM Protocol",
      "Lightning Fast",
      "Low Fees"
    ],
    tvl: undefined,
    website: "https://www.zealousswap.com",
    twitter: "https://x.com/zealousswap",
    telegram: null,
    discord: null,
    github: null,
    status: "live",
    launched: new Date("2024-05-01"),
  },
  {
    id: "kaspacat",
    name: "KaspaCat DEX",
    logo: "/images/defi/kaspacat.jpg",
    description: "Community-focused DEX for KRC-20 tokens without listing fees or liquidity barriers. Democratizes token access through low entry barriers. Goal: Provide fair trading opportunities for every KRC-20 project. Status: In Development - Launch planned for Q1 2025.",
    category: "DEX",
    features: [
      "KRC-20 Trading",
      "No Listing Fees",
      "Low Entry Barriers",
      "Community Driven"
    ],
    tvl: undefined,
    website: "https://kaspacat.com",
    twitter: "https://x.com/kaspa_cat",
    telegram: null,
    discord: null,
    github: null,
    status: "development",
    launched: undefined,
  },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DeFiPlatformDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const platform = DEFI_PLATFORMS.find((p) => p.id === resolvedParams.id);

  if (!platform) {
    notFound();
  }

  const formatTVL = (tvl?: number) => {
    if (!tvl) return "N/A";
    if (tvl >= 1e9) return `$${(tvl / 1e9).toFixed(2)}B`;
    if (tvl >= 1e6) return `$${(tvl / 1e6).toFixed(2)}M`;
    if (tvl >= 1e3) return `$${(tvl / 1e3).toFixed(2)}K`;
    return `$${tvl.toFixed(0)}`;
  };

  const formatDate = (date?: Date) => {
    if (!date) return "TBA";
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "All-in-One": "bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold",
      "DEX": "bg-brand-primary/20 text-brand-primary",
      "Lending": "bg-success/20 text-success",
      "Launchpad": "bg-magenta-500/20 text-magenta-500",
      "Aggregator": "bg-brand-purple/20 text-brand-purple",
      "Staking": "bg-info/20 text-info",
      "Bridge": "bg-warning/20 text-warning",
      "Marketplace": "bg-brand-accent/20 text-brand-accent",
      "Wallet": "bg-neutral-500/20 text-neutral-600 dark:text-neutral-300",
    };
    return colors[category] || "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      live: "bg-success/20 text-success",
      beta: "bg-info/20 text-info",
      upcoming: "bg-warning/20 text-warning",
      development: "bg-neutral-300/20 text-neutral-600 dark:text-neutral-400",
    };
    return colors[status] || "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      live: "Live",
      beta: "Beta",
      upcoming: "Upcoming",
      development: "In Development",
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div>
        <Link
          href="/dashboard/ecosystem/defi"
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors font-medium"
        >
          ← Back to DeFi Platforms
        </Link>
      </div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 overflow-hidden">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 dark:from-brand-primary/20 dark:to-brand-accent/20 p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Logo */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-bold text-4xl flex-shrink-0 shadow-lg">
                {platform.logo ? (
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  platform.name.substring(0, 2).toUpperCase()
                )}
              </div>

              {/* Name and Badges */}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                  {platform.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-4 py-2 rounded-lg text-sm font-medium ${getCategoryColor(platform.category)}`}>
                    {platform.category}
                  </span>
                  <span className={`px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(platform.status)}`}>
                    {getStatusLabel(platform.status)}
                  </span>
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-3">
                {platform.website && (
                  <a
                    href={platform.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white dark:bg-neutral-700 hover:bg-brand-primary dark:hover:bg-brand-primary text-neutral-900 dark:text-white hover:text-white rounded-lg font-medium transition-colors shadow-sm"
                  >
                    🌐 Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                About
              </h2>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {platform.description}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* TVL */}
              <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 dark:from-brand-primary/10 dark:to-brand-accent/10 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Total Value Locked</p>
                <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                  {formatTVL(platform.tvl)}
                </p>
              </div>

              {/* Launch Date */}
              <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 dark:from-brand-primary/10 dark:to-brand-accent/10 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Launched</p>
                <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                  {formatDate(platform.launched)}
                </p>
              </div>

              {/* Features Count */}
              <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 dark:from-brand-primary/10 dark:to-brand-accent/10 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Features</p>
                <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                  {platform.features.length}
                </p>
              </div>
            </div>

            {/* Features Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platform.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg"
                  >
                    <span className="text-2xl">✓</span>
                    <span className="text-neutral-900 dark:text-white font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links Section */}
            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                Links & Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {platform.website && (
                  <a
                    href={platform.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600 rounded-lg transition-colors group"
                  >
                    <span className="text-2xl">🌐</span>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-primary">
                        Official Website
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Visit platform
                      </p>
                    </div>
                  </a>
                )}
                {platform.twitter && (
                  <a
                    href={platform.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600 rounded-lg transition-colors group"
                  >
                    <span className="text-2xl">𝕏</span>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-primary">
                        Twitter/X
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Follow updates
                      </p>
                    </div>
                  </a>
                )}
                {platform.telegram && (
                  <a
                    href={platform.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600 rounded-lg transition-colors group"
                  >
                    <span className="text-2xl">✈️</span>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-primary">
                        Telegram
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Join community
                      </p>
                    </div>
                  </a>
                )}
                {platform.discord && (
                  <a
                    href={platform.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600 rounded-lg transition-colors group"
                  >
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-primary">
                        Discord
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Join server
                      </p>
                    </div>
                  </a>
                )}
                {platform.github && (
                  <a
                    href={platform.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600 rounded-lg transition-colors group"
                  >
                    <span className="text-2xl">⚙️</span>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-primary">
                        GitHub
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        View code
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
