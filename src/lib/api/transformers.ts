// v1.0.1 - Data Transformers for External APIs

import type { KasFyiTokenMetadata } from "./kasFyi";
import type { Token } from "@/types/token";

/**
 * Transform kas.fyi token metadata to our Token type
 */
export function transformKasFyiToken(metadata: KasFyiTokenMetadata): Token {
  // Calculate market cap from the first market if available
  const primaryMarket = metadata.markets?.[0];
  const price = primaryMarket?.tradingData?.price?.usd || 0;

  // Parse totalMinted and maxSupply
  const totalMinted = parseFloat(metadata.totalMinted) || 0;
  const maxSupply = parseFloat(metadata.maxSupply) || 0;

  // Calculate approximate market cap
  const marketCap = totalMinted * price;

  return {
    id: metadata.ticker.toLowerCase(),
    name: metadata.ticker,
    ticker: metadata.ticker,
    price: price,
    priceChange24h: 0, // 24h change not directly available from kas.fyi
    marketCap: marketCap,
    volume24h: primaryMarket?.tradingData?.volume?.usd || 0,
    logo: metadata.iconUrl || null,
    category: "Token",
    listed: new Date(metadata.deployedAt),
    holders: metadata.holderTotal || 0,
    description: `${metadata.ticker} is a KRC-20 token on the Kaspa blockchain with ${metadata.holderTotal.toLocaleString()} holders.`,
    website: metadata.socialLinks?.find((link) => link.type === "website")?.url || null,
    telegram: metadata.socialLinks?.find((link) => link.type === "telegram")?.url || null,
    twitter: metadata.socialLinks?.find((link) => link.type === "twitter")?.url || null,
    discord: metadata.socialLinks?.find((link) => link.type === "discord")?.url || null,
    maxSupply: maxSupply,
    circulatingSupply: totalMinted,
    totalSupply: maxSupply,
    decimals: metadata.decimal,
    deployerAddress: metadata.deployerAddress,
    transferTotal: metadata.transferTotal,
    mintTotal: metadata.mintTotal,
  };
}

/**
 * Transform multiple kas.fyi tokens
 */
export function transformKasFyiTokens(
  tokensData: Record<string, KasFyiTokenMetadata>
): Token[] {
  return Object.values(tokensData)
    .map(transformKasFyiToken)
    .filter(Boolean);
}

/**
 * Calculate volume-weighted average price from multiple markets
 */
export function calculateVWAP(markets: KasFyiTokenMetadata["markets"]): number {
  if (!markets || markets.length === 0) return 0;

  const totalVolume = markets.reduce((sum, m) => sum + (m.tradingData?.volume?.usd || 0), 0);
  if (totalVolume === 0) return markets[0]?.tradingData?.price?.usd || 0;

  const weightedSum = markets.reduce(
    (sum, m) => sum + ((m.tradingData?.price?.usd || 0) * (m.tradingData?.volume?.usd || 0)),
    0
  );
  return weightedSum / totalVolume;
}
