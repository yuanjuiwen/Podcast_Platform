'use client'

import PodcastCard from "@/components/podcastCard"
import SearchBar from "@/components/searchBar"
import { api } from "@/convex/_generated/api"
import { use } from "react"
import { useQuery } from "convex/react"
import EmptyState from "@/components/EmptyState"
import { Spinner } from "@/components/ui/spinner"


const Discover = ({ searchParams }: { searchParams: Promise<{ search?: string }> }) => {
  
  const { search } = use(searchParams)
  const podcastData = useQuery(api.podcasts.getPodcastBySearch,{ search: search || ''})
  
  return (
    <div>
      <div className="flex flex-col gap-8">
        <SearchBar/>
      <div>
        <h1 className="font-semibold text-20">
          {!search ? 'Discover Trending ' : 'Search result'}
        </h1>

        {podcastData ? (
          <>
            {podcastData.length > 0 ? (
              <div  className="podcast_grid">
                {podcastData?.map((item) => {

                    const {_id, podcastTitle, podcastDescription, imageUrl} = item
                    return (
                      <div key={_id}>
                        <PodcastCard
                          imgURL={imageUrl!}
                          title={podcastTitle}
                          description={podcastDescription}
                          podcastId={_id}
                        />
                      </div>
                    )
                })}
              </div>
            ): 
            <div className=" min-h-[60vh] flex justify-center items-center">
              <EmptyState />
            </div>
            }
          </>
        ):
        <div className=" min-h-[60vh] flex justify-center items-center">
         <Spinner className="size-8"/>
        </div>
        }
      </div>
      </div>
    </div>
  )
}

export default Discover
