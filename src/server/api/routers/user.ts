import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  // 👉 Get all users (admin only)
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admins only" });
    }

    return db.user.findMany({
      include: { tasks: true },
    });
  }),

  // 👉 Change user role
  updateRole: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.enum(["admin", "user"]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      return db.user.update({
        where: { id: input.userId },
        data: { role: input.role },
      });
    }),

  // 👉 Delete user (if needed)
  deleteUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      return db.user.delete({
        where: { id: input.userId },
      });
    }),
});
