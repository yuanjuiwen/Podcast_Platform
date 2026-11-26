'use client'

import React from 'react'
import { useState,createContext,useContext } from 'react'
import { AudioProps } from '@/types'
import { usePathname } from 'next/navigation'
import { AudioContextType } from '@/types'

const AudioContext = createContext<AudioContextType | undefined>(undefined);


const AudioProvider = ({children}: {children: React.ReactNode}) => {
  const [audio, setAudio] = useState<AudioProps | undefined>()
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
 
  if(prevPathname!==pathname){
    setPrevPathname(pathname)
    if(pathname === '/create-podcast')
        setAudio(undefined)
  }
  
    return (

    <AudioContext.Provider value={{ audio, setAudio}}>
        {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext);

  if(!context) throw new Error('useAudio must be used within an AudioProvider');

  return context;
}

export default AudioProvider;