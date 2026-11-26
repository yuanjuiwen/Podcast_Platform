import React from 'react'
import Link from 'next/link';
import { cn } from 'cn';

const Header = ({headerTitle, titleClassName}:{headerTitle?: string; titleClassName?:string}) => {
  return (
    <header className="flex items-center justify-between gap-6">
        {headerTitle?(
            <h1 className={cn('text-16 font-bold', titleClassName)}>{headerTitle}</h1>
        ):<div/>}
        <Link href="/discover" className='text-[#8dc92e] hover:text-[#a3e635]'>
            <p className='text-14 font-semibold'>See all</p>
        </Link>
    </header>
  )
}

export default Header
