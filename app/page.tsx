// v1.0.2 - Homepage with Design System
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-kaspa">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/logos/Kaspa-Nexus-logo.png"
              alt="KASPA-NEXUS Logo"
              width={200}
              height={200}
              className="drop-shadow-2xl"
              priority
            />
          </div>

          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            KASPA-NEXUS 3.0
          </h1>

          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Next Generation Blockchain Analytics Platform for Kaspa KRC-20 Ecosystem
          </p>

          <div className="flex gap-4 justify-center mb-8">
            <Badge variant="pro" size="lg">Version 1.0.2</Badge>
            <Badge variant="success" size="lg">Development</Badge>
          </div>

          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white hover:text-brand-primary">
              Learn More
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card hover>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                🤖 AI-Powered Signals
              </CardTitle>
              <CardDescription>
                Dual-AI validation with Claude 4.5 Sonnet & Gemini Pro 3
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Badge variant="pro">Pro Feature</Badge>
            </CardContent>
          </Card>

          <Card hover>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                🌐 Complete Ecosystem
              </CardTitle>
              <CardDescription>
                Full KRC-20 token tracking with real-time market data
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Badge variant="success">Free Access</Badge>
            </CardContent>
          </Card>

          <Card hover>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                💼 Smart Portfolio
              </CardTitle>
              <CardDescription>
                AI-generated portfolio recommendations based on risk profile
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Badge variant="pro">Pro Feature</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack Info */}
        <Card className="max-w-4xl mx-auto mt-12" padding="lg">
          <CardHeader className="text-center mb-6">
            <CardTitle>Tech Stack</CardTitle>
            <CardDescription>Built with modern enterprise-grade technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                <div className="font-semibold text-brand-primary">Next.js</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">v15.0.3</div>
              </div>
              <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                <div className="font-semibold text-brand-primary">TypeScript</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">v5.7.2</div>
              </div>
              <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                <div className="font-semibold text-brand-primary">Tailwind CSS</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">v3.4.15</div>
              </div>
              <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                <div className="font-semibold text-brand-primary">Node.js</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">v20.19.5</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Footer */}
        <div className="text-center mt-12 text-white/80">
          <p className="text-sm">
            🚀 Server: Production Ready | 📊 Status: Active Development
          </p>
          <p className="text-xs mt-2">
            Last Updated: November 21, 2025
          </p>
        </div>
      </div>
    </div>
  );
}
