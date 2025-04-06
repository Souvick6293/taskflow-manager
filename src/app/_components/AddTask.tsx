"use client";

import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";

interface TaskFormValues {
  title: string;
  description?: string;
}

const AddTask = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>();

  const addTask = api.task.addTask.useMutation({
    onSuccess: () => {
      alert("Task added successfully!");
      reset();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    addTask.mutate({
      ...data,
      userId: "a1", // ✅ ম্যানুয়ালি একটা টেস্ট আইডি দিয়ে দিচ্ছি
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-lg">
      <input
        type="text"
        placeholder="Task Title"
        {...register("title", { required: "Title is required" })}
        className="border p-2 rounded w-full mb-2"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <textarea
        placeholder="Description (optional)"
        {...register("description")}
        className="border p-2 rounded w-full mb-2"
      />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
