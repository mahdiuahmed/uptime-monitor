import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      <main className=" ">
        <section className="flex flex-1 justify-center min-h-screen -mt-16 items-center">
          <div className=" max-w-4xl text-center">
            <Badge variant="secondary" className="mb-8 gap-2">
              <Zap className="h-3 w-3" />
              Real-time monitoring
            </Badge>

            <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Monitor Your Websites <span className="text-primary">24/7</span>
            </h1>

            <p className="mb-12 text-lg text-muted-foreground sm:text-xl lg:text-2xl">
              Track your websites with precision. Get instant alerts, detailed
              analytics, and peace of mind knowing your digital presence is
              always monitored.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
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
      </main>
    </>
  );
}
