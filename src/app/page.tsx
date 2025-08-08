import DashboardClient from "@/components/dashboard/DashboardClient";
import rawTasks from "@/data/tasks.json";
import { Task, TaskStatus } from "@/types/task";

export default async function DashboardPage() {
  const tasks: Task[] = rawTasks.map((task: any) => ({
    id: task.id,
    title: task.title,
    description: task.description ?? "",
    status: task.status as TaskStatus,
    tags: task.tags ?? [],
    assignees: task.assignees ?? [],
    commentsCount: task.commentsCount ?? 0,
    filesCount: task.filesCount ?? 0,
    attachments: task.attachments ?? 0,
    dueDate: task.dueDate ?? undefined,
    priority: task.priority as "Low" | "Medium" | "High",
  }));

  return <DashboardClient initialTasks={tasks} />;
}
