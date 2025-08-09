// store/useTaskStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Task, TaskStatus } from "@/types/task";

interface TaskStore {
  tasks: Task[];
  searchQuery: string;
  hasHydrated: boolean;
  setSearchQuery: (q: string) => void;
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  setHasHydrated: (v: boolean) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      searchQuery: "",
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      setSearchQuery: (q) => set({ searchQuery: q }),
      setTasks: (tasks) => set({ tasks }),
      updateTaskStatus: (taskId, status) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, status } : t
          ),
        })),
    }),
    {
      name: "board-app-tasks",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
