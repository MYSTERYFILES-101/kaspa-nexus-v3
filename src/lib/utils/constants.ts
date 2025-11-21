// v1.0.2 - Constants and Utilities

export const APP_NAME = "KASPA-NEXUS";
export const APP_VERSION = "3.0";

// User Roles
export const USER_ROLES = {
  VISITOR: "visitor",
  FREE: "free",
  PRO: "pro",
  ADMIN: "admin",
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Subscription Status
export const SUBSCRIPTION_STATUS = {
  ACTIVE: "active",
  CANCELLED: "cancelled",
  PAST_DUE: "past_due",
  TRIALING: "trialing",
  INCOMPLETE: "incomplete",
} as const;

// Signal Types
export const SIGNAL_TYPES = {
  BUY: "buy",
  SELL: "sell",
} as const;

export type SignalType = typeof SIGNAL_TYPES[keyof typeof SIGNAL_TYPES];

// Signal Status
export const SIGNAL_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  FAILED: "failed",
} as const;

// Coin Categories
export const COIN_CATEGORIES = {
  COIN: "coin",
  DEFI: "defi",
  NFT: "nft",
  GAMING: "gaming",
  INFRASTRUCTURE: "infrastructure",
} as const;

// Time Ranges
export const TIME_RANGES = {
  "1H": "1h",
  "24H": "24h",
  "7D": "7d",
  "30D": "30d",
  "90D": "90d",
  "1Y": "1y",
  ALL: "all",
} as const;

// Cache TTL (in seconds)
export const CACHE_TTL = {
  PRICE: 60, // 1 minute
  MARKET_DATA: 300, // 5 minutes
  COIN_LIST: 3600, // 1 hour
  SIGNAL: 180, // 3 minutes
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// API Rate Limits
export const RATE_LIMITS = {
  ANONYMOUS: 10, // per minute
  FREE: 30,
  PRO: 100,
  ADMIN: 1000,
} as const;

// Risk Levels
export const RISK_LEVELS = {
  VERY_LOW: 1,
  LOW: 2,
  MEDIUM: 5,
  HIGH: 8,
  VERY_HIGH: 10,
} as const;

// Trading Pairs
export const TRADING_PAIRS = ["USDT", "USDC", "BTC", "ETH"] as const;

// Supported Languages
export const LANGUAGES = {
  EN: "en",
  DE: "de",
} as const;

// Default Values
export const DEFAULTS = {
  CURRENCY: "USD",
  LANGUAGE: "en",
  THEME: "light",
  TIMEZONE: "UTC",
} as const;
