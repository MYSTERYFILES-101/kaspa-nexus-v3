// v1.0.1 - kas.fyi API Service for KRC-20 Tokens

const KAS_FYI_API_BASE = "https://api.kas.fyi/v1";
const KAS_FYI_API_KEY = process.env.KAS_FYI_API_KEY;

export interface KasFyiTokenMetadata {
  ticker: string;
  maxSupply: string;
  mintLimit: string;
  decimal: number;
  totalMinted: string;
  preMint: string;
  opScoreCreated: number;
  opScoreUpdated: number | null;
  deployedAt: string;
  status: string;
  revealHash: string;
  holderTotal: number;
  transferTotal: number;
  mintTotal: number;
  deployerAddress: string;
  socialLinks: Array<{
    type: string;
    url: string;
  }>;
  markets: Array<{
    name: string;
    tradingData: {
      price: {
        usd: number;
      };
      volume: {
        usd: number;
      };
    };
    metadata: {
      name: string;
      iconUrl: string;
      url: string;
      isKrc20Market?: boolean;
    };
    lastUpdated: number;
  }>;
  iconUrl: string;
  burned: string;
}

export interface KasFyiTokenResponse {
  result: KasFyiTokenMetadata;
}

/**
 * Fetch token metadata from kas.fyi API
 */
export async function getTokenMetadata(ticker: string): Promise<KasFyiTokenMetadata | null> {
  try {
    const response = await fetch(
      `${KAS_FYI_API_BASE}/tokens/krc20/${ticker}/metadata`,
      {
        headers: {
          "x-api-key": KAS_FYI_API_KEY || "",
        },
        next: {
          revalidate: 60, // Cache for 60 seconds
        },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch token ${ticker}: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: KasFyiTokenResponse = await response.json();

    if (!data.result) {
      return null;
    }

    return data.result;
  } catch (error) {
    console.error(`Error fetching token ${ticker}:`, error);
    return null;
  }
}

/**
 * Fetch metadata for multiple tokens
 */
export async function getMultipleTokensMetadata(
  tickers: string[]
): Promise<Record<string, KasFyiTokenMetadata>> {
  const results: Record<string, KasFyiTokenMetadata> = {};

  // Fetch all tokens in parallel
  const promises = tickers.map(async (ticker) => {
    const metadata = await getTokenMetadata(ticker);
    if (metadata) {
      results[ticker] = metadata;
    }
  });

  await Promise.all(promises);

  return results;
}

/**
 * List of known KRC-20 tokens to fetch
 * This list will be expanded as more tokens are discovered
 * Only includes tokens confirmed to exist on kas.fyi
 */
export const KNOWN_KRC20_TOKENS = [
  // Top tokens with real Market Cap (from kas.fyi - Nov 22, 2025)
  // Excluded: TBDAI (unrealistic data), KBLDR, VTRM (no market cap)
  "NACHO",      // #1  - $4.6M
  "ZEAL",       // #2  - $3.6M
  "PPKAS",      // #3  - $3.3M
  "KASPY",      // #4  - $1.3M
  "KANGO",      // #5  - $973K
  "KONAN",      // #6  - $635K
  "KASPER",     // #7  - $617K
  "KYRO",       // #32 - $317K
  "KASBTC",     // #8  - $240K
  "GHOAD",      // #9  - $226K
  "WOLFY",      // #24 - $187K
  "SLOW",       // #10 - $180K
  "KROAK",      // #11 - $119K
  "KNIGHT",     // #37 - $103K
  "KEKE",       // #12 - $95K
  "BURT",       // #13 - $83K
  "KREX",       // #14 - $82K
  "KOAK",       // #38 - $66K
  "DOGK",       // #15 - $64K
  "BONKEY",     // #26 - $55K
  "POPKAT",     // #25 - $51K
  "KIRBY",      // #30 - $50K
  "KEIRO",      // #16 - $48K
  "BKONAN",     // #27 - $30K
  "BITE",       // #33 - $25K
  "PACMAN",     // #17 - $17K
  "WADU",       // #29 - $16K
  "FUND",       // #28 - $14K
  "BOMO",       // #18 - $13K
  "STICK",      // #19 - $12K
  "KAPPY",      // #20 - $11K
  "SZAR",       // #21 - $7K
  "BARA",       // #22 - $7K
  "JRRY",       // #31 - $6K
  "WIENER",     // #23 - $4K
  "KASLOT",     // #36 - $3K
  "JUMBO",      // #34 - $2K
  // Additional tokens
  "PEPE",
  "KOMET",
];
