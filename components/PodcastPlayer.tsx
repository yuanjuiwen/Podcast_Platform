'use client'

import React from 'react'
import { useRef,useState,useEffect } from 'react';
import { Progress } from "@/components/ui/progress"
import { useAudio } from '@/app/Provider/AudioProvider';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Play } from 'lucide-react'
import { VolumeX } from 'lucide-react'
import { RotateCw } from 'lucide-react'
import {RotateCcw} from 'lucide-react'

const PodcastPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false);
  const {audio} = useAudio();

  const togglePlayPause = () => {
    if(audioRef.current?.paused){
        audioRef.current?.play();
        setIsPlaying(true);
    }else{
        audioRef.current?.pause();
        setIsPlaying(false);
    }
  }
  const forward = () => {
    if (
      audioRef.current &&
      audioRef.current.currentTime &&
      audioRef.current.duration &&
      audioRef.current.currentTime + 5 < audioRef.current.duration
    ) {
      audioRef.current.currentTime += 5;
    }
  };

  const rewind = () => {
    if (audioRef.current && audioRef.current.currentTime - 5 > 0) {
      audioRef.current.currentTime -= 5;
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const toggleMute = () => {
    if(audioRef.current){
        audioRef.current.muted =!isMuted;
        setIsMuted((prev) => !prev);
    }
  }

  const handleLoadedMetadata = () => {
    if(audioRef.current) {
        setDuration(audioRef.current.duration)
    }}
  

  //audio更新後的自動播放function
  useEffect(() => {
    const audioElement = audioRef.current;
    if(audio?.audioUrl){
        if(audioElement){
            audioElement.play().catch(() => {
            })
        }
    }
    else {
        audioElement?.pause();
    } 
  },[audio])


  
  return (
    <div className={cn("absolute glassmorphism-black rounded-xl border-2 bottom-4 left-8 right-8 z-50 flex  flex-col", {hidden: !audio?.audioUrl,})}>

    

    <section  className=" grid h-[80px] w-full items-center grid-cols-[1fr_auto_1fr] px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <audio
            ref={audioRef}
            src={audio?.audioUrl}
            className=''
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        />
        <div className='flex gap-2 items-center justify-self-start'>
            <Button variant="ghost" size="icon" className="size-8 rounded-full cursor-pointer " onClick={rewind}>
                <RotateCcw className="size-4"/>
           </Button>

           <Button variant="ghost" size="icon" className="size-10 rounded-full cursor-pointer" onClick={togglePlayPause}>
                <Play className="size-4"/>
           </Button>

           <Button variant="ghost" size="icon" className="size-8 rounded-full cursor-pointer" onClick={forward}>
                <RotateCw className="size-4"/>
           </Button>
        </div>
        <div className='flex flex-col  gap-2'>
            <div className='flex gap-3'>
                <Link href={`/podcast/${audio?.podcastId}`}>
                {audio?.imageUrl && (
                    <Image
                    src={audio.imageUrl}
                    width={36}
                    height={36}
                    alt="player1"
                    className='rounded-[4px]'
                    
                    />
                )}
                </Link>
                <div className='flex flex-col'>
                   <p className='font-bold text-12'>{audio?.title}</p>
                   <p className='font-semibold text-12'>{audio?.author}</p> 
                </div>
                

            </div>
            <Progress
            value={duration ? (currentTime / duration) * 100 : 0}
            className="w-[220px]" 
            />
            
        </div>
        <div className='justify-self-end'>
            <Button variant="ghost" size="icon" className="size-10 rounded-full cursor-pointer" onClick={toggleMute}>
            <VolumeX className="size-4"/>
           </Button>
        </div>
    </section>
    </div>
    
    
  )
}

export default PodcastPlayer
