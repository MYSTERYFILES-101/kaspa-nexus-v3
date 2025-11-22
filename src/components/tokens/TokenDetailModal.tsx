// v1.0.17 - Token Detail Modal Component
"use client";

import { Token } from "@/types/token";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface TokenDetailModalProps {
  token: Token | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TokenDetailModal({ token, isOpen, onClose }: TokenDetailModalProps) {
  if (!isOpen || !token) return null;

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(8)}`;
    if (price < 1) return `$${price.toFixed(6)}`;
    return `$${price.toFixed(4)}`;
  };

  const formatLargeNumber = (value: number) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toFixed(0);
  };

  const formatMarketCap = (value: number) => {
    return `$${formatLargeNumber(value)}`;
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-error";
    return "text-neutral-600 dark:text-neutral-400";
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      DeFi: "bg-brand-primary/20 text-brand-primary border-brand-primary/30",
      Gaming: "bg-magenta-500/20 text-magenta-500 border-magenta-500/30",
      NFT: "bg-brand-purple/20 text-brand-purple border-brand-purple/30",
      Infrastructure: "bg-info/20 text-info border-info/30",
      Meme: "bg-warning/20 text-warning border-warning/30",
      Utility: "bg-success/20 text-success border-success/30",
      Governance: "bg-brand-accent/20 text-brand-accent border-brand-accent/30",
    };
    return colors[category] || "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white";
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-6 py-4 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Token Logo */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-bold text-2xl">
                  {token.logo ? (
                    <img src={token.logo} alt={token.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    token.ticker.substring(0, 2).toUpperCase()
                  )}
                </div>

                {/* Name + Ticker */}
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {token.name}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 font-mono text-lg">
                    {token.ticker}
                  </p>
                </div>

                {/* Category Badge */}
                <div className={`px-3 py-1 rounded-lg text-sm font-medium border-2 ${getCategoryColor(token.category)}`}>
                  {token.category}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center justify-center transition-colors"
              >
                <span className="text-2xl text-neutral-600 dark:text-neutral-400">×</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Price Section */}
            <div className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 dark:from-brand-primary/5 dark:to-brand-accent/5 rounded-xl p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                  {formatPrice(token.price)}
                </span>
                <span className={`text-xl font-bold ${getPriceChangeColor(token.priceChange24h)}`}>
                  {token.priceChange24h > 0 ? "+" : ""}
                  {token.priceChange24h.toFixed(2)}%
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">24h Change</p>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <p className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  Price Chart Coming Soon
                </p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Interactive price charts will be added in the next update
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Market Cap</p>
                <p className="text-xl font-bold text-neutral-900 dark:text-white">
                  {formatMarketCap(token.marketCap)}
                </p>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">24h Volume</p>
                <p className="text-xl font-bold text-neutral-900 dark:text-white">
                  {formatMarketCap(token.volume24h)}
                </p>
              </div>
              {token.holders && (
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Holders</p>
                  <p className="text-xl font-bold text-neutral-900 dark:text-white">
                    {token.holders.toLocaleString()}
                  </p>
                </div>
              )}
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Circulating Supply</p>
                <p className="text-xl font-bold text-neutral-900 dark:text-white">
                  {formatLargeNumber(token.circulatingSupply)}
                </p>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Total Supply</p>
                <p className="text-xl font-bold text-neutral-900 dark:text-white">
                  {formatLargeNumber(token.totalSupply)}
                </p>
              </div>
              {token.maxSupply && (
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Max Supply</p>
                  <p className="text-xl font-bold text-neutral-900 dark:text-white">
                    {formatLargeNumber(token.maxSupply)}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            {token.description && (
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">About {token.name}</h3>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {token.description}
                </p>
              </div>
            )}

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">Links & Resources</h3>
              <div className="flex flex-wrap gap-3">
                {token.website && (
                  <a
                    href={token.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-accent transition-colors"
                  >
                    🌐 Website
                  </a>
                )}
                {token.twitter && (
                  <a
                    href={token.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                  >
                    🐦 Twitter
                  </a>
                )}
                {token.telegram && (
                  <a
                    href={token.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                  >
                    ✈️ Telegram
                  </a>
                )}
                {token.discord && (
                  <a
                    href={token.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                  >
                    💬 Discord
                  </a>
                )}
                {token.github && (
                  <a
                    href={token.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                  >
                    💻 GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Listed Date */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700 text-sm text-neutral-600 dark:text-neutral-400">
              Listed on {token.listed.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
