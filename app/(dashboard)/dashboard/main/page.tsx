// v1.0.1 - Main Dashboard
"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function MainDashboard() {
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play video once on mount
  useEffect(() => {
    if (videoRef.current && !hasPlayedOnce) {
      videoRef.current.play();
    }
  }, [hasPlayedOnce]);

  const handleVideoEnded = () => {
    setHasPlayedOnce(true);
  };

  const handleVideoClick = () => {
    if (videoRef.current && hasPlayedOnce) {
      videoRef.current.play();
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro Video - Auto-plays once, then click to replay */}
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        <video
          ref={videoRef}
          className="w-full h-full object-cover cursor-pointer"
          onEnded={handleVideoEnded}
          onClick={handleVideoClick}
          muted
          playsInline
        >
          <source src="/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {hasPlayedOnce && (
          <div className="absolute bottom-4 left-4 text-white/80 text-sm font-medium bg-black/50 px-4 py-2 rounded-lg hover:bg-black/70 transition-colors">
            Click to replay
          </div>
        )}
      </div>

      {/* What is KASPA-NEXUS? */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">What is KASPA-NEXUS?</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
            KASPA-NEXUS is the <strong>central data platform</strong> for the Kaspa KRC-20 ecosystem.
            We provide high-quality market data, AI-powered trading signals, and portfolio management
            for professional traders and investors.
          </p>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            With <strong>Dual-AI Validation</strong>, we guarantee the highest signal quality.
            All our AI signals are analyzed by advanced AI tools – a signal is only created when
            both models agree.
          </p>
        </CardContent>
      </Card>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/5 dark:to-brand-secondary/5 border-brand-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Make the <strong>Kaspa network more popular</strong> and provide everyone access to professional
              trading tools. Fair prices without scams – quality over quantity.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Become the <strong>leading platform</strong> for the Kaspa KRC-20 ecosystem.
              Community First Approach – everyone should feel welcome and have access to
              enterprise-grade tools.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Platform Features</CardTitle>
          <CardDescription>What makes KASPA-NEXUS unique</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">
                  Dual-AI Validation
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Every trade analyzed by advanced AI tools – highest quality guaranteed
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center text-2xl">
                📊
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">
                  Live Market Data
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  All KRC-20 tokens tracked in real-time via kas.fyi + CoinGecko API
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center text-2xl">
                💼
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">
                  Portfolio Generator
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  AI-powered portfolios with risk adjustment and rebalancing strategy
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-info/20 rounded-xl flex items-center justify-center text-2xl">
                🌐
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">
                  Complete Ecosystem
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Coins, DEX, NFTs, Gaming, Infrastructure – everything in one place
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl">
                💬
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">
                  Community Chat
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Coin-specific rooms, moderators, anti-spam protection
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center text-2xl">
                ⭐
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">
                  Fair Pricing
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Free tier for everyone, Pro only $9.99/month – no scams, full transparency
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Statistics */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          Live Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hover>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">
                    1,234
                  </p>
                  <p className="text-xs text-success mt-1">+12.5% from last month</p>
                </div>
                <div className="p-3 bg-brand-light dark:bg-brand-dark/20 rounded-full">
                  <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Signals Today
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">
                    5
                  </p>
                  <p className="text-xs text-info mt-1">42 active total</p>
                </div>
                <div className="p-3 bg-success-light dark:bg-success-dark/20 rounded-full">
                  <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Win Rate
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">
                    87.3%
                  </p>
                  <p className="text-xs text-success mt-1">Above 80% target</p>
                </div>
                <div className="p-3 bg-warning-light dark:bg-warning-dark/20 rounded-full">
                  <svg className="w-6 h-6 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    KRC-20 Tokens
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">
                    156
                  </p>
                  <p className="text-xs text-info mt-1">Tracked live</p>
                </div>
                <div className="p-3 bg-info-light dark:bg-info-dark/20 rounded-full">
                  <svg className="w-6 h-6 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* News Flash: Platform Updates */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📢</span>
            <div>
              <CardTitle>News Flash: Platform Updates</CardTitle>
              <CardDescription>Latest announcements and improvements</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3 p-4 bg-brand-light dark:bg-brand-dark/20 rounded-lg border-l-4 border-brand-primary">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="default" size="sm">HIGH</Badge>
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    New AI Tools Integration
                  </p>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Advanced AI tools are now live for dual-AI validation.
                  Signal quality improved significantly!
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
                  Today at 10:30 AM
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 bg-success-light/20 dark:bg-success-dark/10 rounded-lg border-l-4 border-success">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="success" size="sm">NEW</Badge>
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    Portfolio Generator Beta
                  </p>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Pro users can now access the AI-powered portfolio generator with risk adjustment!
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
                  Yesterday at 2:15 PM
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 bg-info-light/20 dark:bg-info-dark/10 rounded-lg border-l-4 border-info">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="default" size="sm">UPDATE</Badge>
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    15 New KRC-20 Tokens Added
                  </p>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Ecosystem expanded with new tokens now tracked in real-time
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
                  2 days ago
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Quick Links</CardTitle>
          <CardDescription>Explore all features of KASPA-NEXUS</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="primary" size="lg" fullWidth>
              <span className="text-xl mr-2">🤖</span>
              AI Signals
            </Button>
            <Button variant="secondary" size="lg" fullWidth>
              <span className="text-xl mr-2">💼</span>
              Portfolio Generator
            </Button>
            <Button variant="outline" size="lg" fullWidth>
              <span className="text-xl mr-2">🪙</span>
              Browse Ecosystem
            </Button>
            <Button variant="outline" size="lg" fullWidth>
              <span className="text-xl mr-2">⭐</span>
              Upgrade to Pro
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
