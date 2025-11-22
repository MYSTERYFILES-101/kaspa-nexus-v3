// v2.0.0 - Tokens API Route - Live KRC-20 Tokens from Kasplex
import { NextResponse } from "next/server";
import type { Token } from "@/types/token";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every 60 seconds

const KASPLEX_API_BASE = "https://api.kasplex.org/v1";

interface KasplexToken {
  tick?: string;
  ca?: string;
  name?: string;
  max: string;
  lim: string;
  pre: string;
  to: string;
  dec: string;
  mod: string;
  minted: string;
  burned: string;
  state: string;
  hashRev: string;
  mtsAdd: string;
}

interface KasplexResponse {
  message: string;
  result: KasplexToken[];
}

export async function GET() {
  try {
    // Fetch live token list from Kasplex
    const response = await fetch(`${KASPLEX_API_BASE}/krc20/tokenlist`, {
      method: "GET",
      headers: { "Accept": "application/json" },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Kasplex API error: ${response.status}`);
    }

    const data: KasplexResponse = await response.json();

    if (data.message !== "successful") {
      throw new Error("Kasplex API returned unsuccessful response");
    }

    // Transform Kasplex data to our Token format
    const tokens: Token[] = data.result
      .filter(token => token.tick || token.ca) // Only tokens with ticker or contract
      .map((token) => {
        const ticker = (token.tick || token.ca || token.name || "UNKNOWN").toUpperCase();
        const name = token.name || ticker;
        const decimals = parseInt(token.dec) || 8;
        const maxSupply = parseFloat(token.max) / Math.pow(10, decimals);
        const mintedSupply = parseFloat(token.minted) / Math.pow(10, decimals);
        const burnedSupply = parseFloat(token.burned) / Math.pow(10, decimals);
        const circulatingSupply = mintedSupply - burnedSupply;
        const deployedAt = parseInt(token.mtsAdd);

        return {
          id: ticker.toLowerCase(),
          ticker,
          name,
          logo: null,
          price: 0, // Prices would come from kas.fyi or DexScreener
          priceChange24h: 0,
          marketCap: 0,
          volume24h: 0,
          circulatingSupply,
          totalSupply: mintedSupply,
          maxSupply: maxSupply > 0 ? maxSupply : undefined,
          description: undefined,
          website: null,
          twitter: null,
          telegram: null,
          discord: null,
          category: "Token" as const,
          listed: new Date(deployedAt),
          holders: undefined,
          decimals,
          deployerAddress: token.to,
          mintTotal: mintedSupply,
        };
      });

    // Sort by total supply descending (since we don't have market cap yet)
    tokens.sort((a, b) => b.totalSupply - a.totalSupply);

    return NextResponse.json({
      success: true,
      count: tokens.length,
      data: tokens,
      source: "kasplex",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch tokens",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
