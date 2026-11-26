'use client'
import { Show,  UserButton,  useUser } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'
import Header from './Header'
import { Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious } from '@/components/ui/carousel'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
import { useRouter } from 'next/navigation'

const RightSideBar = () => {

  const {user} = useUser();
  const router = useRouter()
  

  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);

  const [autoplay] = React.useState(() =>
  Autoplay({
    delay: 3000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  })
)


  return (
    <section className="right_sidebar">
      <Show when="signed-in">
        <Link href={`/profile/${user?.id}`} className="flex gap-3 pb-12">
          <UserButton/>
          <div className="flex w-full items-center justify-between">
            <h1 className="text-16 font-semibold">{user?.firstName} {user?.lastName}</h1>
          </div>
        </Link>
      </Show>
      <section className='flex flex-col gap-4'>
        <Header headerTitle='Discover More'/>
        <Carousel
           opts={{ loop: true }}
            plugins={[autoplay]}
        
        >
        <CarouselContent>
          {topPodcasters?.slice(0,3).map((item) => {
            
            return (
              <CarouselItem key={item._id}>
                <div className='relative  aspect-square w-full'>
                  <Image
                    src={item.imageUrl}
                    alt="card"
                    fill
                    className="object-cover rounded-xl"
                  />
                  <div className="glassmorphism-black absolute bottom-2 left-2 right-2 border-1 z-10 flex flex-col rounded-xl p-4">
                    <h2 className="text-14 font-semibold text-white-1">{item.podcast[0]?.podcastTitle}</h2>
                    <p className="text-12 font-normal text-white-2">{item.name}</p>
                  </div>  
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
     
      </Carousel>
      </section>
      <section className='mt-12'>
        <Header headerTitle='Top Podcasters'/>
        <div className='flex flex-col gap-3 mt-4 '>
        {topPodcasters?.slice(0,3).map((item) => {

          return(
            <div key={item._id} className='cursor-pointer px-2 py-2 hover:bg-white/6 rounded-xl' onClick={() => router.push(`/profile/${item.clerkId}`)}>
              <figure className='flex gap-4 '>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={44}
                  height={44}
                  className='rounded-[6px]'
                />
                <div className='flex flex-col gap-1'>
                  <h2 className='font-semibold text-14'>{item.name}</h2>
                  <p className='text-12'>{item.totalPodcasts} Podcasts</p>
                </div>
              </figure>
          
            </div>
          )
        })}
        </div>
      </section>
    </section>
  )
}

export default RightSideBar