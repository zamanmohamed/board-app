// app/dashboard/DashboardClient.tsx
"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useTaskStore } from "@/store/useTaskStore";
import { useEffect } from "react";
import Swimlane from "@/components/Board/Swimlane";
import { Task } from "@/types/task";

interface Props {
  initialTasks: Task[];
}

export default function DashboardClient({ initialTasks }: Props) {
  const { setTasks, tasks, searchQuery, updateTaskStatus } = useTaskStore();

  useEffect(() => {
    if (tasks.length === 0) {
      setTasks(initialTasks);
    }
  }, [initialTasks]);

  const sensors = useSensors(useSensor(PointerSensor));

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const taskId = active.id;
    const newStatus = over.id;

    updateTaskStatus(taskId, newStatus);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {["To Do", "In Progress", "Approved", "Reject"].map((status) => (
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
