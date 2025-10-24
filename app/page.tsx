import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
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
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
