export type TaskStatus = 'New' | 'Active' | 'Review' | 'Solved' | 'Completed' | 'Pending';

export interface PlannedTerm {
  startDate: string;
  endDate: string;
}

export interface GanttTask {
  id: number;
  title: string;
  description?: string | null;
  assignedTo?: string | null;
  status: TaskStatus;
  plannedTerm: PlannedTerm;
}

export type TaskInput = Omit<GanttTask, 'id'>;
