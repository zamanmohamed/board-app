// store/useTaskStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Task } from "@/types/task";

interface TaskStore {
  tasks: Task[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
      setTasks: (tasks) => set({ tasks }),
      updateTaskStatus: (taskId, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status } : task
          ),
        })),
    }),
    {
      name: "task-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
