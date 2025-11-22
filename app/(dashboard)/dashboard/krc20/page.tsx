// v1.1.0 - KRC-20 Network Dashboard with Enterprise Network Statistics
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { NetworkStatsCard } from "@/components/kaspa/NetworkStatsCard";
import { EmissionScheduleChart } from "@/components/kaspa/EmissionScheduleChart";

interface KaspaData {
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
}

export default function KRC20Dashboard() {
  // KASPA price data
  const [kaspaData, setKaspaData] = useState<KaspaData | null>(null);
  const [kaspaLoading, setKaspaLoading] = useState(true);
  const [kaspaError, setKaspaError] = useState<string | null>(null);

  // Fetch KASPA data from CoinGecko
  useEffect(() => {
    async function fetchKaspaData() {
      try {
        setKaspaLoading(true);
        setKaspaError(null);

        const response = await fetch("/api/kaspa");

        if (!response.ok) {
          throw new Error(`Failed to fetch KASPA data: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || "Failed to fetch KASPA data");
        }

        setKaspaData({
          price: result.data.price,
          priceChange24h: result.data.priceChange24h,
          marketCap: result.data.marketCap,
          volume24h: result.data.volume24h,
        });
      } catch (err) {
        console.error("Error fetching KASPA data:", err);
        setKaspaError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setKaspaLoading(false);
      }
    }

    fetchKaspaData();

    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchKaspaData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Banner - KRC-20 Network */}
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/images/Krc-20banner.png"
          alt="KRC-20 Network"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* KASPA Live Price - Network Foundation */}
      <Card className="bg-gradient-to-br from-brand-primary/10 via-brand-secondary/10 to-purple-500/10 dark:from-brand-primary/5 dark:via-brand-secondary/5 dark:to-purple-500/5 border-2 border-brand-primary/50 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                K
              </div>
              <div>
                <CardTitle className="text-2xl">KASPA (KAS)</CardTitle>
                <CardDescription className="text-sm">The Network Foundation - Live Price from CoinGecko</CardDescription>
              </div>
            </div>
            {!kaspaLoading && !kaspaError && (
              <Badge variant="default" className="bg-green-500 text-white">
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                LIVE
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {kaspaLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-brand-primary"></div>
            </div>
          ) : kaspaError ? (
            <div className="text-center py-8">
              <p className="text-red-500 dark:text-red-400 font-medium mb-2">Failed to load KASPA data</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{kaspaError}</p>
            </div>
          ) : kaspaData ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Price */}
              <div className="bg-white/50 dark:bg-neutral-800/50 rounded-lg p-4 backdrop-blur">
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Price (USD)</p>
                <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                  ${kaspaData.price.toFixed(4)}
                </p>
              </div>

              {/* 24h Change */}
              <div className="bg-white/50 dark:bg-neutral-800/50 rounded-lg p-4 backdrop-blur">
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">24h Change</p>
                <p className={`text-3xl font-bold ${kaspaData.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {kaspaData.priceChange24h >= 0 ? '+' : ''}{kaspaData.priceChange24h.toFixed(2)}%
                </p>
              </div>

              {/* Market Cap */}
              <div className="bg-white/50 dark:bg-neutral-800/50 rounded-lg p-4 backdrop-blur">
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Market Cap</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  ${(kaspaData.marketCap / 1e9).toFixed(2)}B
                </p>
              </div>

              {/* Volume 24h */}
              <div className="bg-white/50 dark:bg-neutral-800/50 rounded-lg p-4 backdrop-blur">
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Volume (24h)</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  ${(kaspaData.volume24h / 1e6).toFixed(1)}M
                </p>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* Enterprise Network Statistics */}
      <NetworkStatsCard />

      {/* Emission Schedule Visualization */}
      <EmissionScheduleChart />

      {/* What is KRC-20 Network? */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">What is the KRC-20 Network?</CardTitle>
          <CardDescription className="text-base">Understanding the next generation of token standards</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <div className="space-y-4 text-lg">
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <strong>KRC-20</strong> is the native token standard for the Kaspa blockchain, representing a revolutionary
              approach to digital assets. Unlike traditional blockchains that use a linear chain structure, Kaspa utilizes
              a <strong>blockDAG (Directed Acyclic Graph)</strong> architecture, enabling unprecedented transaction speeds
              and scalability.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              The KRC-20 standard allows developers to create fungible tokens on the Kaspa network with <strong>instant confirmations</strong>,
              minimal fees, and unlimited throughput. This makes KRC-20 ideal for DeFi applications, NFT marketplaces,
              gaming economies, and high-frequency trading platforms.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              With over <strong>156 active tokens</strong> and a growing ecosystem of DEX platforms, NFT projects, and
              gaming applications, the KRC-20 network is rapidly becoming the go-to platform for developers seeking
              performance without compromise.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Technology & Potential */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5 border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <span className="text-3xl">⚡</span>
              Technology Revolution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-xl">
                🚀
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">BlockDAG Architecture</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Parallel block creation enables 1 block per second with infinite scalability potential
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-xl">
                ⚡
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Instant Confirmations</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Sub-second transaction finality – no more waiting for confirmations
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-xl">
                💎
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Minimal Fees</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Fractions of a cent per transaction – DeFi accessible to everyone
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center text-xl">
                🌍
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Decentralized Security</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Proof-of-Work consensus with GHOSTDAG protocol for maximum security
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <span className="text-3xl">🎯</span>
              Unlimited Potential
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center text-xl">
                🔄
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">DeFi Ecosystem</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  DEX platforms with instant swaps, liquidity pools, and yield farming
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center text-xl">
                🎨
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">NFT Marketplaces</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  High-throughput NFT trading without gas wars or network congestion
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-xl">
                🎮
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Gaming Economies</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  In-game tokens with instant transfers – perfect for play-to-earn games
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-xl">
                🏦
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Institutional Grade</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Enterprise-ready infrastructure for payment processors and exchanges
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Why Kaspa is the Future */}
      <Card className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3">
            <span className="text-4xl">🚀</span>
            Why Kaspa is the Future
          </CardTitle>
          <CardDescription className="text-base">The only blockchain that delivers on the blockchain trilemma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Speed */}
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Speed</h3>
              <p className="text-4xl font-bold text-brand-primary mb-2">1 BPS</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                1 block per second – 600x faster than Bitcoin
              </p>
            </div>

            {/* Scalability */}
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Scalability</h3>
              <p className="text-4xl font-bold text-success mb-2">∞ TPS</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Unlimited throughput with parallel block processing
              </p>
            </div>

            {/* Security */}
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Security</h3>
              <p className="text-4xl font-bold text-warning mb-2">100%</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Proof-of-Work with GHOSTDAG consensus protocol
              </p>
            </div>
          </div>

          <div className="mt-6 p-6 bg-brand-light dark:bg-brand-dark/20 rounded-xl border-l-4 border-brand-primary">
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <strong>The Blockchain Trilemma Solved:</strong> For years, blockchains have struggled to achieve
              speed, scalability, and security simultaneously. Kaspa&apos;s blockDAG architecture is the first to
              deliver on all three – making it the ultimate foundation for the future of decentralized finance.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ecosystem Statistics */}
      <div>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
          Ecosystem Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hover>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Active Tokens
                  </p>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-2">
                    156
                  </p>
                  <p className="text-xs text-success mt-1">+23 this month</p>
                </div>
                <div className="p-4 bg-brand-light dark:bg-brand-dark/20 rounded-full">
                  <span className="text-3xl">🪙</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Total Market Cap
                  </p>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-2">
                    $42M
                  </p>
                  <p className="text-xs text-success mt-1">+15.3% growth</p>
                </div>
                <div className="p-4 bg-success-light dark:bg-success-dark/20 rounded-full">
                  <span className="text-3xl">💰</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    24h Volume
                  </p>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-2">
                    $8.5M
                  </p>
                  <p className="text-xs text-info mt-1">Across all DEX</p>
                </div>
                <div className="p-4 bg-info-light dark:bg-info-dark/20 rounded-full">
                  <span className="text-3xl">📊</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Total Holders
                  </p>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-2">
                    45K+
                  </p>
                  <p className="text-xs text-success mt-1">Growing daily</p>
                </div>
                <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  <span className="text-3xl">👥</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Explore Ecosystem Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Explore the Ecosystem</CardTitle>
          <CardDescription className="text-base">Discover all categories of the KRC-20 network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Coins & Tokens */}
            <Link href="/ecosystem/coins">
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-brand-primary">
                <CardContent className="pt-6">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🪙</div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    Coins & Tokens
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    Browse all 156 KRC-20 tokens with live prices, market cap, and 24h volume
                  </p>
                  <Badge variant="default">156 Tokens</Badge>
                </CardContent>
              </Card>
            </Link>

            {/* DEX & DeFi */}
            <Link href="/ecosystem/defi">
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-success">
                <CardContent className="pt-6">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔄</div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    DEX & DeFi
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    Decentralized exchanges, liquidity pools, and DeFi protocols
                  </p>
                  <Badge variant="success">$8.5M Volume</Badge>
                </CardContent>
              </Card>
            </Link>

            {/* NFT Projects */}
            <Link href="/ecosystem/nft">
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-500">
                <CardContent className="pt-6">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎨</div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    NFT Projects
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    NFT collections, marketplaces, and digital art on Kaspa
                  </p>
                  <Badge variant="warning">Coming Soon</Badge>
                </CardContent>
              </Card>
            </Link>

            {/* Gaming & Metaverse */}
            <Link href="/ecosystem/gaming">
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-pink-500">
                <CardContent className="pt-6">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎮</div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    Gaming & Metaverse
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    Play-to-earn games, in-game tokens, and metaverse projects
                  </p>
                  <Badge variant="warning">In Development</Badge>
                </CardContent>
              </Card>
            </Link>

            {/* Infrastructure */}
            <Link href="/ecosystem/infrastructure">
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-info">
                <CardContent className="pt-6">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔧</div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    Infrastructure
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    Developer tools, APIs, wallets, and infrastructure services
                  </p>
                  <Badge variant="default">Essential Tools</Badge>
                </CardContent>
              </Card>
            </Link>

            {/* All Categories Overview */}
            <Link href="/ecosystem/coins">
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-brand-primary">
                <CardContent className="pt-6 flex flex-col items-center justify-center h-full">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🌐</div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 text-center">
                    View All Categories
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                    Explore the complete ecosystem
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-brand-primary to-brand-secondary border-0">
        <CardContent className="py-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Explore the KRC-20 Ecosystem?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover tokens, trade on DEX platforms, and be part of the fastest blockchain ecosystem
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <span className="text-xl mr-2">🪙</span>
              Browse All Tokens
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
              <span className="text-xl mr-2">📚</span>
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
