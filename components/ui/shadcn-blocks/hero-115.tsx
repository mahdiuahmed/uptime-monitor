import { Wifi, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Hero115Props {
  icon?: React.ReactNode;
  heading?: string;
  description?: string;
  button?: {
    text: string;
    icon?: React.ReactNode;
    url: string;
  };
  trustText?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const Hero115 = ({
  icon = <Wifi className="size-6" />,
  heading = "Blocks built with Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  button = {
    text: "Discover Features",
    icon: <Zap className="ml-2 size-4" />,
    url: "https://www.shadcnblocks.com",
  },
  trustText = "Trusted by 25.000+ Businesses Worldwide",
  imageSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  imageAlt = "placeholder",
}: Hero115Props) => {
  return (
    <section className="overflow-hidden py-32">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <div className="absolute inset-0 -z-10 left-0 right-0 p-40 rounded-full bg-radial from-background to-transparent blur-lg" />
            {/* <div
              style={{
                transform: "translate(-50%, -50%)",
              }}
              className="absolute left-1/2 top-1/2 -z-10 mx-auto size-[800px] rounded-full border p-16 [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] md:size-[1300px] md:p-32"
            >
              <div className="size-full rounded-full border p-16 md:p-32">
                <div className="size-full rounded-full border"></div>
              </div>
            </div> */}
            <span className="mx-auto flex size-16 items-center justify-center rounded-full border border-primary md:size-20">
              {icon}
            </span>
            <h1 className="mx-auto max-w-5xl text-balance text-center text-3xl font-bold md:text-6xl">
              {heading}
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-center md:text-lg">
              {description}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pb-12 pt-3">
              <Button size="lg" asChild>
                <Link href={button.url}>
                  {button.text} {button.icon}
                </Link>
              </Button>
              {trustText && (
                <div className="text-muted-foreground text-xs">{trustText}</div>
              )}
            </div>
          </div>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={0}
            height={0}
            sizes="100vw"
            className="hue-rotate-[300deg] mx-auto h-full max-h-[524px] w-full max-w-5xl rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero115 };
