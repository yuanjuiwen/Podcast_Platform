'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/app/constants'
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation'
import { Icon } from 'lucide-react'
import { Show, SignedOut, SignOutButton, useUser,useClerk } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"

 const LeftSideBar = () => {

  const pathname = usePathname();
  const router = useRouter();
  const {signOut} = useClerk();
  const { user } = useUser();
  return (
    <section className='left_sidebar'>
        <div className='w-full flex flex-col gap-140'>
            <nav className="flex flex-col gap-4">
                <Link href="/" className='flex items-center cursor-pointer gap-2 px-3 max-lg:justify-center'>
                    <Image src='/icon/logo-icon.svg' alt='logo' width={20} height={20}/>
                    <h1 className='text-24 font-semibold'> Podcaster </h1>
                </Link>

                <div className='flex flex-col gap-1'>
                     {sidebarLinks.map((item) => {
                    const { icon:Icon, label} = item;
                    const route = item.route === '/profile' ? `/profile/${user?.id}` : item.route;
                    const isActive = pathname === route || pathname.startsWith(`${route}/`);

                    return(
                        <Link href={route} key={label} className={cn(
                                'flex items-center gap-1.5 rounded-md px-3 py-1 text-gray-400 transition-colors duration-200 hover:text-white hover:bg-white/6',
                                { 'text-white bg-white/10 ': isActive })}>

                            <div className="flex w-[20px] justify-center">
                                <Icon size={16}/>
                            </div>
                            <p className='font-medium text-sm tracking-[-0.025em]'>{label}</p>


                        </Link>
                    );
                })}
                </div>
        
            </nav>
            <Show when="signed-out">
                <div>
                    <Button variant="gradient" className="w-full cursor-pointer">
                        <Link href = "/sign-in">Sign in</Link>
                    </Button>
                </div>
            </Show>
            <Show when="signed-in">
                <div>
                    <Button variant="gradient" onClick={() => signOut(() => router.push('/'))} className="w-full cursor-pointer">
                        Log out
                    </Button>
                </div>
            </Show>

        </div>

    </section>
  )
}

export default LeftSideBar
