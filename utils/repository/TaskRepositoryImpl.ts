import { TaskRepository, Task, CreateTaskRequest, HttpClient } from '../../interfaces/interfaces';

export class TaskRepositoryImpl implements TaskRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async getTasks(): Promise<Task[]> {
    return this.httpClient.get<Task[]>('/tasks');
  }

  async createTask(task: CreateTaskRequest): Promise<Task> {
    return this.httpClient.post<Task>('/tasks', task);
  }

  async completeTask(id: number): Promise<Task> {
    return this.httpClient.put<Task>(`/tasks/${id}/complete`);
  }

  async deleteTask(id: number): Promise<void> {
    await this.httpClient.delete<void>(`/tasks/${id}`);
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<Task> {
    return this.httpClient.patch<Task>(`/tasks/${id}`, updates);
  }
}