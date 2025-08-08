"use client";

import { cn } from "@/lib/utils";
import { Task } from "@/types/task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, MessageSquareText, Paperclip } from "lucide-react";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColor = {
    Low: "text-green-600 bg-green-100",
    Medium: "text-yellow-600 bg-yellow-100",
    High: "text-red-600 bg-red-100",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "bg-white rounded-lg shadow p-4 border hover:shadow-md cursor-pointer transition-all",
        isDragging && "opacity-50 ring-2 ring-blue-400"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold text-gray-800">
          {task.title}
        </span>
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {task.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3 flex justify-between items-center">
        <span
          className={cn(
            "text-[10px] px-2 py-0.5 rounded-full font-medium",
            priorityColor[task.priority]
          )}
        >
          {task.priority}
        </span>
        <span className="text-[10px] text-gray-400">{task.dueDate}</span>
      </div>

      <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <MessageSquareText className="w-4 h-4" />
          {task.commentsCount}
          <Paperclip className="w-4 h-4 ml-3" />
          {task.filesCount}
        </div>

        <div className="flex items-center -space-x-2">
          {task.assignees.map((a, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full bg-blue-100 text-sm flex items-center justify-center border border-white text-blue-600"
            >
              {a}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
