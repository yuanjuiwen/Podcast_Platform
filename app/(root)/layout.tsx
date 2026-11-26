import React from 'react'
import LeftSideBar from '@/components/leftSideBar';
import RightSideBar from '@/components/rightSideBar';
import { Toaster } from '@/components/ui/toast';
import PodcastPlayer from '@/components/PodcastPlayer';


export default function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div className='relative flex h-screen flex-col overflow-hidden'>
        <main className='relative flex min-h-0 w-full flex-1'>
            <LeftSideBar />
             <div className="relative min-w-0 flex-1">
                <section className=' h-full overflow-y-auto px-14 pt-12 pb-12 no-scrollbar'>
                  <div className='w-full max-w-2xl mx-auto'>{children}</div>
                  <Toaster />
                </section>
              <PodcastPlayer/>
            </div>

            <RightSideBar/>
        </main>
    </div>
  )
}