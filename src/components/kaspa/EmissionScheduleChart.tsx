// v1.0.0 - Enterprise Kaspa Emission Schedule Chart
"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface EmissionDataPoint {
  year: number;
  month: number;
  blockHeight: number;
  blockReward: number;
  totalSupply: number;
  percentOfMax: number;
  isHalvingPoint: boolean;
}

interface HalvingEvent {
  halvingNumber: number;
  blockHeight: number;
  year: number;
  month: number;
  rewardBefore: number;
  rewardAfter: number;
  reductionPercent: number;
  totalSupply: number;
  percentOfMaxSupply: number;
}

interface CurrentStats {
  blockHeight: number;
  currentBlockReward: number;
  totalSupply: number;
  percentOfMaxSupply: number;
  currentHalvingNumber: number;
  nextHalvingBlock: number;
  blocksUntilNextHalving: number;
  daysUntilNextHalving: number;
}

interface EmissionData {
  emissionSchedule: EmissionDataPoint[];
  halvingEvents: HalvingEvent[];
  currentStats: CurrentStats;
  constants: {
    initialBlockReward: number;
    halvingInterval: number;
    maxSupply: number;
    blocksPerDay: number;
    blocksPerYear: number;
  };
}

interface ApiResponse {
  success: boolean;
  data: EmissionData;
  timestamp: string;
}

