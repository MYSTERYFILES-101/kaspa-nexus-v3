// v1.0.25 - Coins & Tokens Page with Real API Data (16 per page)
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { TokenCard } from "@/components/tokens/TokenCard";
import type { Token } from "@/types/token";

type SortOption = "marketCap" | "price" | "priceChange24h" | "volume24h" | "name";

const TOKENS_PER_PAGE = 16;

export default function CoinsPage() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("marketCap");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch tokens from API (KRC-20 + KASPA)
  useEffect(() => {
    async function fetchTokens() {
      try {
        setLoading(true);
        setError(null);

        // Fetch both KRC-20 tokens and KASPA in parallel
        const [tokensResponse, kaspaResponse] = await Promise.all([
          fetch("/api/tokens"),
          fetch("/api/kaspa")
        ]);

        if (!tokensResponse.ok) {
          throw new Error(`Failed to fetch tokens: ${tokensResponse.status}`);
        }

        const tokensResult = await tokensResponse.json();

        if (!tokensResult.success) {
          throw new Error(tokensResult.error || "Failed to fetch tokens");
        }

        const krc20Tokens = tokensResult.data || [];

        // Add KASPA if API call succeeded
        let allTokens = [...krc20Tokens];

        if (kaspaResponse.ok) {
          const kaspaResult = await kaspaResponse.json();
          if (kaspaResult.success) {
            // Convert KASPA data to Token format
            const kaspaToken: Token = {
              id: "kaspa",
              ticker: "KAS",
              name: "Kaspa",
              price: kaspaResult.data.price,
              priceChange24h: kaspaResult.data.priceChange24h,
              marketCap: kaspaResult.data.marketCap,
              volume24h: kaspaResult.data.volume24h,
              circulatingSupply: kaspaResult.data.circulatingSupply || 0,
              totalSupply: kaspaResult.data.totalSupply || 0,
              maxSupply: kaspaResult.data.maxSupply || undefined,
              holders: 0, // Not available from CoinGecko
              logo: kaspaResult.data.image?.large || kaspaResult.data.image?.small || "",
              description: kaspaResult.data.description || "The native coin of the Kaspa network",
              category: "native", // Special category for KASPA
              website: kaspaResult.data.links?.homepage?.[0] || "https://kaspa.org",
              twitter: kaspaResult.data.links?.twitter || "",
              telegram: kaspaResult.data.links?.telegram || "",
              listed: new Date("2021-11-07"), // KASPA launch date
            };

            // Add KASPA as first token
            allTokens = [kaspaToken, ...krc20Tokens];
          }
        }

        setTokens(allTokens);
      } catch (err) {
        console.error("Error fetching tokens:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchTokens();
  }, []);

  // Filter and sort tokens
  const filteredAndSortedTokens = useMemo(() => {
    let filtered = tokens;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (token) =>
          token.name.toLowerCase().includes(query) ||
          token.ticker.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "marketCap":
          return b.marketCap - a.marketCap;
        case "price":
          return b.price - a.price;
        case "priceChange24h":
          return b.priceChange24h - a.priceChange24h;
        case "volume24h":
          return b.volume24h - a.volume24h;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [tokens, searchQuery, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedTokens.length / TOKENS_PER_PAGE);
  const startIndex = (currentPage - 1) * TOKENS_PER_PAGE;
  const endIndex = startIndex + TOKENS_PER_PAGE;
  const currentTokens = filteredAndSortedTokens.slice(startIndex, endIndex);

  // Reset to page 1 when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading State
  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Link
            href="/dashboard/main"
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-primary mb-4"></div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              Loading Tokens...
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Fetching real-time data from kas.fyi
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <Link
            href="/dashboard/main"
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 bg-white dark:bg-neutral-800 rounded-lg border-2 border-red-200 dark:border-red-700">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              Failed to Load Tokens
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-brand-primary text-white rounded-lg font-medium hover:bg-brand-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div>
        <Link
          href="/dashboard/main"
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Page Header - mit Container für Abstände */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Coins & Tokens
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Explore {tokens.length} KRC-20 tokens in the KASPA ecosystem
          </p>
        </div>
      </div>

      {/* Stats Overview - mit Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Total Tokens</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
              {tokens.length}
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-800 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Total Market Cap</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
              ${((tokens.reduce((sum, t) => sum + t.marketCap, 0)) / 1e9).toFixed(2)}B
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-800 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">24h Volume</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
              ${((tokens.reduce((sum, t) => sum + t.volume24h, 0)) / 1e6).toFixed(1)}M
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-800 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Showing</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
              {filteredAndSortedTokens.length}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Sort - mit Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search tokens by name or ticker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:border-brand-primary dark:focus:border-brand-primary focus:outline-none transition-colors"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:border-brand-primary dark:focus:border-brand-primary focus:outline-none transition-colors"
            >
              <option value="marketCap">Market Cap</option>
              <option value="price">Price</option>
              <option value="priceChange24h">24h Change</option>
              <option value="volume24h">24h Volume</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tokens Grid */}
      {currentTokens.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentTokens.map((token) => (
              <Link key={token.id} href={`/dashboard/ecosystem/coins/${token.id}`}>
                <TokenCard token={token} />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 bg-white dark:bg-neutral-800 rounded-lg border-2 border-neutral-200 dark:border-neutral-700">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              No tokens found
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Try adjusting your search
            </p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white font-medium hover:border-brand-primary dark:hover:border-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                const showPage =
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1);

                // Show ellipsis
                const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                if (showEllipsisBefore || showEllipsisAfter) {
                  return (
                    <span key={page} className="px-4 py-2 text-neutral-500">
                      ...
                    </span>
                  );
                }

                if (!showPage) return null;

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-brand-primary text-white'
                        : 'bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white hover:border-brand-primary dark:hover:border-brand-primary'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white font-medium hover:border-brand-primary dark:hover:border-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>

          {/* Page Info */}
          <div className="text-center mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedTokens.length)} of {filteredAndSortedTokens.length} tokens
          </div>
        </div>
      )}
    </div>
  );
}
