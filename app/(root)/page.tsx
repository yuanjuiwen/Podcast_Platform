"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import React from 'react'
import { podcastData } from '../constants'
import PodcastCard from '@/components/podcastCard'


const Home = () => {
  // const tasks = useQuery(api.tasks.get);
  return (
    <div>
      <section className="flex flex-col gap-6">
        <h1 className='font-semibold text-20'>Trending</h1>

        <div className="flex min-h-screen flex-col items-center     justify-between p-24">
          {/* {tasks?.map(({ _id, text }) => (
            <div key={_id}>{text}</div>
          ))} */}
        </div>

        <div className='podcast_grid'>
            {podcastData.map((podcast) => {
            const {id, title, description, imgURL} = podcast
            return(
              <PodcastCard
                key={id}
                imgURL={imgURL}
                title={title}
                description={description}
                podcastId={id}
              />
            )
            })}
        </div>
      </section>
    </div>
  )
}

export default Home 
