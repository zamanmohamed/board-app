import { Task } from "@/types/task";
import { useDraggable } from "@dnd-kit/core";
import { GripVertical, MessageSquare, Paperclip } from "lucide-react";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-4 rounded-md shadow-sm border hover:shadow-md transition mb-3"
    >
      {/* Title & Drag Handle */}
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-sm">{task.title}</h4>
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-2">
        {task.tags?.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-xs text-gray-600 px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Priority & Due Date */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`
            text-xs font-medium px-2 py-0.5 rounded-full
            ${
              task.priority === "High"
                ? "bg-red-100 text-red-600"
                : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }
          `}
        >
          {task.priority}
        </span>

        {task.dueDate && (
          <span className="text-xs text-gray-400">{task.dueDate}</span>
        )}
      </div>

      {/* Comments / Attachments / Assignees */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-3 text-gray-500 text-sm">
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            {task.commentsCount ?? 0}
          </span>
          <span className="flex items-center gap-1">
            <Paperclip className="w-3.5 h-3.5" />
            {task.attachments ?? 0}
          </span>
        </div>

        {/* Assignees (use emoji or avatar images) */}
        <div className="flex -space-x-1">
          {task.assignees?.map((assignee, index) => (
            <span key={index} className="text-base">
              {assignee}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
