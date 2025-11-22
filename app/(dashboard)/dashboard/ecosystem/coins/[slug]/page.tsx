// v1.0.26 - Token Detail Page with Real API Data
"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Token } from "@/types/token";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function TokenDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const [token, setToken] = useState<Token | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch token from API
  useEffect(() => {
    async function fetchToken() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/tokens/${slug.toUpperCase()}`);

        if (response.status === 404) {
          notFound();
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch token: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || "Failed to fetch token");
        }

        setToken(result.data);
      } catch (err) {
        console.error("Error fetching token:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchToken();
  }, [slug]);

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

  const formatMarketCap = (value: number) => `$${formatLargeNumber(value)}`;

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-error";
    return "text-neutral-600 dark:text-neutral-400";
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div className="mb-6">
          <Link
            href="/dashboard/ecosystem/coins"
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
          >
            ← Back to Tokens
          </Link>
        </div>

        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-primary mb-4"></div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Loading Token Details...
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Fetching data from kas.fyi
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !token) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div className="mb-6">
          <Link
            href="/dashboard/ecosystem/coins"
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
          >
            ← Back to Tokens
          </Link>
        </div>

        <div className="text-center py-16 bg-white dark:bg-neutral-800 rounded-lg border-2 border-red-200 dark:border-red-700">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Failed to Load Token
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {error || "Token not found"}
          </p>
          <Link
            href="/dashboard/ecosystem/coins"
            className="inline-block px-6 py-3 bg-brand-primary text-white rounded-lg font-medium hover:bg-brand-primary/90 transition-colors"
          >
            Back to Tokens
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/dashboard/ecosystem/coins"
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
        >
          ← Back to Tokens
        </Link>
      </div>

      {/* Header Section */}
      <div className="bg-neutral-900 dark:bg-neutral-900 rounded-2xl p-8 mb-6">
        <div className="flex items-start gap-6">
          {/* Token Logo */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-bold text-3xl flex-shrink-0 overflow-hidden">
            {token.logo ? (
              <img
                src={token.logo}
                alt={token.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback wenn Bild nicht lädt
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = token.ticker.substring(0, 2).toUpperCase();
                }}
              />
            ) : (
              token.ticker.substring(0, 2).toUpperCase()
            )}
          </div>

          {/* Token Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">{token.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl text-neutral-400 font-mono">{token.ticker}</span>
              <span className="px-3 py-1 rounded-lg text-sm font-medium bg-warning/20 text-warning">
                {token.category}
              </span>
            </div>

            {/* Description */}
            {token.description && (
              <p className="text-neutral-300 mb-6 max-w-3xl">{token.description}</p>
            )}

            {/* Social Buttons */}
            <div className="flex flex-wrap gap-3">
              {token.website && (
                <a
                  href={token.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-info text-white rounded-lg hover:bg-info/80 transition-colors font-medium"
                >
                  Website
                </a>
              )}
              {token.telegram && (
                <a
                  href={token.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-info text-white rounded-lg hover:bg-info/80 transition-colors font-medium"
                >
                  Telegram
                </a>
              )}
              {token.twitter && (
                <a
                  href={token.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-purple text-white rounded-lg hover:bg-brand-purple/80 transition-colors font-medium"
                >
                  X (Twitter)
                </a>
              )}
              {token.discord && (
                <a
                  href={token.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-purple text-white rounded-lg hover:bg-brand-purple/80 transition-colors font-medium"
                >
                  Discord
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-neutral-900 dark:bg-neutral-900 rounded-lg p-4">
              <p className="text-xs text-neutral-400 mb-1">Price</p>
              <p className="text-2xl font-bold text-white">{formatPrice(token.price)}</p>
            </div>
            <div className="bg-neutral-900 dark:bg-neutral-900 rounded-lg p-4">
              <p className="text-xs text-neutral-400 mb-1">Market Cap</p>
              <p className="text-2xl font-bold text-white">{formatMarketCap(token.marketCap)}</p>
            </div>
            <div className="bg-neutral-900 dark:bg-neutral-900 rounded-lg p-4">
              <p className="text-xs text-neutral-400 mb-1">Volume (24h)</p>
              <p className="text-2xl font-bold text-white">{formatMarketCap(token.volume24h)}</p>
            </div>
            <div className="bg-neutral-900 dark:bg-neutral-900 rounded-lg p-4">
              <p className="text-xs text-neutral-400 mb-1">Holders</p>
              <p className="text-2xl font-bold text-white">{token.holders ? formatLargeNumber(token.holders) : '-'}</p>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-neutral-900 dark:bg-neutral-900 rounded-lg p-4">
              <p className="text-xs text-neutral-400 mb-1">Transfers</p>
              <p className="text-lg font-bold text-white">{token.transferTotal ? formatLargeNumber(token.transferTotal) : '-'}</p>
            </div>
            <div className="bg-neutral-900 dark:bg-neutral-900 rounded-lg p-4">
              <p className="text-xs text-neutral-400 mb-1">Circulating</p>
              <p className="text-lg font-bold text-white">{formatLargeNumber(token.circulatingSupply)}</p>
            </div>
            <div className="bg-neutral-900 dark:bg-neutral-900 rounded-lg p-4">
              <p className="text-xs text-neutral-400 mb-1">Total Supply</p>
              <p className="text-lg font-bold text-white">{formatLargeNumber(token.totalSupply)}</p>
            </div>
            <div className="bg-neutral-900 dark:bg-neutral-900 rounded-lg p-4">
              <p className="text-xs text-neutral-400 mb-1">Deployed</p>
              <p className="text-lg font-bold text-white">{new Date(token.listed).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Price Chart Placeholder */}
          <div className="bg-neutral-900 dark:bg-neutral-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{token.ticker}/USD</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm text-neutral-400 hover:text-white transition-colors">1H</button>
                <button className="px-3 py-1 text-sm text-neutral-400 hover:text-white transition-colors">1D</button>
                <button className="px-3 py-1 text-sm text-neutral-400 hover:text-white transition-colors bg-success/20 text-success rounded">1W</button>
                <button className="px-3 py-1 text-sm text-neutral-400 hover:text-white transition-colors">1M</button>
                <button className="px-3 py-1 text-sm text-neutral-400 hover:text-white transition-colors">ALL</button>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center bg-neutral-800 rounded-lg">
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <p className="text-xl font-bold text-white mb-2">Price Chart Coming Soon</p>
                <p className="text-neutral-400">Interactive charts will be added in the next update</p>
              </div>
            </div>
          </div>

          {/* Latest Updates */}
          <div className="bg-neutral-900 dark:bg-neutral-900 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Latest Updates</h3>
            <div className="space-y-4">
              <div className="p-4 bg-neutral-800 rounded-lg border-l-4 border-warning">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📢</span>
                  <div>
                    <p className="text-warning text-sm font-medium mb-1">Live Data • Now</p>
                    <p className="text-white font-bold mb-2">Real-time Data from kas.fyi</p>
                    <p className="text-neutral-400 text-sm">This token is now showing live market data from kas.fyi API.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-neutral-800 rounded-lg border-l-4 border-success">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <p className="text-success text-sm font-medium mb-1">Community • Updated</p>
                    <p className="text-white font-bold mb-2">Active Community</p>
                    <p className="text-neutral-400 text-sm">{token.holders ? `${formatLargeNumber(token.holders)} holders` : 'Join our growing community'} and participate in discussions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Exchange Listings */}
          <div className="bg-neutral-900 dark:bg-neutral-900 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Where to Trade</h3>
            <div className="space-y-3">
              {['CoinEx', 'Gate.io', 'Pionex', 'KaspaCom'].map((exchange, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                  <span className="text-white font-medium">{exchange}</span>
                  <button className="px-3 py-1 bg-success text-white rounded text-sm font-medium hover:bg-success/80 transition-colors">
                    Trade →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-neutral-900 dark:bg-neutral-900 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Community</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neutral-400 text-sm">Holders</span>
                  <span className="text-white font-bold">{token.holders ? formatLargeNumber(token.holders) : '0'}</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-primary to-brand-accent" style={{ width: '75%' }} />
                </div>
              </div>
              {token.transferTotal && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-400 text-sm">Transfers</span>
                    <span className="text-white font-bold">{formatLargeNumber(token.transferTotal)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
