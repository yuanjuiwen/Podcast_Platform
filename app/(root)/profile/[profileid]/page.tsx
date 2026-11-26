'use client'

import ProfileCard from '@/components/ProfileCard'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { use } from 'react'
import { Spinner } from '@/components/ui/spinner'
import PodcastCard from '@/components/podcastCard'
import EmptyState from "@/components/EmptyState"
import { Separator } from '@/components/ui/separator'

const Profile = ({ params }: { params: Promise<{ profileid: string }> }) => {

  const { profileid } = use(params)
  const getPodcast = useQuery(api.podcasts.getPodcastByAuthorId , {authorId: profileid})
  const user = useQuery(api.users.getUserById,{ clerkId: profileid})

  if (!user || !getPodcast) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner className="size-8" />
    </div>
  )
  }

  return (
  <div className='flex flex-col gap-16'>
    <ProfileCard
      podcastData={getPodcast!}
      imageUrl={user?.imageUrl}
      userFirstName={user?.name}
    />
    <Separator/>
    <section className='flex flex-col gap-8'>
      <h1 className="text-18 font-semibold">All Podcasts</h1>
      {getPodcast && getPodcast.podcasts.length > 0? (
        <div className='podcast_grid'>
          {getPodcast.podcasts.slice(0,4).map((item) => {
            return(
              <PodcastCard
                key={item._id}
                imgURL={item.imageUrl!}
                title={item.podcastTitle}
                description={item.podcastDescription}
                podcastId={item._id}
                className='p-0 hover:bg-transparent w-40'
              />
            )
          })}
        </div>
      ):
        <div className=" min-h-[60vh] flex justify-center items-center">
              <EmptyState />
        </div>
      }
    </section>
  </div>
  
  )
}

export default Profile
