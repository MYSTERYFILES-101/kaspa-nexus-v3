// v1.0.13 - Account & Shop Dashboard
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function AccountShopDashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/images/Account-Banner.png"
          alt="KASPA-NEXUS Account & Shop"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Free vs Pro Comparison */}
      <div>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="border-2 border-neutral-300 dark:border-neutral-700">
            <CardHeader className="text-center pb-8">
              <Badge variant="default" size="lg" className="mx-auto mb-4">FREE</Badge>
              <CardTitle className="text-3xl mb-2">Free Tier</CardTitle>
              <div className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">$0</div>
              <CardDescription>Perfect for getting started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">Ecosystem Overview</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">All 156 KRC-20 tokens tracked</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">Market Data</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Real-time prices & charts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">Community Chat</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Access to all chat rooms</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">Watchlist Feature</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Track your favorite tokens</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="lg" fullWidth className="mt-6">
                Current Plan
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-warning relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-warning text-white px-6 py-1 text-sm font-bold transform rotate-45 translate-x-8 translate-y-6">
              POPULAR
            </div>
            <CardHeader className="text-center pb-8">
              <Badge variant="pro" size="lg" className="mx-auto mb-4">PRO</Badge>
              <CardTitle className="text-3xl mb-2">Pro Tier</CardTitle>
              <div className="text-4xl font-bold text-warning mb-2">$9.99</div>
              <CardDescription>per month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">Everything in Free</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">All free features included</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-warning text-xl">⭐</span>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">AI Trading Signals</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Dual-AI validated, 87%+ win rate</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-warning text-xl">⭐</span>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">Signal Analytics</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Performance tracking & history</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-warning text-xl">⭐</span>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">Portfolio Generator</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">AI-powered portfolio recommendations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-warning text-xl">⭐</span>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">Future Calculator</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Monte Carlo simulations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">Priority Support</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">24/7 dedicated support</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">No Ads</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Ad-free experience</p>
                  </div>
                </div>
              </div>
              <Button variant="primary" size="lg" fullWidth className="mt-6 bg-gradient-to-r from-warning to-brand-secondary">
                <span className="text-xl mr-2">⭐</span>
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why Upgrade to Pro? */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Why Upgrade to Pro?</CardTitle>
          <CardDescription>Real value, fair pricing, no scams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center text-2xl">
                🎯
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">87%+ Win Rate</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Dual-AI validation ensures only the highest quality signals are published
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center text-2xl">
                💰
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">$9.99/Month</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Fair pricing - other platforms charge $50-200/month for similar services
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-info/20 rounded-xl flex items-center justify-center text-2xl">
                🛡️
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">No Scams</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Full transparency, cancel anytime, 30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Codes (Coming Soon) */}
      <Card className="bg-neutral-50 dark:bg-neutral-900 border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🔑</span>
            API Codes
            <Badge variant="default" size="sm">Coming Soon</Badge>
          </CardTitle>
          <CardDescription>Access KASPA-NEXUS data programmatically</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-700 dark:text-neutral-300 mb-4">
            Get API access to all KRC-20 market data, signals, and analytics. Perfect for building
            your own tools and integrations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Starter</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">TBD</p>
              <p className="text-xs text-neutral-500 mt-1">10,000 requests/month</p>
            </div>
            <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Growth</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">TBD</p>
              <p className="text-xs text-neutral-500 mt-1">100,000 requests/month</p>
            </div>
            <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Enterprise</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">Custom</p>
              <p className="text-xs text-neutral-500 mt-1">Unlimited + Support</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Can I cancel anytime?</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Yes! Cancel anytime with one click. No questions asked, no hidden fees.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Is there a money-back guarantee?</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Absolutely. 30-day money-back guarantee if you&apos;re not satisfied.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white mb-2">How does billing work?</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Monthly subscription via Stripe. Automatic renewal, but you can cancel anytime.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Do you offer discounts for annual payment?</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Not yet, but we&apos;re planning to offer annual subscriptions with a discount soon!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
