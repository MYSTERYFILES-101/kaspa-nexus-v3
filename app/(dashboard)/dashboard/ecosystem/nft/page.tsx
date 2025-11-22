// v1.0.0 - NFT Projects & KRC-721 Standard Page
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type NFTCategory = "pfp" | "art" | "gaming" | "defi" | "marketplace" | "infrastructure";
type NFTStatus = "live" | "upcoming" | "development";
type SortOption = "name" | "category" | "status" | "supply";

interface NFTProject {
  id: string;
  name: string;
  logo: string | null;
  description: string;
  category: NFTCategory;
  features: string[];
  supply?: number;
  floorPrice?: number;
  volume24h?: number;
  website: string;
  twitter?: string | null;
  telegram?: string | null;
  discord?: string | null;
  status: NFTStatus;
  launched?: Date | null;
}

// NFT Projects Data (KRC-721 Standard)
const NFT_PROJECTS: NFTProject[] = [
  {
    id: "nachokat",
    name: "Nacho Kat NFTs",
    logo: null,
    description: "10,000-piece collection associated with the first DEX on Kaspa. Community-driven PFP project with DeFi utility and exclusive benefits for holders. Each Nacho Kat represents membership in the Kaspa DeFi pioneer community.",
    category: "pfp",
    features: [
      "10,000 Supply",
      "DEX Integration",
      "Community Benefits",
      "Trading on KaspaCom",
      "Holder Rewards"
    ],
    supply: 10000,
    website: "https://kaspa.com",
    twitter: null,
    telegram: null,
    discord: null,
    status: "live",
    launched: new Date("2024-01-01"),
  },
  {
    id: "yonatoshi",
    name: "Yonatoshi Collection",
    logo: null,
    description: "Exclusive VIP collection featuring premium artwork with DeFi advantages on KaspaCom. Sold out collection providing holders with trading fee discounts, priority access to new features, and governance rights. Limited supply ensures exclusivity.",
    category: "pfp",
    features: [
      "VIP Status",
      "SOLD OUT",
      "DeFi Benefits",
      "Fee Discounts",
      "Governance Rights",
      "Priority Access"
    ],
    supply: undefined,
    website: "https://kaspa.com",
    twitter: null,
    telegram: null,
    discord: null,
    status: "live",
    launched: new Date("2024-02-01"),
  },
  {
    id: "konan",
    name: "KONAN NFTs",
    logo: null,
    description: "10,000 hand-drawn NFTs created without AI generation. Each piece is unique, showcasing authentic artistic craftsmanship. Represents the intersection of traditional art and blockchain technology on Kaspa.",
    category: "art",
    features: [
      "10,000 Supply",
      "Hand-Drawn Art",
      "No AI",
      "Unique Pieces",
      "Artistic Value"
    ],
    supply: 10000,
    website: "https://konan.kaspa.art",
    twitter: null,
    telegram: null,
    discord: null,
    status: "live",
    launched: new Date("2024-03-01"),
  },
  {
    id: "krex",
    name: "KREX NFTs",
    logo: null,
    description: "Dual collection featuring PixelKrex (1,000 pieces) and KrexPrime (721 pieces). Limited supply pixel art NFTs with rarity tiers and exclusive holder benefits. Part of the expanding Kaspa NFT ecosystem.",
    category: "pfp",
    features: [
      "PixelKrex: 1,000",
      "KrexPrime: 721",
      "Pixel Art",
      "Rarity Tiers",
      "Limited Supply"
    ],
    supply: 1721,
    website: "https://krex.kaspa.art",
    twitter: null,
    telegram: null,
    discord: null,
    status: "live",
    launched: new Date("2024-04-01"),
  },
  {
    id: "mantis",
    name: "MANTIS Notes",
    logo: null,
    description: "First fully backed NFTs on Kaspa. Each NFT corresponds to locked $MANTIS tokens, providing real asset backing and intrinsic value. Innovative model combining NFT collectibility with DeFi token economics.",
    category: "defi",
    features: [
      "Asset-Backed",
      "Locked MANTIS",
      "Intrinsic Value",
      "DeFi Utility",
      "Redeemable"
    ],
    supply: undefined,
    website: "https://mantis.kaspa.com",
    twitter: null,
    telegram: null,
    discord: null,
    status: "live",
    launched: new Date("2024-05-01"),
  },
  {
    id: "kaspians",
    name: "Kaspians NFT",
    logo: null,
    description: "PFP collection designed for Kaspa pioneers and early adopters. Represents membership in the original Kaspa community with exclusive perks, governance participation, and recognition as a Kaspa OG.",
    category: "pfp",
    features: [
      "Pioneer Badge",
      "OG Status",
      "Community Perks",
      "Governance",
      "Exclusive Access"
    ],
    supply: undefined,
    website: "https://kaspians.art",
    twitter: null,
    telegram: null,
    discord: null,
    status: "live",
    launched: new Date("2024-01-15"),
  },
];

