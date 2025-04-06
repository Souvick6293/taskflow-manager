// src/server/api/root.ts

import { createTRPCRouter } from "~/server/api/trpc";
import { taskRouter } from "./routers/task";
import { userRouter } from "./routers/user";

// 👉 এখানে সব রাউটার একত্রিত হচ্ছে
export const appRouter = createTRPCRouter({
  task: taskRouter, // 👉 /api/task এর জন্য routes থাকবে
  user:userRouter
});

// 👉 Caller তৈরি করো যাতে server side থেকে tRPC call করা যায় (optional but useful for server actions)
export const createCaller = (ctx: Parameters<typeof appRouter.createCaller>[0]) => {
  return appRouter.createCaller(ctx);
};

// 👉 এই type টা frontend use করে dynamic typescript support পেতে
export type AppRouter = typeof appRouter;
