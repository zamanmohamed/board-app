export type TaskStatus = "To Do" | "In Progress" | "Approved" | "Reject";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  tags: string[];
  assignees: string[];
  commentsCount: number;
  filesCount: number;
  dueDate?: string;
  priority: "Low" | "Medium" | "High";
  attachments: number;
}