export function EmissionScheduleChart() {
  const [data, setData] = useState<EmissionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeChart, setActiveChart] = useState<"reward" | "supply">("reward");

  const fetchEmissionData = async () => {
    try {
      const response = await fetch("/api/kaspa/emission");
      const result: ApiResponse = await response.json();

      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError("Failed to fetch emission data");
      }
    } catch (err) {
      setError("Network error occurred");
      console.error("Error fetching emission data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmissionData();
  }, []);

  const formatNumber = (num: number, decimals: number = 0): string => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const formatSupply = (supply: number): string => {
    if (supply >= 1_000_000_000) {
      return `${(supply / 1_000_000_000).toFixed(2)}B`;
    }
    if (supply >= 1_000_000) {
      return `${(supply / 1_000_000).toFixed(2)}M`;
    }
    return formatNumber(supply, 0);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-neutral-600 dark:text-neutral-400">Loading emission schedule...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              Failed to Load Emission Data
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">{error}</p>
            <button
              onClick={fetchEmissionData}
              className="px-4 py-2 bg-brand-primary hover:bg-brand-accent text-white rounded-lg font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Prepare chart data (sample every 3 months for better performance)
  const chartData = data.emissionSchedule
    .filter((_, index) => index % 3 === 0)
    .map((point) => ({
      year: point.year + point.month / 12,
      blockReward: point.blockReward,
      totalSupply: point.totalSupply / 1_000_000_000, // Convert to billions
      percentOfMax: point.percentOfMax,
      isHalvingPoint: point.isHalvingPoint,
    }));

  return (
    <div className="space-y-6">
      {/* Current Stats Header */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 dark:from-brand-primary/20 dark:to-brand-accent/20 px-6 py-4 border-b-2 border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="text-2xl">📉</span>
                Emission Schedule
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Kaspa chromatic halving schedule and supply projections
              </p>
            </div>
          </div>
        </div>

        {/* Current Stats Grid */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 dark:from-brand-primary/10 dark:to-brand-accent/10 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                Current Halving
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                #{data.currentStats.currentHalvingNumber}
              </p>
            </div>

            <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 dark:from-brand-primary/10 dark:to-brand-accent/10 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                Next Halving
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {data.currentStats.daysUntilNextHalving} days
              </p>
            </div>

            <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 dark:from-brand-primary/10 dark:to-brand-accent/10 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                Supply Progress
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {data.currentStats.percentOfMaxSupply.toFixed(2)}%
              </p>
            </div>

            <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 dark:from-brand-primary/10 dark:to-brand-accent/10 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                Blocks to Halving
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {formatNumber(data.currentStats.blocksUntilNextHalving)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Tabs */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="flex border-b-2 border-neutral-200 dark:border-neutral-700">
          <button
            onClick={() => setActiveChart("reward")}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeChart === "reward"
                ? "bg-brand-primary text-white"
                : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700"
            }`}
          >
            Block Reward Decay
          </button>
          <button
            onClick={() => setActiveChart("supply")}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeChart === "supply"
                ? "bg-brand-primary text-white"
                : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700"
            }`}
          >
            Supply Growth Curve
          </button>
        </div>

        <div className="p-6">
          {activeChart === "reward" ? (
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                Block Reward Over Time (KAS per Block)
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.3} />
                  <XAxis
                    dataKey="year"
                    label={{ value: "Years from Genesis", position: "insideBottom", offset: -5 }}
                    stroke="#888"
                  />
                  <YAxis
                    label={{ value: "Block Reward (KAS)", angle: -90, position: "insideLeft" }}
                    stroke="#888"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                    formatter={(value: number) => [value.toFixed(2) + " KAS", "Block Reward"]}
                  />
                  <Legend />
                  <Line
                    type="stepAfter"
                    dataKey="blockReward"
                    stroke="#70FFE9"
                    strokeWidth={2}
                    dot={false}
                    name="Block Reward"
                  />
                  {data.halvingEvents.map((halving, index) => (
                    <ReferenceLine
                      key={index}
                      x={halving.year + halving.month / 12}
                      stroke="#FF6B9D"
                      strokeDasharray="3 3"
                      label={{
                        value: `H${halving.halvingNumber}`,
                        position: "top",
                        fill: "#FF6B9D",
                      }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                Total Supply Growth (Billions of KAS)
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.3} />
                  <XAxis
                    dataKey="year"
                    label={{ value: "Years from Genesis", position: "insideBottom", offset: -5 }}
                    stroke="#888"
                  />
                  <YAxis
                    label={{ value: "Supply (Billions)", angle: -90, position: "insideLeft" }}
                    stroke="#888"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                    formatter={(value: number) => [
                      value.toFixed(2) + "B KAS",
                      "Total Supply",
                    ]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalSupply"
                    stroke="#70FFE9"
                    strokeWidth={2}
                    dot={false}
                    name="Total Supply"
                  />
                  <ReferenceLine
                    y={28.7}
                    stroke="#FF6B9D"
                    strokeDasharray="3 3"
                    label={{ value: "Max Supply (28.7B)", position: "right", fill: "#FF6B9D" }}
                  />
                  {data.halvingEvents.map((halving, index) => (
                    <ReferenceLine
                      key={index}
                      x={halving.year + halving.month / 12}
                      stroke="#888"
                      strokeDasharray="3 3"
                      opacity={0.3}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Halving Events Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 dark:from-brand-primary/20 dark:to-brand-accent/20 px-6 py-4 border-b-2 border-neutral-200 dark:border-neutral-700">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
            Halving Events Schedule
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Chromatic halvings occur every 12 months
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-900 border-b-2 border-neutral-200 dark:border-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                  Halving #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                  Block Height
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                  Reward Before
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                  Reward After
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                  Supply at Halving
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {data.halvingEvents.slice(0, 10).map((halving) => (
                <tr
                  key={halving.halvingNumber}
                  className={
                    halving.halvingNumber === data.currentStats.currentHalvingNumber + 1
                      ? "bg-brand-primary/10 dark:bg-brand-primary/20"
                      : ""
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-white">
                    #{halving.halvingNumber}
                    {halving.halvingNumber === data.currentStats.currentHalvingNumber + 1 && (
                      <span className="ml-2 text-xs bg-brand-primary text-white px-2 py-0.5 rounded">
                        Next
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                    Year {halving.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                    {formatNumber(halving.blockHeight)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                    {halving.rewardBefore.toFixed(2)} KAS
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                    {halving.rewardAfter.toFixed(2)} KAS
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                    {formatSupply(halving.totalSupply)} ({halving.percentOfMaxSupply.toFixed(1)}%)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
