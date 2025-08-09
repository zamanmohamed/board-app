"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useEffect } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import Swimlane from "@/components/Board/Swimlane";
import type { Task, TaskStatus } from "@/types/task";

interface Props {
  initialTasks: Task[];
}

export default function DashboardClient({ initialTasks }: Props) {
  const { tasks, setTasks, searchQuery, updateTaskStatus, hasHydrated } =
    useTaskStore();

  useEffect(() => {
    if (!hasHydrated) return;
    if (useTaskStore.getState().tasks.length === 0) {
      setTasks(initialTasks);
    }
  }, [hasHydrated, initialTasks, setTasks]);

  const sensors = useSensors(useSensor(PointerSensor));
  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const statuses: TaskStatus[] = ["To Do", "In Progress", "Approved", "Reject"];

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    updateTaskStatus(String(active.id), String(over.id) as TaskStatus);
  };

  if (!hasHydrated) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statuses.map((status) => (
          <Swimlane
            key={status}
            status={status}
            tasks={filtered.filter((t) => t.status === status)}
          />
        ))}
      </div>
    </DndContext>
  );
}
