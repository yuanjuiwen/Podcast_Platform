"use client"

import React from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react"
import { useState,useEffect } from 'react'
import { usePathname,useRouter } from 'next/navigation'
import { useDebounce } from '@/lib/useDebounce'

const SearchBar = () => {

  const [search,setSearch] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const debouncedValue = useDebounce(search,500)

  useEffect(() => {
        if(debouncedValue){
            router.push(`/discover?search=${debouncedValue}`)
        } else if (!debouncedValue && pathname === '/discover')router.push('/discover')
    }, [router, pathname, debouncedValue])



  return (
    <div>
        <InputGroup>
        <InputGroupInput 
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch('')}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export default SearchBar