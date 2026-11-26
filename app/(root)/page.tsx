"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import React from 'react'
import { podcastData } from '../constants'
import PodcastCard from '@/components/podcastCard'
import { Spinner } from "@/components/ui/spinner";


const Home = () => {
  const trendingPodcast = useQuery(api.podcasts.getTrendingPodcasts)

  if (!trendingPodcast ) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner className="size-8" />
    </div>
  )
  }

  return (
    <div>
      <section className="flex flex-col gap-6">
        <h1 className='font-semibold text-20'>Trending</h1>
         <div className="podcast_grid">
          {trendingPodcast?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
            <PodcastCard 
              key={_id}
              imgURL={imageUrl as string}
              title={podcastTitle}
              description={podcastDescription}
              podcastId={_id}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home 
