// v1.0.0 - KRC20 Token List API (Kasplex Integration)
import { NextResponse } from "next/server";

/**
 * KRC20 Token List API
 *
 * Fetches live KRC20 token data from Kasplex Indexer API
 * Returns processed and normalized token information
 */

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
  opScoreAdd: string;
  opScoreMod: string;
  state: string;
  hashRev: string;
  mtsAdd: string;
}

interface KasplexResponse {
  message: string;
  prev?: string;
  next?: string;
  result: KasplexToken[];
}

interface ProcessedToken {
  ticker: string;
  name: string;
  maxSupply: number;
  mintedSupply: number;
  burnedSupply: number;
  circulatingSupply: number;
  decimals: number;
  state: string;
  deployAddress: string;
  contractAddress?: string;
  deployedAt: number;
  percentMinted: number;
}

const KASPLEX_API_BASE = "https://api.kasplex.org/v1";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = searchParams.get("offset") || "";

    // Fetch from Kasplex API
    let url = `${KASPLEX_API_BASE}/krc20/tokenlist`;
    if (offset) {
      url += `?next=${offset}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Kasplex API error: ${response.status}`);
    }

    const data: KasplexResponse = await response.json();

    if (data.message !== "successful") {
      throw new Error("Kasplex API returned unsuccessful response");
    }

    // Process and normalize token data
    const processedTokens: ProcessedToken[] = data.result
      .slice(0, limit)
      .map((token: KasplexToken) => {
        const ticker = token.tick || token.ca || token.name || "UNKNOWN";
        const name = token.name || ticker;
        const decimals = parseInt(token.dec) || 8;
        const maxSupply = parseFloat(token.max) / Math.pow(10, decimals);
        const mintedSupply = parseFloat(token.minted) / Math.pow(10, decimals);
        const burnedSupply = parseFloat(token.burned) / Math.pow(10, decimals);
        const circulatingSupply = mintedSupply - burnedSupply;
        const percentMinted = maxSupply > 0 ? (mintedSupply / maxSupply) * 100 : 100;

        return {
          ticker,
          name,
          maxSupply,
          mintedSupply,
          burnedSupply,
          circulatingSupply,
          decimals,
          state: token.state,
          deployAddress: token.to,
          contractAddress: token.ca,
          deployedAt: parseInt(token.mtsAdd),
          percentMinted,
        };
      });

    // Calculate statistics
    const totalTokens = data.result.length;
    const finishedTokens = processedTokens.filter(t => t.state === "finished").length;
    const activeTokens = processedTokens.filter(t => t.state === "deployed").length;

    return NextResponse.json({
      success: true,
      data: {
        tokens: processedTokens,
        pagination: {
          total: totalTokens,
          limit,
          next: data.next,
          prev: data.prev,
        },
        statistics: {
          total: totalTokens,
          finished: finishedTokens,
          active: activeTokens,
        },
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Error fetching KRC20 tokens:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch KRC20 token list",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