// Marketplaces
const NFT_MARKETPLACES = [
  {
    name: "KaspaCom",
    description: "#1 all-in-one DeFi platform with NFT marketplace, trait filtering, and floor price sorting",
    url: "https://kaspa.com/nft/marketplace",
    features: ["Trait Filtering", "Buy/Sell", "Minting", "Rank Sorting"],
  },
  {
    name: "KaspaBox",
    description: "Premier KRC-721 NFT marketplace on Kaspa's lightning-fast blockchain with minimal fees",
    url: "https://www.kaspabox.fyi",
    features: ["Instant Trades", "Low Fees", "Collections", "Discovery"],
  },
  {
    name: "KSPR Bot",
    description: "Telegram bot for KRC-721 NFTs with mobile-first trading and easy wallet management",
    url: "https://t.me/kspr_1_bot",
    features: ["Telegram Trading", "Mobile-First", "NFT Market", "KRC20 Support"],
  },
  {
    name: "Kaspa NFT Exchange (KNFT)",
    description: "NFT marketplace powered by Kaspa's BlockDAG technology for fast, secure transactions",
    url: "https://www.kaspaex.com",
    features: ["BlockDAG Tech", "Low Costs", "Fast Trades", "Secure"],
  },
];

export default function NFTProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<NFTCategory | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("name");

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = NFT_PROJECTS.filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        case "status":
          return a.status.localeCompare(b.status);
        case "supply":
          return (b.supply || 0) - (a.supply || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const categories: { value: NFTCategory | "all"; label: string; icon: string }[] = [
    { value: "all", label: "All Projects", icon: "🎨" },
    { value: "pfp", label: "PFP", icon: "👤" },
    { value: "art", label: "Art", icon: "🖼️" },
    { value: "gaming", label: "Gaming", icon: "🎮" },
    { value: "defi", label: "DeFi", icon: "💰" },
    { value: "marketplace", label: "Marketplaces", icon: "🛒" },
    { value: "infrastructure", label: "Infrastructure", icon: "🏗️" },
  ];

  const getCategoryColor = (category: NFTCategory): string => {
    const colors: Record<NFTCategory, string> = {
      pfp: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      art: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
      gaming: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      defi: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
      marketplace: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      infrastructure: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border-neutral-500/20",
    };
    return colors[category];
  };

  const getStatusColor = (status: NFTStatus): string => {
    const colors: Record<NFTStatus, string> = {
      live: "bg-green-500/10 text-green-600 dark:text-green-400",
      upcoming: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
      development: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400",
    };
    return colors[status];
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🎨</span>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
              NFT Projects
            </h1>
          </div>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Explore the growing NFT ecosystem on Kaspa using the KRC-721 standard
          </p>
        </div>

        {/* KRC-721 Info Banner */}
        <div className="mb-8 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 dark:from-brand-primary/20 dark:to-brand-accent/20 rounded-xl border-2 border-brand-primary/20 dark:border-brand-primary/30 p-6">
          <div className="flex items-start gap-4">
            <span className="text-3xl">ℹ️</span>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                KRC-721 NFT Standard
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                KRC-20 is for fungible tokens (memecoins), while <strong>KRC-721</strong> is the NFT standard on Kaspa (comparable to ERC-721 on Ethereum).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white/50 dark:bg-neutral-800/50 rounded-lg p-3">
                  <p className="font-semibold text-neutral-900 dark:text-white">Metadata</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">On-chain references</p>
                </div>
                <div className="bg-white/50 dark:bg-neutral-800/50 rounded-lg p-3">
                  <p className="font-semibold text-neutral-900 dark:text-white">Media Storage</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">IPFS decentralized</p>
                </div>
                <div className="bg-white/50 dark:bg-neutral-800/50 rounded-lg p-3">
                  <p className="font-semibold text-neutral-900 dark:text-white">Features</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Royalties, preminting</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search NFT projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-brand-primary dark:focus:border-brand-primary text-neutral-900 dark:text-white"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.value
                    ? "bg-brand-primary text-white"
                    : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-neutral-600 dark:text-neutral-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:border-brand-primary"
            >
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="status">Status</option>
              <option value="supply">Supply</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          Showing {filteredAndSortedProjects.length} of {NFT_PROJECTS.length} projects
        </p>

        {/* NFT Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredAndSortedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 overflow-hidden hover:border-brand-primary dark:hover:border-brand-primary transition-all hover:shadow-lg"
            >
              {/* Logo Placeholder */}
              <div className="h-48 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 flex items-center justify-center">
                <span className="text-6xl">🎨</span>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(project.category)}`}>
                        {project.category.toUpperCase()}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                        {project.status === "live" ? "🟢 LIVE" : project.status === "upcoming" ? "🟡 UPCOMING" : "🔵 DEV"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                    {project.features.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded">
                        +{project.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                {project.supply && (
                  <div className="grid grid-cols-1 gap-2 mb-4 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">Supply</span>
                      <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {project.supply.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-2">
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-brand-primary hover:bg-brand-accent text-white rounded-lg font-medium transition-colors text-center text-sm"
                  >
                    Visit Project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marketplaces Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🛒</span>
            NFT Marketplaces
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NFT_MARKETPLACES.map((marketplace) => (
              <div
                key={marketplace.name}
                className="bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 p-6 hover:border-brand-primary dark:hover:border-brand-primary transition-all"
              >
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  {marketplace.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  {marketplace.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {marketplace.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <a
                  href={marketplace.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-brand-primary hover:bg-brand-accent text-white rounded-lg font-medium transition-colors text-sm"
                >
                  Visit Marketplace
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure Section */}
        <div className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 dark:from-brand-primary/20 dark:to-brand-accent/20 rounded-xl border-2 border-brand-primary/20 dark:border-brand-primary/30 p-6">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🏗️</span>
            Infrastructure & Developments (2025)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-neutral-800/50 rounded-lg p-4">
              <h3 className="font-bold text-neutral-900 dark:text-white mb-2">
                🔷 Kasplex Layer 2 (August 2025)
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                zkEVM-based L2 with EVM-compatibility for complex NFT applications, smart contracts, and advanced DeFi integrations.
              </p>
            </div>
            <div className="bg-white/50 dark:bg-neutral-800/50 rounded-lg p-4">
              <h3 className="font-bold text-neutral-900 dark:text-white mb-2">
                🌉 KAT NFT Bridge (October 2025)
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Cross-chain NFT transfers between Kaspa L1 and Kasplex L2, enabling seamless movement of assets across layers.
              </p>
            </div>
            <div className="bg-white/50 dark:bg-neutral-800/50 rounded-lg p-4">
              <h3 className="font-bold text-neutral-900 dark:text-white mb-2">
                ⚡ Performance Metrics
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Over 100 DApps, 1,800+ TPS, sub-second confirmations, minimal fees - making Kaspa ideal for NFT trading and minting.
              </p>
            </div>
            <div className="bg-white/50 dark:bg-neutral-800/50 rounded-lg p-4">
              <h3 className="font-bold text-neutral-900 dark:text-white mb-2">
                📈 Ecosystem Growth
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Young but actively growing ecosystem with solid technical infrastructure and increasing integration in gaming and DeFi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
