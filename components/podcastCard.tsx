import React from 'react'
import Image from 'next/image'

const PodcastCard = ({podcastId,title,description,imgURL}:{
    imgURL: string,
    title:string,
    description: string,
    podcastId: number
}) => {
  return (
    <div className='cursor-pointer  hover:bg-white/6 px-4 py-4 rounded-xl '>
        <figure className='flex flex-col gap-2'>
            <Image
                src={imgURL}
                width={174}
                height={174}
                alt={title}
                className='aspect-square w-full h-fit rounded-xl '            
            />
            <div className='flex flex-col gap-1'>
                <h1 className='text-16  font-bold'>{title}</h1>
                <h2 className='text-12 text-gray-400 font-medium capitalize'>{description}</h2>
            </div>
        </figure>
    </div>
  )
}

export default PodcastCard