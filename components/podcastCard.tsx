'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { cn } from 'cn'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

const PodcastCard = ({podcastId,title,description,imgURL,className}:{
    imgURL: string,
    title:string,
    description: string,
    podcastId: Id<"podcasts">
    className?: string;
}) => {
  const router = useRouter()
  const updateViews = useMutation(api.podcasts.updatePodcastViews)

  const handleViews = () => {
    updateViews({podcastId})
    router.push(`/podcasts/${podcastId}`)
  }  

  return (
    <div className={cn('cursor-pointer  hover:bg-white/6 px-4 py-4 rounded-xl ',className)} onClick={handleViews}>
        <figure className='flex flex-col gap-4'>
            <Image
                src={imgURL}
                width={174}
                height={174}
                alt={title}
                className='aspect-square w-full h-fit rounded-xl '            
            />
            <div className='flex flex-col gap-1'>
                <h1 className='text-16  font-bold'>{title}</h1>
                <h2 className='text-12 text-gray-400 font-medium capitalize line-clamp-2'>{description}</h2>
            </div>
        </figure>
    </div>
  )
}

export default PodcastCard