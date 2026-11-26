import React from 'react'
import { GenerateThumbnailProps } from '@/types'
import { Textarea } from './ui/textarea'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { useState } from 'react'
import { toast } from "@/components/ui/toast" 
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadItemMetadata,
  FileUploadItemProgress,
  FileUploadItemDelete,
  FileUploadClear,
} from "@/components/ui/file-upload";
import Image from 'next/image'
import { CloudUpload } from 'lucide-react'





const useGenerateImage =({
  setImage,
  setImageStorageId,
  imageUrl,
  imagePrompt,
  setImagePrompt
  }:GenerateThumbnailProps
  ) => {

    const [isGenerating, setIsGenerating] = useState(false)
    const getImage = useAction(api.openai.generateThumbnailAction)

    const generateImage = async () => {

      if(!imagePrompt){
        toast.add({
                title: "Please provide a prompt to generate a image",
                type: "error"
            })
        return
      }
      setIsGenerating(true)

      try{
        const response = await getImage({
          prompt:imagePrompt
        })
        setImage(response.url)
        setImageStorageId(response.storageId)
        setIsGenerating(false)

      }catch(error){
        console.log("Error generating an image",error)
        toast.add({
                title: "Error generating an image",
                type: "error"
            })
        setIsGenerating(false)
      }
    }

  return{isGenerating,generateImage}

}





const GenerateThumbnail = ({
  setImage,
  setImageStorageId,
  imageUrl,
  imagePrompt,
  setImagePrompt
}:GenerateThumbnailProps) => {

  const {isGenerating, generateImage } = useGenerateImage({
    setImage,
    setImageStorageId,
    imageUrl,
    imagePrompt,
    setImagePrompt
  });

  const [isUploading, setIsUploading] = useState(false)

  const [files, setFiles] = useState<File[]>([]);
  const getUploadUrl = useMutation(api.file.generateUploadUrl)
  const getImageUrl = useMutation(api.podcasts.getUrl)

  const uploadImage = async (newFiles:File[]) => {
    setIsUploading(true)
    const file = newFiles[0]
    if (!file) {
      toast.add({ title: 'Error uploading image', type: 'error' })
      setIsUploading(false)
      return
    }

    try{
      const uploadUrl = await getUploadUrl()
      const result = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": file.type },  
            body: file,
            });
      const { storageId } = await result.json()
      const url = await getImageUrl({ storageId })
      setImage(url!)
      setImageStorageId(storageId)
      setIsUploading(false)


    }catch(error){
      console.log('Error uploading image', error)
      toast.add({ title: 'Error uploading image', type: 'error' })
      setIsUploading(false)
    }


  }


  return (
    <div className='flex flex-col '>
      <Tabs defaultValue="account" className="gap-4">
        <TabsList>
          <TabsTrigger value="AI">Use AI Generate</TabsTrigger>
          <TabsTrigger value="Upload">Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="AI" className=" min-h-64 flex flex-col">
          <FieldSet>
          <FieldGroup>
              <Field>

                  <Textarea
                  onChange={(e) => setImagePrompt(e.target.value)}
                  id="voicePrompt"
                  placeholder='Provide some context...'
                  className="min-h-52 resize-none"
                  />
              </Field>

              <Button onClick={generateImage}
              disabled={isGenerating} className='w-fit self-end cursor-pointer'>Generate</Button>
              
          </FieldGroup>
        </FieldSet>
        </TabsContent>

        <TabsContent value="Upload" className=" min-h-64 flex flex-col">
          <FileUpload
            value={files}
            onValueChange={setFiles}
            accept="image/*"
            maxFiles={1}
            className=" flex flex-1 flex-col  gap-4"
          >
            <FileUploadDropzone className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center">
              <CloudUpload className="mb-2 size-8 text-muted-foreground" />
              <p className="font-semibold">Upload images</p>
              <p className="text-sm text-muted-foreground">
                Click here or drag and drop to upload
              </p>
            </FileUploadDropzone>
            <FileUploadList>
              {files.map((file) => (
                <FileUploadItem key={file.name} value={file}>
                  <FileUploadItemPreview />
                  <FileUploadItemMetadata />
                  <FileUploadItemDelete render={<Button variant="ghost" size="icon" />}>
                    <Button variant="ghost" size="icon">✕</Button>
                  </FileUploadItemDelete>
                </FileUploadItem>
              ))}
            </FileUploadList>
            <FileUploadClear />
            <Button 
              onClick={() => uploadImage(files)}
              disabled={files.length === 0 || isUploading}
              className="w-fit self-end"
            >
              upload
            </Button>
          </FileUpload>
        </TabsContent>
      </Tabs>
      {imageUrl && (
        <div className="flex-center w-full">
          <Image 
            src={imageUrl}
            width={200}
            height={200}
            className="mt-5"
            alt="thumbnail"
          />
        </div>
      )}
      

    </div>
  )
}

export default GenerateThumbnail
