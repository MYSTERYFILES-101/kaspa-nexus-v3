// v1.0.2 - Global Type Definitions

import { USER_ROLES, SIGNAL_TYPES, SIGNAL_STATUS, COIN_CATEGORIES } from "@/lib/utils/constants";

// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  role: UserRole;
  subscription_status?: SubscriptionStatus;
  subscription_end?: Date;
  created_at: Date;
  updated_at: Date;
}

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export type SubscriptionStatus = "active" | "cancelled" | "past_due" | "trialing" | "incomplete";

// Coin/Token Types
export interface Coin {
  id: string;
  symbol: string;
  name: string;
  logo_url?: string;
  description?: string;
  website?: string;
  category: CoinCategory;
  social_links?: SocialLinks;
  is_active: boolean;
  created_at: Date;
}

export type CoinCategory = typeof COIN_CATEGORIES[keyof typeof COIN_CATEGORIES];

export interface SocialLinks {
  twitter?: string;
  discord?: string;
  telegram?: string;
  github?: string;
}

// Market Data Types
export interface MarketData {
  id: string;
  coin_id: string;
  price_usd: number;
  market_cap?: number;
  volume_24h?: number;
  holders?: number;
  change_24h?: number;
  change_7d?: number;
  change_30d?: number;
  updated_at: Date;
}

export interface PriceHistory {
  timestamp: Date;
  price: number;
  volume?: number;
}

export interface OHLC {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

// Trading Signal Types
export interface TradingSignal {
  id: string;
  coin: string;
  type: SignalType;
  entry_price: number;
  stop_loss: number;
  take_profits: number[]; // Array of 5 TP levels
  confidence: number; // 0-100
  claude_analysis: string;
  gemini_analysis: string;
  status: SignalStatus;
  created_at: Date;
  updated_at: Date;
  completed_at?: Date;
}

export type SignalType = typeof SIGNAL_TYPES[keyof typeof SIGNAL_TYPES];
export type SignalStatus = typeof SIGNAL_STATUS[keyof typeof SIGNAL_STATUS];

export interface SignalEvent {
  id: string;
  signal_id: string;
  event_type: "tp_hit" | "sl_hit" | "tp_updated" | "sl_updated" | "cancelled";
  old_value?: number;
  new_value?: number;
  timestamp: Date;
}

export interface SignalPerformance {
  total_signals: number;
  successful: number;
  failed: number;
  win_rate: number;
  average_profit: number;
  best_trade: number;
  worst_trade: number;
}

// Portfolio Types
export interface Portfolio {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  allocations: PortfolioAllocation[];
  total_value: number;
  risk_level: number; // 1-10
  created_at: Date;
  updated_at: Date;
}

export interface PortfolioAllocation {
  coin: string;
  percentage: number;
  amount?: number;
  reasoning?: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  user_id: string;
  room: string;
  message: string;
  created_at: Date;
  user?: {
    username: string;
    avatar_url?: string;
    role: UserRole;
  };
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  is_public: boolean;
  member_count: number;
}

// News Flash Types
export interface NewsFlash {
  id: string;
  dashboard_type: "main" | "signal" | "investment";
  title: string;
  content: string;
  priority: "low" | "medium" | "high" | "critical";
  active: boolean;
  created_at: Date;
  expires_at?: Date;
}

// Exchange Types
export interface Exchange {
  name: string;
  logo_url?: string;
  trading_pairs: string[];
  volume_24h?: number;
  url: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface CardProps extends BaseComponentProps {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
}
