'use client'
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'
import {Headphones} from "lucide-react";
import { useQuery } from 'convex/react';
import { use } from 'react';
import { PodcastDetailPlayer } from '@/components/PodcastDetailPlayer';
import { useUser } from '@clerk/nextjs';
import { Spinner } from "@/components/ui/spinner"
import PodcastCard from '@/components/podcastCard';
import { Separator } from "@/components/ui/separator";

const Podcasts = ({params}:{params:Promise<{ podcastId: Id<'podcasts'> }>}) => {

  const {user} = useUser();
  const { podcastId } = use(params);
  const podcast = useQuery(api.podcasts.getPodcastById,{podcastId})
  const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType,{podcastId})

  
  if (!podcast) return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner className="size-8" />
    </div>
  )


  const isOwner = user?.id === podcast.authorId

  return (
    <section className='flex flex-col gap-8'>
      <header className="flex items-center justify-between">
        <h1 className='font-semibold text-20'>
          Currently Playing
        </h1>
        <figure className='flex gap-3'>
          <Headphones className="size-5" />
          <h2>{podcast?.views}</h2>
        </figure>
      </header>

      <PodcastDetailPlayer
        isOwner={isOwner}
        podcastId={podcastId}
        {...podcast}
      />
  

      <div className='flex flex-col gap-4'>
        <h1 className='font-semibold'>About</h1>
        <p className='text-12 text-gray-400'>{podcast?.podcastDescription}</p>
      </div>

      <div className='flex flex-col gap-4'>
        <h1 className='font-semibold'>Transcripition</h1>
        <p className='text-12 text-gray-400'>{podcast?.voicePrompt}</p>
      </div>

      <div className='flex flex-col gap-4'>
        <h1 className='font-semibold'>Image Prompt</h1>
        <p className='text-12 text-gray-400'>{podcast?.imagePrompt}</p>
        
      </div>
      <Separator className="my-1"/>
      

    <div className='flex flex-col gap-6'>
      <h1 className='font-semibold text-20'>Similar Podcasts</h1>

      {similarPodcasts && similarPodcasts.length > 0 ? (
        <div className='podcast_grid'>
          {similarPodcasts.map((item) => {
            const { _id, podcastTitle, podcastDescription, imageUrl} = item
            return(
              <PodcastCard
                key={_id}
                imgURL={imageUrl!}
                title={podcastTitle}
                description={podcastDescription}
                podcastId={_id}
                className='p-0 hover:bg-transparent w-40'
                />
            )

          })}
        </div>
      ):(
        <div>

        </div>
      )}
   </div>



    </section>

    


  )
}

export default Podcasts
