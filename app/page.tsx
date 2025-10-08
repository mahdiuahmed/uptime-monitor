import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  // BarChart3,
  // Bell,
  // CheckCircle,
  // Clock,
  // Globe,
  // Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";
// import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/footer";
import { FlickeringGrid } from "@/components/ui/shadcn-io/flickering-grid";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="">
        <div className="relative min-h-screen">
          <FlickeringGrid
            className="absolute inset-0"
            squareSize={8}
            gridGap={6}
            flickerChance={0.3}
            color="oklch(0.5991 0.1318 180.39)"
            maxOpacity={0.2}
          />
          <section className="px-8 flex flex-1 justify-center min-h-screen -mt-16 items-center relative z-10">
            <div className="max-w-5xl text-center relative z-10">
              <div className="absolute inset-0 -z-10 left-0 right-0 p-60 rounded-full bg-radial from-background to-transparent blur-lg" />
              <Badge
                variant="secondary"
                className="mb-8 gap-2 inline-flex items-center"
              >
                <Zap className="h-3 w-3" />
                <span>Real-time monitoring</span>
              </Badge>

              <h1 className="mb-4 text-5xl font-bold sm:text-6xl lg:text-7xl">
                Monitor Your Websites <span className="text-primary">24/7</span>
              </h1>

              <p className="mb-12 text-lg text-muted-foreground sm:text-xl lg:text-2xl">
                Track your site’s uptime with automated checks and a real-time
                dashboard. Stay in control of your online presence – no setup
                headaches.
              </p>

              <div className="">
                <Button size="lg" asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    Start Monitoring Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                {/* <Button variant="outline" size="lg" asChild>
                <Link href="/demo">View Live Demo</Link>
              </Button> */}
              </div>
            </div>
          </section>
        </div>

        {/* Features Grid */}
        {/* <section className="px-8 mt-36">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Everything you need to monitor uptime
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Simple, powerful monitoring tools to keep your websites running
                smoothly.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    99.9% Uptime SLA
                  </h3>
                  <p className="text-muted-foreground">
                    Reliable monitoring with industry-leading uptime guarantees
                    for your peace of mind.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Global Monitoring
                  </h3>
                  <p className="text-muted-foreground">
                    Monitor from multiple locations worldwide to ensure accurate
                    uptime data.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Real-time Analytics
                  </h3>
                  <p className="text-muted-foreground">
                    Get detailed insights and performance metrics with beautiful
                    dashboards.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Easy Setup</h3>
                  <p className="text-muted-foreground">
                    Start monitoring in minutes with our simple, no-code setup
                    process.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Frequent Checks
                  </h3>
                  <p className="text-muted-foreground">
                    Monitor your sites every 30 seconds with instant downtime
                    detection.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Smart Alerts</h3>
                  <p className="text-muted-foreground">
                    Get notified instantly via email, SMS, or Slack when issues
                    are detected.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}
      </main>
      <Footer />
    </>
  );
}
