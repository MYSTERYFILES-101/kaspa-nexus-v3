// v1.0.2 - Single Token API Route - Fetch specific KRC-20 token or KASPA
import { NextResponse } from "next/server";
import { getTokenMetadata } from "@/lib/api/kasFyi";
import { transformKasFyiToken } from "@/lib/api/transformers";
import { getKaspaData } from "@/lib/api/coinGecko";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every 60 seconds

interface RouteParams {
  params: Promise<{
    ticker: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { ticker } = await params;

    if (!ticker) {
      return NextResponse.json(
        {
          success: false,
          error: "Ticker parameter is required",
        },
        { status: 400 }
      );
    }

    // Special handling for KASPA (native coin)
    if (ticker.toUpperCase() === "KAS" || ticker.toUpperCase() === "KASPA") {
      const kaspaData = await getKaspaData();

      if (!kaspaData) {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to fetch KASPA data",
          },
          { status: 500 }
        );
      }

      // Transform to token format
      const kaspaToken = {
        id: "kaspa",
        ticker: "KAS",
        name: "Kaspa",
        price: kaspaData.market_data.current_price.usd,
        priceChange24h: kaspaData.market_data.price_change_percentage_24h,
        marketCap: kaspaData.market_data.market_cap.usd,
        volume24h: kaspaData.market_data.total_volume.usd,
        circulatingSupply: kaspaData.market_data.circulating_supply,
        totalSupply: kaspaData.market_data.total_supply,
        maxSupply: kaspaData.market_data.max_supply,
        logo: kaspaData.image?.large || kaspaData.image?.small || "",
        description: kaspaData.description?.en || "The native coin of the Kaspa network",
        category: "native",
        website: kaspaData.links?.homepage?.[0] || "https://kaspa.org",
        twitter: kaspaData.links?.twitter_screen_name ? `https://twitter.com/${kaspaData.links.twitter_screen_name}` : "",
        telegram: kaspaData.links?.telegram_channel_identifier ? `https://t.me/${kaspaData.links.telegram_channel_identifier}` : "",
        listed: new Date("2021-11-07"),
        holders: 0,
      };

      return NextResponse.json({
        success: true,
        data: kaspaToken,
        timestamp: new Date().toISOString(),
      });
    }

    // Fetch metadata for the specific token
    const metadata = await getTokenMetadata(ticker.toUpperCase());

    if (!metadata) {
      return NextResponse.json(
        {
          success: false,
          error: "Token not found",
          ticker: ticker.toUpperCase(),
        },
        { status: 404 }
      );
    }

    // Transform to our token format
    const token = transformKasFyiToken(metadata);

    return NextResponse.json({
      success: true,
      data: token,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`Error fetching token ${(await params).ticker}:`, error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch token",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
