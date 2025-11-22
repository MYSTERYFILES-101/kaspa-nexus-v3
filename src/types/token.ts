// v1.0.18 - Token Type Definitions (Extended for kas.fyi API)
export interface Token {
  id: string;
  ticker: string;
  name: string;
  logo?: string | null;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply?: number;
  description?: string;
  website?: string | null;
  twitter?: string | null;
  telegram?: string | null;
  discord?: string | null;
  github?: string;
  category: TokenCategory;
  listed: Date;
  holders?: number;
  // Additional fields from kas.fyi API
  decimals?: number;
  deployerAddress?: string;
  transferTotal?: number;
  mintTotal?: number;
}

export type TokenCategory =
  | "native"       // Native blockchain coin (e.g., KASPA)
  | "DeFi"
  | "Gaming"
  | "NFT"
  | "Infrastructure"
  | "Meme"
  | "Utility"
  | "Governance"
  | "Token";

export interface TokenStats {
  allTimeHigh: number;
  allTimeLow: number;
  athDate: Date;
  atlDate: Date;
  roi?: number;
}
