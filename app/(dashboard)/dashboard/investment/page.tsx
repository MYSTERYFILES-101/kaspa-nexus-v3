// v1.0.12 - Investment Hub Dashboard mit Banner
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function InvestmentDashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/images/Investment-Banner.png"
          alt="Investment Hub"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* What is the Investment Hub? */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">What is the Investment Hub?</CardTitle>
          <CardDescription>Professional portfolio management powered by AI</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            The Investment Hub uses <strong>dual-AI analysis</strong> to create customized portfolios
            based on your investment amount, timeframe, and risk tolerance. Our AI analyzes market data,
            historical performance, and project fundamentals to recommend optimal asset allocation
            across the KRC-20 ecosystem.
          </p>
        </CardContent>
      </Card>

      {/* Tools Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Generator */}
        <Card className="bg-gradient-to-br from-brand-accent/10 to-brand-purple/10 dark:from-brand-accent/5 dark:to-brand-purple/5 border-brand-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <span className="text-3xl">💼</span>
              AI Portfolio Generator
            </CardTitle>
            <CardDescription>Personalized portfolio recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-neutral-700 dark:text-neutral-300">
              Create a custom portfolio in 3 simple steps:
            </p>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-accent/20 rounded-lg flex items-center justify-center font-bold text-brand-accent">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Set Parameters</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Investment amount, timeframe (months/years), and risk level (1-10)
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-accent/20 rounded-lg flex items-center justify-center font-bold text-brand-accent">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-white mb-1">AI Analysis</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Both AI models analyze market data and create portfolio suggestions
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center font-bold text-success">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Get Portfolio</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Receive asset allocation, rebalancing strategy, and risk assessment
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button variant="primary" size="lg" fullWidth disabled>
                <span className="text-xl mr-2">💼</span>
                Generate Portfolio (PRO)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Future Calculator */}
        <Card className="bg-gradient-to-br from-magenta-500/10 to-brand-primary/10 dark:from-magenta-500/5 dark:to-brand-primary/5 border-magenta-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <span className="text-3xl">🧮</span>
              Future Value Calculator
            </CardTitle>
            <CardDescription>Project potential returns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-neutral-700 dark:text-neutral-300">
              Calculate potential future value using:
            </p>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Monte Carlo Simulation</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    1000+ scenarios based on historical volatility
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-2xl">📈</div>
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Historical Analysis</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Based on past performance and market cycles
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Best/Worst Case</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    See optimistic, realistic, and pessimistic scenarios
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button variant="secondary" size="lg" fullWidth disabled>
                <span className="text-xl mr-2">🧮</span>
                Calculate Future Value (PRO)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Example Portfolio */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Example Portfolio</CardTitle>
          <CardDescription>$10,000 investment • 12 months • Risk Level 5</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-brand-accent/30 rounded-xl p-6 bg-gradient-to-br from-brand-accent/5 to-transparent">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">Asset Allocation</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-neutral-900 dark:text-white">KAS (Kaspa)</span>
                    <span className="font-bold text-brand-primary">40% - $4,000</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-brand-primary h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-neutral-900 dark:text-white">NACHO</span>
                    <span className="font-bold text-success">25% - $2,500</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-neutral-900 dark:text-white">ZEAL</span>
                    <span className="font-bold text-warning">20% - $2,000</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{width: '20%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-neutral-900 dark:text-white">KONAN</span>
                    <span className="font-bold text-info">10% - $1,000</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-info h-2 rounded-full" style={{width: '10%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-neutral-900 dark:text-white">Other DeFi</span>
                    <span className="font-bold text-magenta-500">5% - $500</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-magenta-500 h-2 rounded-full" style={{width: '5%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 blur-sm mb-4">
              <h4 className="font-bold text-neutral-900 dark:text-white mb-2">AI Rationale:</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                KAS as the base layer provides stability and long-term growth potential.
                NACHO and ZEAL offer higher growth with moderate risk. KONAN diversifies
                into gaming sector. Small DeFi allocation for yield opportunities...
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-success/10 rounded-lg">
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Expected Return</p>
                <p className="text-xl font-bold text-success blur-sm">+45%</p>
              </div>
              <div className="text-center p-3 bg-warning/10 rounded-lg">
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Risk Score</p>
                <p className="text-xl font-bold text-warning blur-sm">5/10</p>
              </div>
              <div className="text-center p-3 bg-info/10 rounded-lg">
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Confidence</p>
                <p className="text-xl font-bold text-info blur-sm">78%</p>
              </div>
            </div>

            <div className="text-center">
              <Badge variant="default">PRO FEATURE - Upgrade to see full details</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Investment Strategies</CardTitle>
          <CardDescription>Choose the approach that fits your goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-success/10 to-success/5 rounded-xl border border-success/30">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Conservative</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Risk Level 1-3 • Focus on established projects with strong fundamentals
              </p>
              <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
                <li>✓ 70%+ in KAS</li>
                <li>✓ Blue-chip tokens only</li>
                <li>✓ Lower volatility</li>
                <li>✓ Steady growth focus</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-warning/10 to-warning/5 rounded-xl border border-warning/30">
              <div className="text-4xl mb-3">⚖️</div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Balanced</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Risk Level 4-6 • Mix of stability and growth opportunities
              </p>
              <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
                <li>✓ 40-50% in KAS</li>
                <li>✓ Mid-cap diversification</li>
                <li>✓ Moderate risk/reward</li>
                <li>✓ Sector allocation</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-error/10 to-error/5 rounded-xl border border-error/30">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Aggressive</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Risk Level 7-10 • Maximum growth potential with higher volatility
              </p>
              <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
                <li>✓ 20-30% in KAS</li>
                <li>✓ Small/micro cap gems</li>
                <li>✓ High growth focus</li>
                <li>✓ Early-stage projects</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">AI-Powered Risk Assessment</CardTitle>
          <CardDescription>Comprehensive analysis before you invest</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center mb-1">Volatility</p>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">Analysis</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-3xl mb-2">🔍</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center mb-1">Liquidity</p>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">Check</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-3xl mb-2">📈</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center mb-1">Market Cap</p>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">Evaluation</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-3xl mb-2">👥</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center mb-1">Holder</p>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">Distribution</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-3xl mb-2">🏗️</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center mb-1">Project</p>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">Fundamentals</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-3xl mb-2">🌐</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center mb-1">Social</p>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">Sentiment</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-3xl mb-2">⏱️</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center mb-1">Time</p>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">Horizon</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-3xl mb-2">🔄</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center mb-1">Rebalance</p>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">Strategy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade CTA */}
      <Card className="bg-gradient-to-r from-brand-accent to-brand-purple border-0 text-white">
        <CardContent className="pt-8 pb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Build your perfect portfolio</h2>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Let AI create a personalized investment strategy based on your goals and risk tolerance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <Button variant="outline" size="lg" className="bg-white text-brand-accent hover:bg-white/90 border-0">
              <span className="text-2xl mr-2">⭐</span>
              Upgrade to Pro - $9.99/month
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 text-white hover:bg-white/20 border-white">
              View All Pro Features
            </Button>
          </div>
          <p className="text-sm text-white/70">
            30-day money back guarantee • Cancel anytime • No hidden fees
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
