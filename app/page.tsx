import Navbar from "@/components/navbar";
import { ArrowRight, ChartLine } from "lucide-react";
import Footer from "@/components/footer";
import { FlickeringGrid } from "@/components/ui/shadcn-io/flickering-grid";
import { Hero115 } from "@/components/ui/shadcn-blocks/hero-115";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen relative">
        <FlickeringGrid
          className="absolute inset-0"
          squareSize={8}
          gridGap={6}
          flickerChance={0.3}
          color="oklch(0.5991 0.1318 180.39)"
          maxOpacity={0.15}
        />
        <div className="-mt-16 relative z-10">
          <Hero115
            heading="Monitor Your Websites 24/7"
            description=" Track your site’s uptime with automated checks and a real-time
                dashboard. Stay in control of your online presence – no setup
                headaches."
            trustText=""
            imageSrc="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1335"
            icon={<ChartLine className="size-8 text-primary" />}
            button={{
              text: "Start Monitoring Free",
              url: "/dashboard",
              icon: <ArrowRight className="h-4 w-4" />,
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
