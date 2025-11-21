// v1.0.2 - Site Configuration
export const siteConfig = {
  name: "KASPA-NEXUS",
  version: "3.0",
  description: "Next Generation Blockchain Analytics Platform for Kaspa KRC-20 Ecosystem",
  url: "https://kaspa-nexus.io",

  // Brand Information
  brand: {
    tagline: "Enterprise Trading Platform with AI-powered Signals",
    mission: "Making the Kaspa KRC-20 Ecosystem accessible to everyone",
  },

  // Social Links
  links: {
    twitter: "https://twitter.com/kaspa_nexus",
    github: "https://github.com/MYSTERYFILES-101/kaspa-nexus-v3",
    discord: "https://discord.gg/kaspa-nexus",
    email: "info@kaspa-nexus.io",
  },

  // Navigation Structure
  navigation: {
    main: [
      {
        title: "Dashboard",
        items: [
          { label: "Kaspa-Nexus", href: "/dashboard/main", icon: "🏠" },
          { label: "KRC-20 Netzwerk", href: "/dashboard/krc20", icon: "🌐" },
          { label: "Signal Dashboard", href: "/dashboard/signals", icon: "📊", pro: true },
          { label: "Investment Hub", href: "/dashboard/investment", icon: "💰" },
          { label: "Account & Shop", href: "/dashboard/account", icon: "🛒" },
          { label: "Team & Info", href: "/dashboard/team", icon: "ℹ️" },
        ],
      },
      {
        title: "Ecosystem",
        items: [
          { label: "Coins & Tokens", href: "/ecosystem/coins", icon: "🪙" },
          { label: "DEX & DeFi", href: "/ecosystem/defi", icon: "🔄" },
          { label: "NFT Projects", href: "/ecosystem/nft", icon: "🎨" },
          { label: "Gaming & Metaverse", href: "/ecosystem/gaming", icon: "🎮" },
          { label: "Infrastructure", href: "/ecosystem/infrastructure", icon: "🔧" },
        ],
      },
      {
        title: "Pro Features",
        pro: true,
        items: [
          { label: "AI Signals", href: "/signals/ai-signals", icon: "🤖" },
          { label: "Signal Analytics", href: "/signals/analytics", icon: "📈" },
          { label: "Portfolio Generator", href: "/investment/portfolio", icon: "💼" },
          { label: "Zukunfts-Rechner", href: "/investment/calculator", icon: "🧮" },
        ],
      },
    ],
  },

  // Subscription Tiers
  tiers: {
    visitor: {
      name: "Visitor",
      price: 0,
      features: ["View all dashboards", "Basic market data", "No chat access"],
      badge: { color: "neutral", label: "Visitor" },
    },
    free: {
      name: "Free",
      price: 0,
      features: [
        "All Visitor features",
        "Chat access (all rooms)",
        "User profile",
        "Watchlist",
        "Email notifications",
      ],
      badge: { color: "tier-free", label: "Free" },
    },
    pro: {
      name: "Pro",
      price: 9.99,
      currency: "USD",
      interval: "month",
      features: [
        "All Free features",
        "AI Trading Signals",
        "Signal Analytics",
        "Portfolio Generator",
        "Priority Support",
        "No ads",
      ],
      badge: { color: "tier-pro", label: "Pro" },
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    },
  },

  // API Endpoints
  api: {
    kasFyi: {
      baseUrl: "https://api.kas.fyi",
      rateLimit: 100, // requests per minute
      cacheTTL: 300, // 5 minutes
    },
    coinGecko: {
      baseUrl: "https://api.coingecko.com/api/v3",
      rateLimit: 30, // free tier
      cacheTTL: 60, // 1 minute for price, 5 for charts
    },
    openRouter: {
      model: "anthropic/claude-4.5-sonnet",
      maxTokens: 4096,
    },
    gemini: {
      model: "gemini-pro-3",
      maxTokens: 4096,
    },
  },

  // Feature Flags
  features: {
    chat: true,
    signals: true,
    portfolio: true,
    apiKeys: false, // Coming soon
    darkMode: true,
  },

  // Supported Coins for Signals
  signalCoins: ["KAS", "NACHO", "ZEAL", "KONAN", "KASPER"],
} as const;

export type SiteConfig = typeof siteConfig;
