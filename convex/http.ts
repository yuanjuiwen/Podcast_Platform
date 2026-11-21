import type { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { httpRouter } from "convex/server";
import { Webhook } from "svix";

import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const handleClerkWebhook = httpAction(async (ctx, request) => {
  const event = await validateRequest(request);
  if (!event) {
    return new Response("Invalid request", { status: 400 });
  }
  switch (event.type) {
    case "user.created": {
      const email = getPrimaryEmail(event.data);
      await ctx.runMutation(internal.users.createUser, {
        clerkId: event.data.id,
        email,
        imageUrl: event.data.image_url,
        // first_name 在只用 email 註冊時會是 null，schema 要求 string，所以要給 fallback
        name:
          [event.data.first_name, event.data.last_name].filter(Boolean).join(" ") ||
          event.data.username ||
          email.split("@")[0] ||
          "User",
      });
      break;
    }
    case "user.updated":
      await ctx.runMutation(internal.users.updateUser, {
        clerkId: event.data.id,
        imageUrl: event.data.image_url,
        email: getPrimaryEmail(event.data),
      });
      break;
    case "user.deleted":
      await ctx.runMutation(internal.users.deleteUser, {
        clerkId: event.data.id as string,
      });
      break;
  }
  return new Response(null, {
    status: 200,
  });
});

// 優先取主要 email；沒有 email（例如只用手機註冊、或 Clerk 測試範例）時回傳空字串，避免當掉
const getPrimaryEmail = (data: UserJSON): string => {
  const emails = data.email_addresses ?? [];
  const primary = emails.find((e) => e.id === data.primary_email_address_id);
  return (primary ?? emails[0])?.email_address ?? "";
};

const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  handler: handleClerkWebhook,
});

const validateRequest = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;
  if (!webhookSecret) {
    throw new Error("CLERK_WEBHOOK_SECRET is not defined");
  }
  const payloadString = await req.text();
  const headerPayload = req.headers;
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret);
  try {
    // svix 2.x 的 verify() 只驗證簽章、不回傳內容（回傳 undefined），驗證失敗才會丟錯
    // 所以驗證通過後要自己 parse payload
    wh.verify(payloadString, svixHeaders);
    return JSON.parse(payloadString) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying Clerk webhook:", err);
    return undefined;
  }
};

export default http;