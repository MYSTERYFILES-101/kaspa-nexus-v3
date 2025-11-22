// v1.0.1 - Kaspa API Route - Fetch KASPA data from CoinGecko
import { NextResponse } from "next/server";
import { getKaspaData, getKaspaPrice } from "@/lib/api/coinGecko";

export const dynamic = "force-dynamic";
export const revalidate = 30; // Revalidate every 30 seconds

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const priceOnly = searchParams.get("priceOnly") === "true";

    if (priceOnly) {
      // Fetch only price data (faster)
      const priceData = await getKaspaPrice();

      if (!priceData) {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to fetch Kaspa price",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          price: priceData.usd,
          priceChange24h: priceData.usd_24h_change,
        },
        timestamp: new Date().toISOString(),
      });
    }

    // Fetch full Kaspa data
    const kaspaData = await getKaspaData();

    if (!kaspaData) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch Kaspa data",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: kaspaData.id,
        symbol: kaspaData.symbol,
        name: kaspaData.name,
        image: kaspaData.image,
        price: kaspaData.market_data.current_price.usd,
        priceChange24h: kaspaData.market_data.price_change_percentage_24h,
        priceChange7d: kaspaData.market_data.price_change_percentage_7d,
        priceChange30d: kaspaData.market_data.price_change_percentage_30d,
        marketCap: kaspaData.market_data.market_cap.usd,
        volume24h: kaspaData.market_data.total_volume.usd,
        circulatingSupply: kaspaData.market_data.circulating_supply,
        totalSupply: kaspaData.market_data.total_supply,
        maxSupply: kaspaData.market_data.max_supply,
        ath: kaspaData.market_data.ath.usd,
        atl: kaspaData.market_data.atl.usd,
        description: kaspaData.description.en,
        links: {
          homepage: kaspaData.links.homepage[0],
          twitter: kaspaData.links.twitter_screen_name
            ? `https://twitter.com/${kaspaData.links.twitter_screen_name}`
            : null,
          telegram: kaspaData.links.telegram_channel_identifier
            ? `https://t.me/${kaspaData.links.telegram_channel_identifier}`
            : null,
        },
        community: {
          twitterFollowers: kaspaData.community_data.twitter_followers,
          telegramUsers: kaspaData.community_data.telegram_channel_user_count,
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching Kaspa data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch Kaspa data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
