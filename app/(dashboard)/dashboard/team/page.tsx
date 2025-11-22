// v1.0.14 - Team & Info Dashboard
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function TeamInfoDashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/images/Team-Banner.png"
          alt="KASPA-NEXUS Team & Info"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 dark:from-brand-primary/5 dark:to-brand-accent/5">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">🎯</span>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              KASPA-NEXUS was born from a simple observation: the KRC-20 ecosystem needed a centralized,
              transparent platform that puts the community first.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We&apos;re building the go-to platform for tracking all 156+ KRC-20 tokens, providing AI-powered
              trading signals, and fostering a vibrant community of KASPA enthusiasts.
            </p>
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <p className="font-bold text-neutral-900 dark:text-white mb-2">Our Core Values:</p>
              <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>100% Transparency - No hidden agendas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Community First - Your feedback shapes our roadmap</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Fair Pricing - No scams, no pump & dump schemes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Open Communication - Direct access to the team</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-magenta-500/10 to-brand-purple/10 dark:from-magenta-500/5 dark:to-brand-purple/5">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">💡</span>
              <CardTitle className="text-2xl">Why KASPA-NEXUS?</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Before KASPA-NEXUS, there was no unified platform to track the entire KRC-20 ecosystem.
              Investors had to juggle multiple tools, Discord servers, and unreliable data sources.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We changed that by creating a one-stop platform with:
            </p>
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-warning">⭐</span>
                <span><strong>Real-time data</strong> for all 156+ KRC-20 tokens</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">⭐</span>
                <span><strong>AI Trading Signals</strong> with 87%+ win rate (Pro)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">⭐</span>
                <span><strong>Portfolio Generator</strong> powered by dual-AI validation (Pro)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">⭐</span>
                <span><strong>Community Chat</strong> integrated directly into the platform</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">⭐</span>
                <span><strong>Transparent analytics</strong> - no fake metrics or manipulated data</span>
              </li>
            </ul>
            <div className="pt-4">
              <Badge variant="pro" size="lg" className="mb-2">Community Driven</Badge>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Every feature we build is shaped by community feedback. Join our Discord to have your say!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Founder Story */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">👨‍💻</span>
            <CardTitle className="text-2xl">Founder Story</CardTitle>
          </div>
          <CardDescription>Building KASPA-NEXUS from passion and necessity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Hi, I&apos;m the founder of KASPA-NEXUS. I started this project in late 2024 after getting frustrated
            with the fragmented state of KRC-20 ecosystem tracking. As a KASPA investor and developer, I saw
            a clear need for a unified, transparent platform.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            What started as a personal tool quickly evolved into a full-fledged platform serving thousands
            of community members. The response has been incredible, and it motivates me every day to keep
            building and improving.
          </p>
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
            <p className="font-bold text-neutral-900 dark:text-white mb-2">My Promise to the Community:</p>
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-brand-primary text-xl">→</span>
                <span>I&apos;ll always be transparent about our roadmap, challenges, and decisions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-primary text-xl">→</span>
                <span>I&apos;ll never sell your data or engage in shady practices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-primary text-xl">→</span>
                <span>I&apos;ll listen to community feedback and adapt the platform accordingly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-primary text-xl">→</span>
                <span>I&apos;ll keep pricing fair and accessible - no $200/month subscription scams</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Team Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">👥</span>
            <CardTitle className="text-2xl">Our Team</CardTitle>
          </div>
          <CardDescription>Growing from solo founder to a dedicated team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-warning/10 dark:bg-warning/5 rounded-lg p-6 mb-6 border border-warning/30">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🚀</span>
              <h3 className="font-bold text-neutral-900 dark:text-white text-lg">We&apos;re Growing!</h3>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              KASPA-NEXUS started as a solo project, but we&apos;re actively building a team to scale and
              serve the community better. Our goal: <strong>3-person core team by Q2 2025</strong>.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge variant="default" size="sm">Current</Badge>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Founder & Lead Developer</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Full-stack development, AI integration, platform architecture
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="warning" size="sm">Hiring</Badge>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Community Manager</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Discord moderation, content creation, user engagement
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="warning" size="sm">Hiring</Badge>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Data Analyst / AI Specialist</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Signal validation, portfolio optimization, market analytics
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Interested in joining the team? Reach out via Discord!
            </p>
            <Button variant="primary" size="lg">
              Join Our Discord
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sponsors Section */}
      <Card className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🤝</span>
            <CardTitle className="text-2xl">Sponsors & Partners</CardTitle>
          </div>
          <CardDescription>Building strategic partnerships in the KASPA ecosystem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 mb-6 border-2 border-dashed border-neutral-300 dark:border-neutral-600">
            <div className="text-center">
              <span className="text-5xl mb-4 block">🌟</span>
              <h3 className="font-bold text-neutral-900 dark:text-white text-xl mb-3">
                Become a Founding Partner
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 mb-4 max-w-2xl mx-auto">
                We&apos;re looking for <strong>3-5 strategic partners</strong> to help scale KASPA-NEXUS and
                bring more value to the KRC-20 ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                <h4 className="font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="text-success">✓</span>
                  What We Offer Partners
                </h4>
                <ul className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                  <li>• Logo placement on all dashboards</li>
                  <li>• Dedicated partner page & blog post</li>
                  <li>• Priority API access (when available)</li>
                  <li>• Co-marketing opportunities</li>
                  <li>• Direct input on product roadmap</li>
                </ul>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                <h4 className="font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="text-warning">⭐</span>
                  Ideal Partner Profile
                </h4>
                <ul className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                  <li>• KRC-20 project or KASPA infrastructure</li>
                  <li>• DEX, DeFi, or trading platform</li>
                  <li>• Data provider or analytics service</li>
                  <li>• Community-driven organization</li>
                  <li>• Aligned values: transparency & fairness</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-6">
              <Button variant="primary" size="lg" className="bg-gradient-to-r from-brand-primary to-brand-accent">
                <span className="mr-2">💼</span>
                Become a Partner
              </Button>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
                Limited to 3-5 founding partners. First come, first served.
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
              <strong>Current Partnerships:</strong> None yet - be the first! 🚀
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact & Community */}
      <Card className="bg-gradient-to-r from-brand-primary/10 to-magenta-500/10 dark:from-brand-primary/5 dark:to-magenta-500/5">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Get in Touch</CardTitle>
          <CardDescription className="text-center">Join our community or reach out directly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-lg">
              <span className="text-4xl mb-3 block">💬</span>
              <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Discord</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Join our active community
              </p>
              <Button variant="outline" size="sm" fullWidth>
                Join Discord
              </Button>
            </div>

            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-lg">
              <span className="text-4xl mb-3 block">📧</span>
              <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Email</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Direct line to the founder
              </p>
              <Button variant="outline" size="sm" fullWidth>
                Send Email
              </Button>
            </div>

            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-lg">
              <span className="text-4xl mb-3 block">🐦</span>
              <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Twitter / X</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Follow for updates
              </p>
              <Button variant="outline" size="sm" fullWidth>
                Follow Us
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center bg-warning/10 dark:bg-warning/5 rounded-lg p-6 border border-warning/30">
            <p className="font-bold text-neutral-900 dark:text-white mb-2">
              🎯 Open Communication Promise
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              We respond to <strong>every message</strong> within 24 hours. No automated responses,
              no outsourced support - direct access to the team that builds KASPA-NEXUS.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
