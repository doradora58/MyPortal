import type { GanttTask, TaskInput } from './types';

const tasksUrl = '/gantt-api/Tasks';

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });
  } catch {
    throw new Error('タスクサーバーに接続できません。Docker Composeの起動状態を確認してください。');
  }

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `リクエストに失敗しました (${response.status})`);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const taskApi = {
  getAll: () => request<GanttTask[]>(tasksUrl),
  create: (task: TaskInput) =>
    request<GanttTask>(tasksUrl, { method: 'POST', body: JSON.stringify(task) }),
  update: (task: GanttTask) =>
    request<GanttTask>(`${tasksUrl}/${task.id}`, { method: 'PUT', body: JSON.stringify(task) }),
  remove: (id: number) =>
    request<void>(`${tasksUrl}/${id}`, { method: 'DELETE' }),
};
