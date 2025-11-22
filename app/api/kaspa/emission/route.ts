// v1.0.0 - Kaspa Emission Schedule API
import { NextResponse } from "next/server";

/**
 * Kaspa Emission Schedule API
 *
 * Returns emission data for visualization:
 * - Block rewards over time
 * - Cumulative supply curve
 * - Halving events
 * - Supply projections
 */

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface EmissionDataPoint {
  year: number;
  month: number;
  blockHeight: number;
  blockReward: number;
  totalSupply: number;
  percentOfMax: number;
  isHalvingPoint: boolean;
}

const INITIAL_BLOCK_REWARD = 500;
const BLOCKS_PER_SECOND = 1;
const BLOCKS_PER_DAY = 86_400;
const BLOCKS_PER_MONTH = 2_592_000;
const BLOCKS_PER_YEAR = 31_536_000;
const HALVING_INTERVAL = BLOCKS_PER_MONTH * 12; // 12 months
const MAX_SUPPLY = 28_700_000_000;
const CHROMATIC_HALVING_FACTOR = 0.5;
const YEARS_TO_PROJECT = 20; // Project 20 years into future

function calculateBlockReward(blockHeight: number): number {
  const halvingsOccurred = Math.floor(blockHeight / HALVING_INTERVAL);
  const currentReward = INITIAL_BLOCK_REWARD * Math.pow(CHROMATIC_HALVING_FACTOR, halvingsOccurred);
  return currentReward < 0.00000001 ? 0 : currentReward;
}

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

    if (halvingCount > 50 || rewardInThisPeriod < 0.00000001) break;
  }

  return Math.min(totalSupply, MAX_SUPPLY);
}

export async function GET() {
  try {
    const emissionSchedule: EmissionDataPoint[] = [];

    // Generate data points for each year
    for (let year = 0; year <= YEARS_TO_PROJECT; year++) {
      // Sample 12 months per year
      for (let month = 0; month < 12; month++) {
        const totalMonths = year * 12 + month;
        const blockHeight = totalMonths * BLOCKS_PER_MONTH;

        const blockReward = calculateBlockReward(blockHeight);
        const totalSupply = calculateTotalSupply(blockHeight);
        const percentOfMax = (totalSupply / MAX_SUPPLY) * 100;

        // Check if this is a halving point
        const isHalvingPoint = blockHeight > 0 && blockHeight % HALVING_INTERVAL === 0;

        emissionSchedule.push({
          year,
          month,
          blockHeight,
          blockReward,
          totalSupply,
          percentOfMax,
          isHalvingPoint,
        });
      }
    }

    // Calculate halving events separately for easy reference
    const halvingEvents = [];
    for (let i = 1; i <= 15; i++) {
      const halvingBlock = i * HALVING_INTERVAL;
      const halvingMonths = Math.floor(halvingBlock / BLOCKS_PER_MONTH);
      const halvingYear = Math.floor(halvingMonths / 12);
      const halvingMonth = halvingMonths % 12;

      const rewardBefore = calculateBlockReward(halvingBlock - 1);
      const rewardAfter = calculateBlockReward(halvingBlock);
      const totalSupplyAtHalving = calculateTotalSupply(halvingBlock);

      if (halvingYear > YEARS_TO_PROJECT) break;

      halvingEvents.push({
        halvingNumber: i,
        blockHeight: halvingBlock,
        year: halvingYear,
        month: halvingMonth,
        rewardBefore,
        rewardAfter,
        reductionPercent: 50,
        totalSupply: totalSupplyAtHalving,
        percentOfMaxSupply: (totalSupplyAtHalving / MAX_SUPPLY) * 100,
      });
    }

    // Calculate current stats
    const genesisTimestamp = new Date("2021-11-07T00:00:00Z").getTime();
    const currentTimestamp = Date.now();
    const secondsSinceGenesis = Math.floor((currentTimestamp - genesisTimestamp) / 1000);
    const currentBlockHeight = secondsSinceGenesis;
    const currentTotalSupply = calculateTotalSupply(currentBlockHeight);
    const currentBlockReward = calculateBlockReward(currentBlockHeight);
    const currentHalvingNumber = Math.floor(currentBlockHeight / HALVING_INTERVAL);
    const nextHalvingBlock = (currentHalvingNumber + 1) * HALVING_INTERVAL;
    const blocksUntilNextHalving = nextHalvingBlock - currentBlockHeight;
    const daysUntilNextHalving = Math.floor(blocksUntilNextHalving / BLOCKS_PER_DAY);

    return NextResponse.json({
      success: true,
      data: {
        emissionSchedule,
        halvingEvents,
        currentStats: {
          blockHeight: currentBlockHeight,
          currentBlockReward,
          totalSupply: currentTotalSupply,
          percentOfMaxSupply: (currentTotalSupply / MAX_SUPPLY) * 100,
          currentHalvingNumber,
          nextHalvingBlock,
          blocksUntilNextHalving,
          daysUntilNextHalving,
        },
        constants: {
          initialBlockReward: INITIAL_BLOCK_REWARD,
          halvingInterval: HALVING_INTERVAL,
          maxSupply: MAX_SUPPLY,
          blocksPerDay: BLOCKS_PER_DAY,
          blocksPerYear: BLOCKS_PER_YEAR,
        },
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Error generating emission schedule:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate emission schedule",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
