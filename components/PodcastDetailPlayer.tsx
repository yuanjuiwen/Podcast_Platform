import React from 'react'
import { PodcastDetailPlayerProps } from '@/types'
import Image from 'next/image'
import { useAudio } from '@/app/Provider/AudioProvider'
import {Button} from '@/components/ui/button'
import { Play } from 'lucide-react'




export const PodcastDetailPlayer = ({
    audioUrl,
    podcastTitle,
    author,
    imageUrl,
    podcastId,
    imageStorageId,
    audioStorageId,
    isOwner,
    authorImageUrl,
    authorId,
    }: PodcastDetailPlayerProps) => {


  const { setAudio } = useAudio();

  const handlePlay = () => {
     if (!audioUrl || !imageUrl) return;
    setAudio({
      title:podcastTitle,
      audioUrl,
      imageUrl,
      author,
      podcastId,
    })
  }


  return (
    <div className='flex gap-8'>
        <Image
            src={imageUrl!}
            width={160}
            height={160}
            alt="podcast image"
            className='rounded-md'
        />
        <div className='flex flex-col gap-15'>
           <article className='flex flex-col gap-4'>
            <h1 className='font-bold'>{podcastTitle}</h1>
            <figure className='flex items-center gap-4'>
                <Image
                    src={authorImageUrl}
                    alt='Caster icon'
                    width={25}
                    height={25}
                    className='rounded-full'
                />
                <h2>{author}</h2>
            </figure>
           </article> 

           <Button  className="w-fit bg-lime-400 rounded-lg cursor-pointer hover:bg-lime-300" onClick={handlePlay}>
            <Play className="size-4"/>
            <p>Listen Now</p>
           </Button>
        </div>
    </div>
  )
}
