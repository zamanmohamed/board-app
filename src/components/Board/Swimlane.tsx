import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { Task } from "@/types/task";

interface SwimlaneProps {
  status: string;
  tasks: Task[];
}

export default function Swimlane({ status, tasks }: SwimlaneProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div ref={setNodeRef} className="bg-gray-100 p-4 rounded-md min-h-[300px]">
      <div className="font-bold mb-2">{status}</div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
