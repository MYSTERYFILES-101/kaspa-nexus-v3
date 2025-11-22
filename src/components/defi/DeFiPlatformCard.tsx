// v1.0.1 - DeFi Platform Card Component
"use client";

import { DeFiPlatform } from "@/types/defi";

interface DeFiPlatformCardProps {
  platform: DeFiPlatform;
}

export function DeFiPlatformCard({ platform }: DeFiPlatformCardProps) {
  const formatTVL = (tvl?: number) => {
    if (!tvl) return "N/A";
    if (tvl >= 1e9) return `$${(tvl / 1e9).toFixed(2)}B`;
    if (tvl >= 1e6) return `$${(tvl / 1e6).toFixed(2)}M`;
    if (tvl >= 1e3) return `$${(tvl / 1e3).toFixed(2)}K`;
    return `$${tvl.toFixed(0)}`;
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
    <div className="group relative bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-brand-primary dark:hover:border-brand-primary transition-all duration-200 cursor-pointer overflow-hidden">
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      <div className="relative p-6">
        {/* Header: Logo + Name + Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Platform Logo */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {platform.logo ? (
                <img src={platform.logo} alt={platform.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                platform.name.substring(0, 2).toUpperCase()
              )}
            </div>

            {/* Name */}
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-neutral-900 dark:text-white text-lg truncate">
                {platform.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(platform.category)}`}>
                  {platform.category}
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap ${getStatusColor(platform.status)}`}>
            {getStatusLabel(platform.status)}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
          {platform.description}
        </p>

        {/* TVL */}
        {platform.tvl !== undefined && (
          <div className="mb-4 p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Total Value Locked</p>
            <p className="text-xl font-bold text-neutral-900 dark:text-white">
              {formatTVL(platform.tvl)}
            </p>
          </div>
        )}

        {/* Features */}
        {platform.features.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2 font-medium">Features:</p>
            <div className="flex flex-wrap gap-2">
              {platform.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded text-xs text-neutral-700 dark:text-neutral-300"
                >
                  {feature}
                </span>
              ))}
              {platform.features.length > 3 && (
                <span className="px-2 py-1 text-xs text-neutral-500 dark:text-neutral-400">
                  +{platform.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Social Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          {platform.website && (
            <a
              href={platform.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-lg">🌐</span>
            </a>
          )}
          {platform.twitter && (
            <a
              href={platform.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-lg">𝕏</span>
            </a>
          )}
          {platform.telegram && (
            <a
              href={platform.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-lg">✈️</span>
            </a>
          )}
          {platform.discord && (
            <a
              href={platform.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-lg">💬</span>
            </a>
          )}
          {platform.github && (
            <a
              href={platform.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-lg">⚙️</span>
            </a>
          )}
        </div>

        {/* View Details Link */}
        <div className="mt-4">
          <div className="w-full py-2 text-center text-sm font-medium text-brand-primary group-hover:text-brand-accent transition-colors">
            View Details →
          </div>
        </div>
      </div>
    </div>
  );
}
