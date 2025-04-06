// src/server/auth/index.ts
import NextAuth from "next-auth";
import { authConfig } from "./config";

// for middleware / server-side usage
export const { auth } = NextAuth(authConfig);

// for route handler (GET, POST)
const handler = NextAuth(authConfig);
export const GET = handler;
export const POST = handler;
