// v1.0.17 - Token Card Component
"use client";

import { Token } from "@/types/token";

interface TokenCardProps {
  token: Token;
}

export function TokenCard({ token }: TokenCardProps) {
  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(2)}`;
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(0)}`;
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-error";
    return "text-neutral-600 dark:text-neutral-400";
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      native: "bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold", // Special for KASPA
      DeFi: "bg-brand-primary/20 text-brand-primary",
      Gaming: "bg-magenta-500/20 text-magenta-500",
      NFT: "bg-brand-purple/20 text-brand-purple",
      Infrastructure: "bg-info/20 text-info",
      Meme: "bg-warning/20 text-warning",
      Utility: "bg-success/20 text-success",
      Governance: "bg-brand-accent/20 text-brand-accent",
    };
    return colors[category] || "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white";
  };

  const getCategoryLabel = (category: string) => {
    if (category === "native") return "Native Coin";
    return category;
  };

  return (
    <div className="group relative bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-brand-primary dark:hover:border-brand-primary transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      <div className="relative p-6">
        {/* Header: Logo + Name + Category */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Token Logo */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {token.logo ? (
                <img src={token.logo} alt={token.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                token.ticker.substring(0, 2).toUpperCase()
              )}
            </div>

            {/* Name + Ticker */}
            <div className="min-w-0">
              <h3 className="font-bold text-neutral-900 dark:text-white text-lg truncate">
                {token.name}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-mono">
                {token.ticker}
              </p>
            </div>
          </div>

          {/* Category Badge */}
          <div className={`px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(token.category)}`}>
            {getCategoryLabel(token.category)}
          </div>
        </div>

        {/* Price + 24h Change */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-neutral-900 dark:text-white">
              {formatPrice(token.price)}
            </span>
            <span className={`text-sm font-medium ${getPriceChangeColor(token.priceChange24h)}`}>
              {token.priceChange24h > 0 ? "+" : ""}
              {token.priceChange24h.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs mb-1">Market Cap</p>
            <p className="font-bold text-neutral-900 dark:text-white">
              {formatMarketCap(token.marketCap)}
            </p>
          </div>
          <div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs mb-1">24h Volume</p>
            <p className="font-bold text-neutral-900 dark:text-white">
              {formatMarketCap(token.volume24h)}
            </p>
          </div>
        </div>

        {/* Holders */}
        {token.holders && (
          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">Holders</span>
              <span className="font-medium text-neutral-900 dark:text-white">
                {token.holders.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* View Details Button */}
        <div className="mt-4">
          <div className="w-full py-2 text-center text-sm font-medium text-brand-primary group-hover:text-brand-accent transition-colors">
            View Details →
          </div>
        </div>
      </div>
    </div>
  );
}
