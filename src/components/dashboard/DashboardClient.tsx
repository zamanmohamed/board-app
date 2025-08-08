"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useTaskStore } from "@/store/useTaskStore";
import { Task, TaskStatus } from "@/types/task";
import Swimlane from "@/components/Board/Swimlane";
import { useRef } from "react";

interface Props {
  initialTasks: Task[];
}

export default function DashboardClient({ initialTasks }: Props) {
  const hasHydrated = useRef(false);
  const { tasks, setTasks, searchQuery, updateTaskStatus } = useTaskStore();
  const statuses: TaskStatus[] = ["To Do", "In Progress", "Approved", "Reject"];

  if (!hasHydrated.current && tasks.length === 0) {
    setTasks(initialTasks);
    hasHydrated.current = true;
  }

  const sensors = useSensors(useSensor(PointerSensor));

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    updateTaskStatus(active.id, over.id);
  };

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
            tasks={filteredTasks.filter((t) => t.status === status)}
          />
        ))}
      </div>
    </DndContext>
  );
}
