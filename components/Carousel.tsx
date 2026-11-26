"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function AutoplayCarousel() {
  const [plugin] = React.useState(() =>
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin]}
      opts={{ loop: true }}
      onMouseEnter={() => plugin.stop()}
      onMouseLeave={() => plugin.reset()}
      className="w-full max-w-xs"
    >
      <CarouselContent>
        {[1, 2, 3, 4, 5].map((n) => (
          <CarouselItem key={n}>
            <div className="flex aspect-square items-center justify-center rounded-lg border text-4xl">
              {n}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}