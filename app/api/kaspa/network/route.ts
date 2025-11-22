// v1.0.0 - Kaspa Network Statistics API
import { NextResponse } from "next/server";

/**
 * Kaspa Network Statistics API Endpoint
 *
 * Returns live network data including:
 * - Block height
 * - Network hashrate
 * - Total supply
 * - Circulating supply
 * - Block reward
 * - Difficulty
 * - Network performance metrics
 */

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface NetworkStats {
  blockHeight: number;
  hashrate: number; // in TH/s
  totalSupply: number;
  circulatingSupply: number;
  currentBlockReward: number;
  difficulty: number;
  blockTime: number; // in seconds
  blocksPerDay: number;
  lastUpdated: string;
}

// Kaspa emission schedule constants
const INITIAL_BLOCK_REWARD = 500;
const BLOCKS_PER_MONTH = 2_592_000; // ~30 days * 24 hours * 60 min * 60 sec
const HALVING_INTERVAL = BLOCKS_PER_MONTH * 12; // ~12 months
const CHROMATIC_HALVING_FACTOR = 0.5;
const MAX_SUPPLY = 28_700_000_000; // 28.7 billion KAS

/**
 * Calculate current block reward based on block height
 * Kaspa uses chromatic halving (halvings every ~12 months)
 */
function calculateBlockReward(blockHeight: number): number {
  const halvingsOccurred = Math.floor(blockHeight / HALVING_INTERVAL);
  const currentReward = INITIAL_BLOCK_REWARD * Math.pow(CHROMATIC_HALVING_FACTOR, halvingsOccurred);

  // Minimum block reward is effectively 0 after enough halvings
  return currentReward < 0.00000001 ? 0 : currentReward;
}

/**
 * Calculate total supply based on block height
 * This uses the emission schedule to calculate cumulative supply
 */
function calculateTotalSupply(blockHeight: number): number {
  let totalSupply = 0;
  let currentBlock = 0;
  let halvingCount = 0;

  while (currentBlock < blockHeight) {
    const nextHalvingBlock = (halvingCount + 1) * HALVING_INTERVAL;
    const blocksInThisPeriod = Math.min(nextHalvingBlock, blockHeight) - currentBlock;
    const rewardInThisPeriod = INITIAL_BLOCK_REWARD * Math.pow(CHROMATIC_HALVING_FACTOR, halvingCount);

    totalSupply += blocksInThisPeriod * rewardInThisPeriod;

    currentBlock += blocksInThisPeriod;
    halvingCount++;

    // Safety check to prevent infinite loop
    if (halvingCount > 50 || rewardInThisPeriod < 0.00000001) break;
  }

  return Math.min(totalSupply, MAX_SUPPLY);
}

export async function GET() {
  try {
    // Note: In production, you would fetch this from a real Kaspa node or explorer API
    // For now, we'll use estimated/calculated values based on known parameters

    // Estimated current block height (updates ~1 block per second since genesis)
    // Kaspa genesis was around November 2021
    const genesisTimestamp = new Date("2021-11-07T00:00:00Z").getTime();
    const currentTimestamp = Date.now();
    const secondsSinceGenesis = Math.floor((currentTimestamp - genesisTimestamp) / 1000);
    const estimatedBlockHeight = secondsSinceGenesis; // ~1 block per second

    // Calculate current block reward
    const currentBlockReward = calculateBlockReward(estimatedBlockHeight);

    // Calculate total supply
    const totalSupply = calculateTotalSupply(estimatedBlockHeight);

    // Circulating supply (for Kaspa, it's essentially equal to total supply as there's no lock-up)
    const circulatingSupply = totalSupply;

    // Estimated network metrics
    // Note: These would come from a real API in production
    const networkStats: NetworkStats = {
      blockHeight: estimatedBlockHeight,
      hashrate: 145_000, // Estimated 145 PH/s = 145,000 TH/s (this should come from real API)
      totalSupply: totalSupply,
      circulatingSupply: circulatingSupply,
      currentBlockReward: currentBlockReward,
      difficulty: 5_200_000_000_000, // Estimated (should come from real API)
      blockTime: 1.0, // 1 second average
      blocksPerDay: 86_400, // 24 * 60 * 60
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: networkStats,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Error fetching Kaspa network stats:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch network statistics",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
