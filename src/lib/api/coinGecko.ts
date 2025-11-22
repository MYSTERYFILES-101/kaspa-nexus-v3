// v1.0.2 - CoinGecko API Service for KASPA Data

const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;
// Use Pro API endpoint if API key is present (Pro keys start with "CG-")
const COINGECKO_API_BASE = COINGECKO_API_KEY && COINGECKO_API_KEY.startsWith("CG-")
  ? "https://pro-api.coingecko.com/api/v3"
  : "https://api.coingecko.com/api/v3";

export interface CoinGeckoMarketData {
  current_price: {
    usd: number;
  };
  market_cap: {
    usd: number;
  };
  total_volume: {
    usd: number;
  };
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: {
    usd: number;
  };
  atl: {
    usd: number;
  };
}

export interface CoinGeckoData {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: CoinGeckoMarketData;
  community_data: {
    twitter_followers: number;
    telegram_channel_user_count: number;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    telegram_channel_identifier: string;
  };
  description: {
    en: string;
  };
}

/**
 * Fetch Kaspa coin data from CoinGecko
 */
export async function getKaspaData(): Promise<CoinGeckoData | null> {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };

    if (COINGECKO_API_KEY) {
      // Use Pro API header for keys starting with "CG-"
      const headerName = COINGECKO_API_KEY.startsWith("CG-")
        ? "x-cg-pro-api-key"
        : "x-cg-demo-api-key";
      headers[headerName] = COINGECKO_API_KEY;
    }

    const url = `${COINGECKO_API_BASE}/coins/kaspa?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`;

    console.log('[CoinGecko] Fetching Kaspa data from:', url);
    console.log('[CoinGecko] API Key present:', !!COINGECKO_API_KEY);

    const response = await fetch(url, {
      headers,
      cache: 'no-store',
    });

    console.log('[CoinGecko] Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch Kaspa data: ${response.status} ${response.statusText}`);
      console.error('[CoinGecko] Error response:', errorText);
      return null;
    }

    const data: CoinGeckoData = await response.json();
    console.log('[CoinGecko] Successfully fetched Kaspa data');
    return data;
  } catch (error) {
    console.error("Error fetching Kaspa data from CoinGecko:", error);
    return null;
  }
}

/**
 * Fetch simple price data for Kaspa
 */
export async function getKaspaPrice(): Promise<{ usd: number; usd_24h_change: number } | null> {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };

    if (COINGECKO_API_KEY) {
      // Use Pro API header for keys starting with "CG-"
      const headerName = COINGECKO_API_KEY.startsWith("CG-")
        ? "x-cg-pro-api-key"
        : "x-cg-demo-api-key";
      headers[headerName] = COINGECKO_API_KEY;
    }

    const url = `${COINGECKO_API_BASE}/simple/price?ids=kaspa&vs_currencies=usd&include_24hr_change=true`;

    const response = await fetch(url, {
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch Kaspa price: ${response.status} ${response.statusText}`);
      console.error('[CoinGecko Price] Error response:', errorText);
      return null;
    }

    const data = await response.json();

    if (!data.kaspa) {
      return null;
    }

    return {
      usd: data.kaspa.usd,
      usd_24h_change: data.kaspa.usd_24h_change || 0,
    };
  } catch (error) {
    console.error("Error fetching Kaspa price from CoinGecko:", error);
    return null;
  }
}
