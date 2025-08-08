// app/page.tsx
"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import tasksJson from "@/data/tasks.json";
import Swimlane from "@/components/Board/Swimlane";
import { TaskStatus } from "@/types/task";

export default function DashboardPage() {
  const { setTasks, tasks, searchQuery } = useTaskStore();

  useEffect(() => {
    if (tasks.length === 0) {
      setTasks(tasksJson as any);
    }
  }, [setTasks, tasks.length]);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Fix: strongly type the statuses array
  const statuses: TaskStatus[] = ["To Do", "In Progress", "Approved", "Reject"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statuses.map((status) => (
        <Swimlane
          key={status}
          status={status}
          tasks={filteredTasks.filter((t) => t.status === status)}
        />
      ))}
    </div>
  );
}
