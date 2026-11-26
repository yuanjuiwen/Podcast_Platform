import { mutation } from "./_generated/server";
import { ConvexError } from "convex/values";

export const generateUploadUrl = mutation({
  
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if(!identity) throw new ConvexError("Unauthenticated");
    return await ctx.storage.generateUploadUrl();
  },
});