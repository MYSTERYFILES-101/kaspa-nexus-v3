// v1.0.0 - Enterprise Kaspa Network Statistics Card
"use client";

import { useEffect, useState } from "react";

interface NetworkStats {
  blockHeight: number;
  hashrate: number;
  totalSupply: number;
  circulatingSupply: number;
  currentBlockReward: number;
  difficulty: number;
  blockTime: number;
  blocksPerDay: number;
  lastUpdated: string;
}

interface ApiResponse {
  success: boolean;
  data: NetworkStats;
  timestamp: string;
}

export function NetworkStatsCard() {
  const [stats, setStats] = useState<NetworkStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNetworkStats = async () => {
    try {
      const response = await fetch("/api/kaspa/network");
      const data: ApiResponse = await response.json();

      if (data.success) {
        setStats(data.data);
        setError(null);
      } else {
        setError("Failed to fetch network statistics");
      }
    } catch (err) {
      setError("Network error occurred");
      console.error("Error fetching network stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchNetworkStats();

    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchNetworkStats, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number, decimals: number = 0): string => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const formatHashrate = (hashrate: number): string => {
    if (hashrate >= 1_000_000) {
      return `${(hashrate / 1_000_000).toFixed(2)} EH/s`;
    }
    if (hashrate >= 1_000) {
      return `${(hashrate / 1_000).toFixed(2)} PH/s`;
    }
    return `${hashrate.toFixed(2)} TH/s`;
  };

  const formatSupply = (supply: number): string => {
    if (supply >= 1_000_000_000) {
      return `${(supply / 1_000_000_000).toFixed(2)}B`;
    }
    if (supply >= 1_000_000) {
      return `${(supply / 1_000_000).toFixed(2)}M`;
    }
    return formatNumber(supply, 0);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-neutral-600 dark:text-neutral-400">Loading network statistics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              Failed to Load Statistics
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">{error}</p>
            <button
              onClick={fetchNetworkStats}
              className="px-4 py-2 bg-brand-primary hover:bg-brand-accent text-white rounded-lg font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 dark:from-brand-primary/20 dark:to-brand-accent/20 px-6 py-4 border-b-2 border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Live Network Statistics
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Real-time Kaspa blockchain metrics
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
            Live
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Block Height */}
          <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 dark:from-brand-primary/10 dark:to-brand-accent/10 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Block Height
              </p>
              <span className="text-xl">📈</span>
            </div>
            <p className="text-3xl font-bold text-neutral-900 dark:text-white">
              {formatNumber(stats.blockHeight)}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              ~1 block/second
            </p>
          </div>

          {/* Network Hashrate */}
          <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 dark:from-brand-primary/10 dark:to-brand-accent/10 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Network Hashrate
              </p>
              <span className="text-xl">⚡</span>
            </div>
            <p className="text-3xl font-bold text-neutral-900 dark:text-white">
              {formatHashrate(stats.hashrate)}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Total computing power
            </p>
          </div>

          {/* Total Supply */}
          <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 dark:from-brand-primary/10 dark:to-brand-accent/10 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Total Supply
              </p>
              <span className="text-xl">💰</span>
            </div>
            <p className="text-3xl font-bold text-neutral-900 dark:text-white">
              {formatSupply(stats.totalSupply)}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              KAS in circulation
            </p>
          </div>

          {/* Block Reward */}
          <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 dark:from-brand-primary/10 dark:to-brand-accent/10 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Block Reward
              </p>
              <span className="text-xl">🎁</span>
            </div>
            <p className="text-3xl font-bold text-neutral-900 dark:text-white">
              {formatNumber(stats.currentBlockReward, 2)}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              KAS per block
            </p>
          </div>

          {/* Difficulty */}
          <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 dark:from-brand-primary/10 dark:to-brand-accent/10 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Difficulty
              </p>
              <span className="text-xl">🎯</span>
            </div>
            <p className="text-3xl font-bold text-neutral-900 dark:text-white">
              {(stats.difficulty / 1_000_000_000_000).toFixed(2)}T
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Mining difficulty
            </p>
          </div>

          {/* Block Time */}
          <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 dark:from-brand-primary/10 dark:to-brand-accent/10 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Block Time
              </p>
              <span className="text-xl">⏱️</span>
            </div>
            <p className="text-3xl font-bold text-neutral-900 dark:text-white">
              {stats.blockTime.toFixed(1)}s
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Average block time
            </p>
          </div>

          {/* Blocks Per Day */}
          <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 dark:from-brand-primary/10 dark:to-brand-accent/10 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Blocks/Day
              </p>
              <span className="text-xl">📅</span>
            </div>
            <p className="text-3xl font-bold text-neutral-900 dark:text-white">
              {formatNumber(stats.blocksPerDay)}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Daily block production
            </p>
          </div>

          {/* Circulating Supply */}
          <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 dark:from-brand-primary/10 dark:to-brand-accent/10 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Circulating Supply
              </p>
              <span className="text-xl">🔄</span>
            </div>
            <p className="text-3xl font-bold text-neutral-900 dark:text-white">
              {formatSupply(stats.circulatingSupply)}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Available KAS
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
            Last updated: {new Date(stats.lastUpdated).toLocaleString()} • Auto-refreshes every 60 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
