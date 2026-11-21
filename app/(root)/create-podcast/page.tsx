'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import  GeneratePodcast  from "@/components/GeneratePodcast"
import  GenerateThumbnail  from "@/components/GenerateThumbnail"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"
import { Id } from "@/convex/_generated/dataModel"

const formSchema = z.object({
    podcastTitle: z.string(),
    voiceType: z.string(),
    description: z.string(),
    instruction: z.string()
  })

const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx'];

const CreatePodcast = () => {

  const form = useForm({
    resolver: zodResolver(formSchema),    
    defaultValues: { podcastTitle: "", voiceType: "", description: "" ,instruction:""},
  })

  const voiceType = form.watch("voiceType")
  const instruction = form.watch("instruction")

  const [imagePrompt, setImagePrompt] = useState('')
  const [ imgStorageId, imgStoragedId ] = useState<Id<"_storage"> |
  null>(null)
  const [imageUrl, setImageUrl] = useState('');
  
  
  const [ voicePrompt, setVoicePrompt] = useState('')

  const [ audioStorageId, setAudioStoragedId ] = useState<Id<"_storage"> |
  null>(null)
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioUrl,setAudioUrl] = useState('');
  

  const [isSubmitting, setIsSubmitting] = useState(false);
  


  return (
    <section className="flex flex-col w-full mx-auto max-w-lg gap-6">
      <h1 className="text-20 font-semibold">Create Podcast</h1>

        <form className="flex flex-col gap-8">
          <FieldSet>
            <FieldGroup className="gap-8">
              
              <Controller
                name="podcastTitle"
                control={form.control}
                render={({field}) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Podcast Title</FieldLabel>
                    <Input 
                      {...field}
                      id={field.name}
                      autoComplete="off"
                      placeholder="eg.How to start your day"
                    />
                  </Field>
                )
                }
              />

              <Controller 
                name="voiceType"
                control={form.control}
                render={({ field}) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Select AI Voice</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}                     
                      onValueChange={field.onChange}>

                      <SelectTrigger id={field.name} className="w-full">
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>

                      <SelectContent alignItemWithTrigger={false}>
                        <SelectGroup>
                          {voiceCategories .map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                      
                    </Select>
                  </Field>
                  )
                }
              />

              <Controller
                name="instruction"
                control={form.control}
                render={({ field}) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>instruction</FieldLabel>
                    <Textarea 
                      {...field}
                      id={field.name} 
                      placeholder="Write a short instruction..."
                      className="min-h-20"
                    />
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field}) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Textarea 
                      {...field}
                      id={field.name} 
                      placeholder="Write a short description..."
                      className="min-h-20"
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

         <div className="flex flex-col gap-8">
            <GeneratePodcast
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              voiceType={voiceType}
             
              audio={audioUrl}
              setAudio={setAudioUrl}
              setAudioStorageId={setAudioStoragedId}
              setAudioDuration={setAudioDuration}

              instruction={instruction}

            />
            <GenerateThumbnail/>
            <div>
              <Button type="submit"  size="lg" className=" w-full bg-[#a3e635]">
                  Submit
              </Button>
            </div>
          </div>
      
        </form>


  
    </section>
    
  )
}

export default CreatePodcast
