
import OpenAI from "openai";
import { action } from "./_generated/server";
import { v } from "convex/values";
import {ConvexError} from "convex/values"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export const generateAudioAction = action ({
    args: { input: v.string(), voice: v.string(), instruction: v.string()},
    handler: async (ctx, { voice, input, instruction }) => {
       
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new ConvexError("Unauthenticated");

        const mp3 = await openai.audio.speech.create({
        model: "gpt-4o-mini-tts",
        voice: voice,
        input: input,
        instructions: instruction,
        });

        const buffer = await mp3.arrayBuffer();
        return buffer;

    }

})

export const generateThumbnailAction = action ({
    args: { prompt: v.string() },
    handler: async(ctx,{prompt}) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new ConvexError("Unauthenticated");

        const response = await openai.images.generate({
            model: "gpt-image-2.5-flare",
            prompt,
            size: '1024x1024',
            quality: 'medium',
            n: 1,
        })

        const base64 = response.data?.[0]?.b64_json;
        if(!base64) throw new Error("No image returned")

        const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
        const blob = new Blob([bytes], { type: "image/png" });
        

        const storageId = await ctx.storage.store(blob);
        const url = await ctx.storage.getUrl(storageId);
        if (!url) {
            throw new Error("Can't get url");
        }

        return{ storageId, url};

    }
})