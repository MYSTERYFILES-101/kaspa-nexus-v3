// v1.0.12 - Signal Dashboard - PRO Teaser Page mit Banner
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function SignalDashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/images/Signal-Banner.png"
          alt="AI Trading Signals"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* What are AI Trading Signals? */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">What are AI Trading Signals?</CardTitle>
          <CardDescription>Professional trading insights powered by artificial intelligence</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Our AI Trading Signals analyze the KRC-20 market 24/7 using advanced algorithms.
            Each signal includes entry price, take profit levels (5 stages), trailing stop loss,
            and a confidence score. Signals are only created when <strong>both AI models agree</strong>,
            ensuring highest quality.
          </p>
        </CardContent>
      </Card>

      {/* Dual-AI Validation System */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 dark:from-brand-primary/5 dark:to-brand-accent/5 border-brand-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <span className="text-3xl">🤖</span>
              How Dual-AI Validation Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-primary/20 rounded-lg flex items-center justify-center font-bold text-brand-primary">
                1
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Market Monitoring</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Continuous tracking of 5 KRC-20 tokens with real-time price analysis
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-primary/20 rounded-lg flex items-center justify-center font-bold text-brand-primary">
                2
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">First AI Analysis</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Primary AI model analyzes market conditions and generates initial signal
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-primary/20 rounded-lg flex items-center justify-center font-bold text-brand-primary">
                3
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Second AI Validation</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Secondary AI independently analyzes the same data
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center font-bold text-success">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Signal Published</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Only when both models agree, the signal is published to Pro users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-brand-purple/10 to-magenta-500/10 dark:from-brand-purple/5 dark:to-magenta-500/5 border-magenta-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <span className="text-3xl">📊</span>
              Signal Performance Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Win Rate</span>
                <span className="text-2xl font-bold text-success">87.3%</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3">
                <div className="bg-success h-3 rounded-full" style={{width: '87.3%'}}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Avg Profit per Signal</span>
                <span className="text-2xl font-bold text-brand-primary">+12.4%</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Signals (30 days)</span>
                <span className="text-2xl font-bold text-neutral-900 dark:text-white">156</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Active Signals</span>
                <span className="text-2xl font-bold text-info">42</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Signal Example (Demo) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Example Signal</CardTitle>
          <CardDescription>See what Pro users receive</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-brand-primary/30 rounded-xl p-6 bg-gradient-to-br from-brand-primary/5 to-transparent">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">NACHO/USDT</h3>
                <Badge variant="success" size="lg">BUY SIGNAL</Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Confidence</p>
                <p className="text-3xl font-bold text-brand-primary">89%</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Entry Price</p>
                <p className="text-lg font-bold text-neutral-900 dark:text-white">$0.0042</p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Stop Loss</p>
                <p className="text-lg font-bold text-error">$0.0038</p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Take Profit 1</p>
                <p className="text-lg font-bold text-success">$0.0046</p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Take Profit 5</p>
                <p className="text-lg font-bold text-success">$0.0062</p>
              </div>
            </div>

            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 blur-sm">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                <strong>AI Analysis:</strong> Strong bullish momentum detected. Volume increasing.
                RSI oversold recovery. MACD crossover confirmed...
              </p>
            </div>

            <div className="mt-4 text-center">
              <Badge variant="default">PRO FEATURE - Upgrade to see full analysis</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tracked Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Tracked Metrics</CardTitle>
          <CardDescription>Comprehensive analysis for every signal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="flex gap-3 items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-2xl">📈</div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Price Action</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">Trend Analysis</p>
              </div>
            </div>

            <div className="flex gap-3 items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-2xl">📊</div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Volume</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">24h Trading</p>
              </div>
            </div>

            <div className="flex gap-3 items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-2xl">⚡</div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">RSI</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">Momentum</p>
              </div>
            </div>

            <div className="flex gap-3 items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-2xl">〰️</div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">MACD</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">Crossovers</p>
              </div>
            </div>

            <div className="flex gap-3 items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-2xl">📉</div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Support</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">Resistance</p>
              </div>
            </div>

            <div className="flex gap-3 items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-2xl">🎯</div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Fibonacci</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">Retracements</p>
              </div>
            </div>

            <div className="flex gap-3 items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-2xl">💹</div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Moving Avg</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">EMA/SMA</p>
              </div>
            </div>

            <div className="flex gap-3 items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-2xl">🔔</div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Alerts</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">Real-time</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade CTA */}
      <Card className="bg-gradient-to-r from-brand-primary to-magenta-500 border-0 text-white">
        <CardContent className="pt-8 pb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start winning?</h2>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Join Pro users and get access to AI-validated trading signals with 87%+ win rate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <Button variant="outline" size="lg" className="bg-white text-brand-primary hover:bg-white/90 border-0">
              <span className="text-2xl mr-2">⭐</span>
              Upgrade to Pro - $9.99/month
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 text-white hover:bg-white/20 border-white">
              View Pricing Details
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
