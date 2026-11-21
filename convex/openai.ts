
import OpenAI from "openai";
import { action } from "./_generated/server";
import { v } from "convex/values";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export const generateAudioAction = action ({
    args: { input: v.string(), voice: v.string(), instruction: v.string()},
    handler: async (_, { voice, input, instruction }) => {
       

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