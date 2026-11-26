import { ConvexError, v } from "convex/values";
import { mutation,query } from "./_generated/server";

export const getUrl = mutation({
    args: {
        storageId: v.id("_storage")
    },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId)
    }

})

export const createPodcast = mutation ({
    args:{
        audioStorageId: v.id('_storage'),
        podcastTitle: v.string(),
        podcastDescription: v.string(),
        imageStorageId: v.id("_storage"),
        voicePrompt: v.string(),
        imagePrompt: v.string(),
        voiceType: v.string(),
        audioDuration: v.number(),

    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new ConvexError("User not authenticated")
        }
        
        const audioUrl = await ctx.storage.getUrl(args.audioStorageId);
        const imageUrl = await ctx.storage.getUrl(args.imageStorageId);
        if (!audioUrl || !imageUrl) throw new ConvexError("File not found");

        

        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), identity.subject))
            .collect();

        if (user.length === 0) {
        throw new ConvexError("User not found");
        }

        return await ctx.db.insert("podcasts", {
        audioStorageId: args.audioStorageId,
        user: user[0]._id,
        podcastTitle: args.podcastTitle,
        podcastDescription: args.podcastDescription,
        audioUrl: audioUrl,
        imageUrl: imageUrl,
        imageStorageId: args.imageStorageId,
        author: user[0].name,
        authorId: user[0].clerkId,
        voicePrompt: args.voicePrompt,
        imagePrompt: args.imagePrompt,
        voiceType: args.voiceType,
        views: 0,
        authorImageUrl: user[0].imageUrl,
        audioDuration: args.audioDuration,
        });

        
    }
})

export const getTrendingPodcasts = query({
    handler: async (ctx) => {
        const podcast = await ctx.db.query("podcasts").collect();
        return podcast.sort((a, b) => b.views - a.views).slice(0, 8);
    }
})

export const updatePodcastViews = mutation({
    args: {
        podcastId: v.id('podcasts'),
    },
    handler: async(ctx, args) => {
        const podcast = await ctx.db.get(args.podcastId);

        if (!podcast) {
        throw new ConvexError("Podcast not found");
    }

        return await ctx.db.patch(args.podcastId, {
        views: podcast.views + 1,
        });
    },

})

export const getPodcastById = query({
    args:{
        podcastId: v.id("podcasts")
    },
    handler: async (ctx,args) => {
        return await ctx.db.get(args.podcastId)
    }
})

export const getPodcastByVoiceType = query({
  args: { podcastId: v.id("podcasts") },
  handler: async (ctx, args) => {
    const podcast = await ctx.db.get(args.podcastId);
    if (!podcast) return [];

    const allPodcasts = await ctx.db.query("podcasts").collect();

    return allPodcasts.filter(
      (p) => p.voiceType === podcast.voiceType && p._id !== args.podcastId
    );
  },
});


export const getPodcastBySearch = query({
    args: {
        search: v.string(),
    },
    handler: async (ctx, args) => {
        if (args.search===""){
            return await ctx.db.query('podcasts').order('desc').collect();
        }

        const authorSearch = await ctx.db
            .query("podcasts")
            .withSearchIndex("search_author", (q) => q.search("author",args.search))
            .take(10);

        if(authorSearch.length > 0){
            return authorSearch;
        }

        const titleSearch = await ctx.db
            .query("podcasts")
            .withSearchIndex("search_title",(q) => q.search("podcastTitle", args.search))
            .take(10)

        if (titleSearch.length>0){
            return titleSearch;
        }

        return await ctx.db
            .query("podcasts")
            .withSearchIndex("search_body", (q) => q.search("podcastDescription", args.search))
            .take(10);
    }

})

export const getPodcastByAuthorId = query({
    args:{
        authorId: v.string(),
    },
    handler: async (ctx, args) => {
        const podcasts = await ctx.db
            .query("podcasts")
            .filter((q) => q.eq(q.field("authorId"), args.authorId))
            .collect();

        const totalListeners = podcasts.reduce(
            (sum, podcast) => sum + podcast.views,0
        )

        return{ podcasts, listeners: totalListeners } ;
    }



})