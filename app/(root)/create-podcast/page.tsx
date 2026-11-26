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
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"




const formSchema = z.object({
    podcastTitle: z.string(),
    voiceType: z.string(),
    description: z.string(),
    instruction: z.string()
  })

const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx'];

const CreatePodcast = () => {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),    
    defaultValues: { podcastTitle: "", voiceType: "", description: "" ,instruction:""},
  })

  const voiceType = form.watch("voiceType")
  const instruction = form.watch("instruction")

  const [imagePrompt, setImagePrompt] = useState('')
  const [ imageStorageId, setImageStorageId ] = useState<Id<"_storage"> |
  null>(null)
  const [imageUrl, setImageUrl] = useState('');
  
  
  const [ voicePrompt, setVoicePrompt] = useState('')

  const [ audioStorageId, setAudioStoragedId ] = useState<Id<"_storage"> |
  null>(null)
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioUrl,setAudioUrl] = useState('');
  
  const createPodcast = useMutation(api.podcasts.createPodcast)
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>){
    try{
      setIsSubmitting(true)
      if(!audioUrl || !imageUrl || !voiceType) {
        toast.add({
          title: 'Please generate audio and image'
        })
        setIsSubmitting(false);
        return
      }
      const podcast = await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.description,
        voiceType,
        imagePrompt,
        voicePrompt,
        audioDuration,
        audioStorageId: audioStorageId!,
        imageStorageId: imageStorageId!,
      })

      toast.add({
          title: 'Podcast created'
        })
      setIsSubmitting(false);
      router.push('/')


    }catch(error){
       console.log(error);
       toast.add({
          title: 'Error'
        })
       setIsSubmitting(false);
    }

  }
  


  return (
    <section className="flex flex-col w-full mx-auto max-w-lg gap-6">
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Create Podcast</h1>
        <p className="text-sm text-muted-foreground">
          Generate a podcast episode with AI in a few steps
        </p>
      </div>
      <div className="flex items-center gap-2">
      <Badge variant="default" className="size-8 rounded-full p-0 items-center justify-center text-sm">1</Badge>
      <h2 className="font-semibold ">Podcast information</h2>
      </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
           <Card>

            <CardContent>
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
                    name="description"
                    control={form.control}
                    render={({ field}) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                        <Textarea 
                          {...field}
                          id={field.name} 
                          placeholder="Write a short description..."
                          className="min-h-20 resize-none"
                        />
                      </Field>
                    )}
                  />
                </FieldGroup>
              </FieldSet>
              </CardContent>
             </Card>

              <Separator className="my-1" />
              <div className="flex items-center gap-2">
              <Badge variant="default" className="size-8 rounded-full p-0 items-center justify-center text-sm">2</Badge>
              <h2 className="font-semibold ">Generate Audio</h2>
              </div>
              <Card>
                 <CardContent>
                    <FieldSet>
                      <FieldGroup className="gap-8">
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
                                {voiceType && (
                                  <audio 
                                    src={`/${voiceType}.mp3`}
                                    autoPlay
                                    className="hidden"
                                  />
                                )}
                                
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
                                className="min-h-20 resize-none "
                              />
                            </Field>
                          )}
                        />

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

              
                      </FieldGroup>
                    </FieldSet>
                  </CardContent>
             </Card>

         <div className="flex flex-col gap-8">  

        <Separator className="my-1" />
            <div className="flex items-center gap-2">
              <Badge variant="default" className="size-8 rounded-full p-0 items-center justify-center text-sm">3</Badge>
              <h2 className="font-semibold ">Generate or Chose an Image</h2>
            </div>
         <Card>
          <CardContent>
            <GenerateThumbnail
              setImage={setImageUrl}
              setImageStorageId={setImageStorageId}
              imageUrl={imageUrl}
              imagePrompt={imagePrompt}           
              setImagePrompt={setImagePrompt}           
            />
           </CardContent>
          </Card>

            <div>
              <Button type="submit" disabled={isSubmitting}  size="lg" variant="gradient" className="w-full">
                  Submit
              </Button>
            </div>
          </div>
      
        </form>


  
    </section>
    
  )
}

export default CreatePodcast
