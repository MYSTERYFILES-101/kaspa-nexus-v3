// v1.0.1 - Tokens API Route - Fetch all KRC-20 tokens
import { NextResponse } from "next/server";
import { getMultipleTokensMetadata, KNOWN_KRC20_TOKENS } from "@/lib/api/kasFyi";
import { transformKasFyiTokens } from "@/lib/api/transformers";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    // Fetch metadata for all known tokens
    const tokensData = await getMultipleTokensMetadata(KNOWN_KRC20_TOKENS);

    // Transform to our token format
    const tokens = transformKasFyiTokens(tokensData);

    // Sort by market cap descending
    tokens.sort((a, b) => b.marketCap - a.marketCap);

    return NextResponse.json({
      success: true,
      count: tokens.length,
      data: tokens,
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
