import React from 'react'
import { Textarea } from './ui/textarea'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { GeneratePodcastProps } from '@/types'
import { useState } from 'react'
import { useAction,useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { generateUploadUrl } from '@/convex/file'
import { toast } from "@/components/ui/toast" 
import {
  AudioPlayer,
  AudioPlayerElement,
  AudioPlayerControlBar,
  AudioPlayerPlayButton,
  AudioPlayerSeekBackwardButton,
  AudioPlayerSeekForwardButton,
  AudioPlayerTimeDisplay,
  AudioPlayerTimeRange,
  AudioPlayerDurationDisplay,
  AudioPlayerMuteButton,
  AudioPlayerVolumeRange,
} from "@/components/ai-elements/audio-player";



const useGeneratePodcast = ({
    voicePrompt,
    setVoicePrompt,
    voiceType,
    audio,
    setAudio,
    setAudioStorageId,
    setAudioDuration,
    instruction
    }: GeneratePodcastProps) => {
    
    const [isGenerating, setIsGenerating ] = useState(false);

    const generateUploadUrl = useMutation(api.file.generateUploadUrl);
    const getPodcastAudio = useAction(api.openai.generateAudioAction);
    const getAudioUrl = useMutation(api.podcasts.getUrl)

    const generatePodcast = async () => {
        setIsGenerating(true);

        if(!voiceType){
            toast.add({
                title: "Please select an AI voice to generate a podcast",
                type: "error"
            })

            return setIsGenerating(false);
        }

        if(!voicePrompt){
            toast.add({
                title: "Please provide a prompt to generate a podcast",
                type: "error"
            })

            return setIsGenerating(false);
        }
        try{
            const response = await getPodcastAudio({
                voice: voiceType,
                input: voicePrompt,
                instruction: instruction
            })

            const blob = new Blob([response], {type: 'audio/mpeg'});
            const fileName = `podcast-${crypto.randomUUID()}.mp3`
            const file = new File([blob], fileName, {type:'audio/mpeg'})

            const uploadUrl = await generateUploadUrl();

            const result = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": file.type },  
            body: file,
            });

            const { storageId } = await result.json();
            setAudioStorageId(storageId);
            const audioUrl = await getAudioUrl({storageId});
            setAudio(audioUrl!)
            setIsGenerating(false);
            toast.add({
                title: "Podcast generated successfully",
                type: "success"
            })

        }catch(error){
            console.log('Error generating podcast', error)
            toast.add({
                title: "Error creating a podcast",
                type: "error"
            })
            setIsGenerating(false);
        }
    }


    return {isGenerating,generatePodcast}
}





const GeneratePodcast = ({
    voicePrompt,
    setVoicePrompt,
    voiceType,
    audio,
    setAudio,
    setAudioStorageId,
    setAudioDuration,
    instruction
    }:GeneratePodcastProps) => {

  const {isGenerating, generatePodcast} = useGeneratePodcast({
    voicePrompt,
    setVoicePrompt,
    voiceType,
    audio,
    setAudio,
    setAudioStorageId,
    setAudioDuration,
    instruction
    })

  return (
    <div className='flex flex-col '>
      <FieldSet>
        <FieldGroup>
            <Field>
                <FieldLabel htmlFor="voicePrompt" >AI prompt to generate podcast</FieldLabel>
                <Textarea
                 onChange={(e) => setVoicePrompt(e.target.value)}
                 id="voicePrompt"
                 placeholder='Provide some context...'
                 className="min-h-24 resize-none"
                />
            </Field>

            <Button onClick={generatePodcast}
            disabled={isGenerating} className='w-fit cursor-pointer self-end'>Generate</Button>
            {audio && (
                <AudioPlayer className="mt-5">
                    <AudioPlayerElement
                    src={audio}
                    onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
                    />
                    <AudioPlayerControlBar>
                    <AudioPlayerPlayButton />
                    <AudioPlayerSeekBackwardButton />
                    <AudioPlayerSeekForwardButton />
                    <AudioPlayerTimeDisplay />
                    <AudioPlayerTimeRange />
                    <AudioPlayerDurationDisplay />
                    <AudioPlayerMuteButton />
                    <AudioPlayerVolumeRange />
                    </AudioPlayerControlBar>
                </AudioPlayer>
                            )}
            
        </FieldGroup>
      </FieldSet>

    </div>
  )
}

export default GeneratePodcast