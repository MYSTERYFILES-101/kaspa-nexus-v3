// v1.0.1 - DeFi Platform Type Definitions
export interface DeFiPlatform {
  id: string;
  name: string;
  logo?: string | null;
  description: string;
  category: DeFiCategory;
  features: string[];
  tvl?: number; // Total Value Locked in USD
  website?: string | null;
  twitter?: string | null;
  telegram?: string | null;
  discord?: string | null;
  github?: string | null;
  status: PlatformStatus;
  launched?: Date;
}

export type DeFiCategory =
  | "DEX"           // Decentralized Exchange
  | "Lending"       // Lending & Borrowing
  | "Launchpad"     // Token Launchpad
  | "Aggregator"    // DeFi Aggregator
  | "Staking"       // Staking Platform
  | "Bridge"        // Cross-chain Bridge
  | "Marketplace"   // NFT Marketplace
  | "Wallet"        // Web3 Wallet
  | "All-in-One";   // Multi-feature Platform

export type PlatformStatus =
  | "live"          // Live and operational
  | "beta"          // In beta testing
  | "upcoming"      // Announced but not launched
  | "development";  // In development

export interface DeFiStats {
  totalTVL: number;
  totalPlatforms: number;
  activePlatforms: number;
  upcomingPlatforms: number;
}
