import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema, taskSchema } from "../Schemas/TaskSchema";
import { useCreateTaskMutation } from "../redux/api/tasksApi";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/slices/TasksSlice";
import { useNavigate } from "react-router-dom";

export function CreateTaskForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<taskSchema>({
    mode: "all",
    resolver: zodResolver(TaskSchema),
  });

  const [createTask] = useCreateTaskMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [apiError, setApiError] = useState<string>("");

  const onSubmit = async (data: taskSchema) => {
    try {
      const task = await createTask(data).unwrap();
      dispatch(addTask(task));
      console.log("Task created successfully: ", task);
      navigate('/layout/tasks')
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        console.error("Failed to create task: ", err);
        const errorData = (err as { data: string }).data;
        setApiError(errorData);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-gray-200 m-5 p-6 rounded-lg"
    >
      <h1 className="text-2xl sm:text-3xl text-gray mb-6">
        Create New Task
      </h1>
      <div className="grid grid-cols-2 gap-4 w-4/5">
        {/* Left Column */}
        <div className="flex flex-col gap-2">
          <input
            {...register("name")}
            placeholder="Task Name"
            className="p-2 border rounded-xl w-full"
          />
          <span className="text-red-500">
            {errors && errors.name?.message}
          </span>

          <textarea
            {...register("description")}
            placeholder="Description"
            className="p-2 border rounded-xl w-full"
          />
          <span className="text-red-500">
            {errors && errors.description?.message}
          </span>

          <select
            {...register("priority")}
            className="p-2 border rounded-xl w-full"
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <span className="text-red-500">
            {errors && errors.priority?.message}
          </span>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-2">
          <select
            {...register("category")}
            className="p-2 border rounded-xl w-full"
          >
            <option value="">Select Category</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Testing">Testing</option>
            <option value="Management">Management</option>
          </select>
          <span className="text-red-500">
            {errors && errors.category?.message}
          </span>

          <input
            {...register("duedate", { valueAsDate: true })}
            type="date"
            placeholder="Due Date"
            className="p-2 border rounded-xl w-full"
          />
          <span className="text-red-500">
            {errors && errors.duedate?.message}
          </span>

          <input
            {...register("username")}
            placeholder="Username"
            className="p-2 border rounded-xl w-full"
          />
          <span className="text-red-500">
            {errors && errors.username?.message}
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 bg-gray-700 hover:bg-blue w-28 rounded-lg p-2 text-white hover:bg-green-600"
      >
        Create Task
      </button>
      {apiError && (
        <div className="text-red-500 p-2">
         <p>Error: {apiError}</p>
        </div>
      )}
    </form>
  );
}
