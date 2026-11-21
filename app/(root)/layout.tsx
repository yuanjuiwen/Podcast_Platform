import React from 'react'
import LeftSideBar from '@/components/leftSideBar';
import RightSideBar from '@/components/rightSideBar';


export default function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div className='relative flex flex-col '>
        <main className='relative mx-auto flex w-full max-w-6xl '>
            <LeftSideBar />

            <section className=' mt-12 mx-10 flex min-h-screen min-w-0 flex-1'>
              {children}
            </section>
            

            <RightSideBar/>
        </main>
    </div>
  )
}