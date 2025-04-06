import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

/**
 * CONTEXT SETUP
 * 👉 Every API call gets access to db & user session
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth(); // Logged-in user info
  return {
    db,
    session,
    ...opts,
  };
};

/**
 * TRPC INITIALIZATION
 * 👉 Sets up transformer and Zod error formatting
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * FACTORY FOR SERVER CALLS
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * ROUTER CREATOR (used in root.ts)
 */
export const createTRPCRouter = t.router;

/**
 * TIMING MIDDLEWARE (Optional but helpful in dev)
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  // Only delay in development
  if (t._config.isDev) {
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[tRPC] ${path} took ${end - start}ms`);

  return result;
});

/**
 * PUBLIC PROCEDURE
 * 👉 No authentication required
 */
export const publicProcedure = t.procedure.use(timingMiddleware);

/**
 * PROTECTED PROCEDURE
 * 👉 Only accessible if user is logged in
 */
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        // Session is now non-null
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
