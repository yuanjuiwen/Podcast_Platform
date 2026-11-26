import React from 'react'
import { ProfileCardProps } from '@/types'
import { useAudio } from '@/app/Provider/AudioProvider'
import { useState,useEffect } from 'react'
import { Podcast } from '@/types'
import Image from 'next/image'
import { Headphones } from 'lucide-react'
import {Button} from '@/components/ui/button'
import { Play } from 'lucide-react'
import { Doc } from '@/convex/_generated/dataModel'

const ProfileCard = ({
    podcastData,
    imageUrl,
    userFirstName,

}: ProfileCardProps ) => {

  const { setAudio } = useAudio();
  const [randomPodcast, setRandomPodcast] = useState<Doc<"podcasts"> | null>(null);

  const playRandomPodcast = () => {
    const randomIndex = Math.floor(Math.random() * podcastData.podcasts.length);
    setRandomPodcast(podcastData.podcasts[randomIndex]);
  };

  useEffect(() => {
    if (randomPodcast) {
      setAudio({
        title: randomPodcast.podcastTitle,
        audioUrl: randomPodcast.audioUrl || "",
        imageUrl: randomPodcast.imageUrl || "",
        author: randomPodcast.author,
        podcastId: randomPodcast._id,
      });
    }
  }, [randomPodcast, setAudio]);

  return (
    <div>
        <figure className='flex gap-8'>
            <Image
            src={imageUrl}
            width={160}
            height={160}
            alt={userFirstName}
            className=' h-fit rounded-xl ' 
            />
            <div className='flex flex-col gap-15'>
                <article className='flex flex-col gap-4'>
                    <h1 className='text-20 font-semibold'>{userFirstName}</h1>
                    <div className='flex items-center gap-4'>
                        <Headphones className="size-5" />
                        <p>{podcastData.listeners} listeners </p>

                    </div>
                </article>
                <Button className="w-fit bg-lime-400 rounded-lg cursor-pointer hover:bg-lime-300" onClick={playRandomPodcast}>
                    <Play className="size-4"/>
                    <p>Listen Now</p>
                </Button>
            </div>
            

        </figure>
        

    </div>
  )
}

export default ProfileCard
