"use client";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useTaskStore } from "@/store/useTaskStore";
import TaskCard from "./TaskCard";
import { TaskStatus, Task } from "@/types/task";
import { cn } from "@/lib/utils";

interface SwimlaneProps {
  status: TaskStatus;
  tasks: Task[];
}

export default function Swimlane({ status, tasks }: SwimlaneProps) {
  const { updateTaskStatus } = useTaskStore();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      updateTaskStatus(active.id as string, status);
    }
  };

  const statusColor = {
    "To Do": "bg-gray-100",
    "In Progress": "bg-yellow-100",
    Approved: "bg-green-100",
    Reject: "bg-red-100",
  };

  return (
    <div className="flex flex-col gap-4 p-3 border rounded-md bg-white min-h-[500px]">
      <div className="flex justify-between items-center">
        <h2
          className={cn("text-sm font-semibold px-2 py-1 rounded", {
            "bg-gray-200 text-gray-700": status === "To Do",
            "bg-yellow-300 text-yellow-800": status === "In Progress",
            "bg-green-300 text-green-800": status === "Approved",
            "bg-red-300 text-red-800": status === "Reject",
          })}
        >
          {status}
        </h2>
        <span className="text-xs text-gray-400">{tasks.length} Tasks</span>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={rectSortingStrategy}
        >
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
