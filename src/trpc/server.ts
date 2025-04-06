import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { createCaller, type AppRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { createQueryClient } from "./query-client";

/**
 * Create context inside a function to ensure it's within a request scope
 */
const createContext = async () => {
  const heads = headers(); // ❌ await দরকার নেই, কারণ এটি async ফাংশন নয়
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
};

const getQueryClient = cache(createQueryClient);
const caller = cache(async () => createCaller(await createContext())); // ✅ Proper request scope

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
