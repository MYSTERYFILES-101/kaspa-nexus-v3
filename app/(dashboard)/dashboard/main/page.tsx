// v1.0.2 - Main Dashboard Page
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function MainDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
          Welcome to KASPA-NEXUS 3.0
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Your gateway to the Kaspa KRC-20 Ecosystem
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hover>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">
                  1,234
                </p>
                <p className="text-xs text-success mt-1">+12.5% from last month</p>
              </div>
              <div className="p-3 bg-brand-light dark:bg-brand-dark/20 rounded-full">
                <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Active Signals
                </p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">
                  42
                </p>
                <p className="text-xs text-info mt-1">5 new today</p>
              </div>
              <div className="p-3 bg-success-light dark:bg-success-dark/20 rounded-full">
                <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Win Rate
                </p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">
                  87.3%
                </p>
                <p className="text-xs text-success mt-1">Above target</p>
              </div>
              <div className="p-3 bg-warning-light dark:bg-warning-dark/20 rounded-full">
                <svg className="w-6 h-6 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  KRC-20 Tokens
                </p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">
                  156
                </p>
                <p className="text-xs text-info mt-1">Tracked live</p>
              </div>
              <div className="p-3 bg-info-light dark:bg-info-dark/20 rounded-full">
                <svg className="w-6 h-6 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Signals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Latest Signals</CardTitle>
                <CardDescription>AI-generated trading signals</CardDescription>
              </div>
              <Badge variant="pro">PRO</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { coin: "KAS", type: "BUY", confidence: 92, time: "2 hours ago" },
                { coin: "NACHO", type: "SELL", confidence: 88, time: "5 hours ago" },
                { coin: "ZEAL", type: "BUY", confidence: 85, time: "1 day ago" },
              ].map((signal, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${signal.type === 'BUY' ? 'bg-success-light text-success-dark' : 'bg-error-light text-error-dark'}`}>
                      {signal.coin}
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white">
                        {signal.type}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {signal.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {signal.confidence}%
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      Confidence
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" fullWidth className="mt-4">
              View All Signals
            </Button>
          </CardContent>
        </Card>

        {/* Platform News */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Updates</CardTitle>
            <CardDescription>Latest news and announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3 p-4 bg-brand-light dark:bg-brand-dark/20 rounded-lg">
                <div className="flex-shrink-0 w-2 bg-brand-primary rounded-full" />
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white mb-1">
                    New AI Model Integration
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Claude 4.5 Sonnet and Gemini Pro 3 are now live for dual-AI validation
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
                    Today at 10:30 AM
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 bg-success-light/20 dark:bg-success-dark/10 rounded-lg">
                <div className="flex-shrink-0 w-2 bg-success rounded-full" />
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white mb-1">
                    Portfolio Generator Beta
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Pro users can now access the AI-powered portfolio generator
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
                    Yesterday at 2:15 PM
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 bg-info-light/20 dark:bg-info-dark/10 rounded-lg">
                <div className="flex-shrink-0 w-2 bg-info rounded-full" />
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white mb-1">
                    New KRC-20 Tokens Added
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    15 new tokens are now tracked in the ecosystem
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
                    2 days ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with these features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="primary" size="lg" fullWidth>
              <span className="text-xl mr-2">🤖</span>
              View AI Signals
            </Button>
            <Button variant="secondary" size="lg" fullWidth>
              <span className="text-xl mr-2">💼</span>
              Generate Portfolio
            </Button>
            <Button variant="outline" size="lg" fullWidth>
              <span className="text-xl mr-2">🪙</span>
              Browse Tokens
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
