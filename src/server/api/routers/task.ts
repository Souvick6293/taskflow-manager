import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const taskRouter = createTRPCRouter({
  // ✅ Add task (Only logged-in users)
  addTask: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().optional(),
        userId: z.string().min(1, "User ID is required"),
      })
    )
    .mutation(async ({ input }) => {
      return await db.task.create({
        data: {
          title: input.title,
          description: input.description ?? "",
          userId: input.userId,
        },
      });
    }),

  // ✅ Get all tasks (Logged-in user's tasks only)
  getMyTasks: protectedProcedure.query(async ({ ctx }) => {
    return await db.task.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  // ✅ Update a task
  updateTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        title: z.string(),
        description: z.string().optional(),
        status: z.enum(["pending", "completed"]),
      })
    )
    .mutation(async ({ input }) => {
      return await db.task.update({
        where: { id: input.taskId },
        data: {
          title: input.title,
          description: input.description ?? "",
          status: input.status,
        },
      });
    }),

  // ✅ Delete a task
  deleteTask: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .mutation(async ({ input }) => {
      return await db.task.delete({
        where: { id: input.taskId },
      });
    }),
});
