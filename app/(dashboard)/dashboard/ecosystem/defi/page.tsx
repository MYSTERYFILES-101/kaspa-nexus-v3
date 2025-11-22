// v1.1.0 - DEX & DeFi Platforms Page with Updated Descriptions
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { DeFiPlatformCard } from "@/components/defi/DeFiPlatformCard";
import type { DeFiPlatform, DeFiCategory, PlatformStatus } from "@/types/defi";

type SortOption = "name" | "category" | "status" | "tvl";

// DeFi Platforms Data
const DEFI_PLATFORMS: DeFiPlatform[] = [
    {
      id: "kaspacom",
      name: "KaspaCom",
      logo: "/images/defi/kaspacom.jpg",
      description: "Die führende DeFi-Plattform im Kaspa-Ökosystem. Vereint DEX, Lending & Borrowing, Token-Launchpad (LFG.KASPA), NFT-Marktplatz und KNS-Domains unter einer Oberfläche. Community-getrieben mit GameFi-Punktesystem zur Belohnung aktiver Nutzer. Gateway zum gesamten Kaspa Digital Economy.",
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
      description: "Cross-chain DEX-Aggregator mit über 60+ integrierten Blockchains. Ermöglicht KRC-20 Token-Swaps mit optimaler Liquidität durch Multi-Chain-Routing. Nutzt Fusion DCRM-Technologie für sichere, nicht-custodiale Transaktionen. Bietet Spot-, Futures- und Options-Trading in einem All-in-One DeFi Hub.",
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
      description: "Erster Automated Market Maker (AMM) DEX auf der Kaspa-Blockchain. Bringt DeFi-Funktionen wie Token-Swaps, Liquidity Pools und Yield-Farming direkt auf Kaspa Layer-1. Nutzt Kaspas blockDAG-Architektur für blitzschnelle Transaktionen mit minimalen Gebühren. Fokus auf einfache UX für alle Nutzer.",
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
      description: "Community-fokussierter DEX für KRC-20 Token ohne Listing-Gebühren oder Liquiditätsbarrieren. Demokratisiert den Token-Zugang durch niedrige Entry-Barriers. Ziel: Jedem KRC-20 Projekt faire Trading-Möglichkeiten zu bieten. Status: In Development - Start für Q1 2025 geplant.",
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

export default function DeFiPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [filterCategory, setFilterCategory] = useState<DeFiCategory | "all">("all");
  const [filterStatus, setFilterStatus] = useState<PlatformStatus | "all">("all");

  // Filter and sort platforms
  const filteredAndSortedPlatforms = useMemo(() => {
    let filtered = DEFI_PLATFORMS;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (platform) =>
          platform.name.toLowerCase().includes(query) ||
          platform.description.toLowerCase().includes(query) ||
          platform.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((platform) => platform.category === filterCategory);
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((platform) => platform.status === filterStatus);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        case "status":
          return a.status.localeCompare(b.status);
        case "tvl":
          return (b.tvl || 0) - (a.tvl || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, sortBy, filterCategory, filterStatus]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalTVL = DEFI_PLATFORMS.reduce((sum, p) => sum + (p.tvl || 0), 0);
    const livePlatforms = DEFI_PLATFORMS.filter((p) => p.status === "live").length;
    const upcomingPlatforms = DEFI_PLATFORMS.filter((p) => p.status === "upcoming").length;

    return {
      totalPlatforms: DEFI_PLATFORMS.length,
      totalTVL,
      livePlatforms,
      upcomingPlatforms,
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div>
        <Link
          href="/dashboard/main"
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            DEX & DeFi Platforms
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Explore decentralized finance platforms in the KASPA ecosystem
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Total Platforms</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
              {stats.totalPlatforms}
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-800 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Live Platforms</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
              {stats.livePlatforms}
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-800 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Upcoming</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
              {stats.upcomingPlatforms}
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-800 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Showing</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
              {filteredAndSortedPlatforms.length}
            </p>
          </div>
        </div>
      </div>

      {/* Search, Filters and Sort */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search platforms by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:border-brand-primary dark:focus:border-brand-primary focus:outline-none transition-colors"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Category:
              </span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as DeFiCategory | "all")}
                className="px-3 py-2 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white text-sm focus:border-brand-primary dark:focus:border-brand-primary focus:outline-none transition-colors"
              >
                <option value="all">All</option>
                <option value="All-in-One">All-in-One</option>
                <option value="DEX">DEX</option>
                <option value="Lending">Lending</option>
                <option value="Launchpad">Launchpad</option>
                <option value="Bridge">Bridge</option>
                <option value="Staking">Staking</option>
                <option value="Marketplace">Marketplace</option>
                <option value="Wallet">Wallet</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Status:
              </span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as PlatformStatus | "all")}
                className="px-3 py-2 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white text-sm focus:border-brand-primary dark:focus:border-brand-primary focus:outline-none transition-colors"
              >
                <option value="all">All</option>
                <option value="live">Live</option>
                <option value="beta">Beta</option>
                <option value="upcoming">Upcoming</option>
                <option value="development">Development</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white text-sm focus:border-brand-primary dark:focus:border-brand-primary focus:outline-none transition-colors"
              >
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="status">Status</option>
                <option value="tvl">TVL</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Platforms Grid */}
      {filteredAndSortedPlatforms.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedPlatforms.map((platform) => (
              <DeFiPlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 bg-white dark:bg-neutral-800 rounded-lg border-2 border-neutral-200 dark:border-neutral-700">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              No platforms found
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Try adjusting your search or filters
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
