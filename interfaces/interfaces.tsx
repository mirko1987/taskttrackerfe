export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}


export interface TaskRepository {
  getTasks(): Promise<Task[]>;
  createTask(task: CreateTaskRequest): Promise<Task>;
  completeTask(id: number): Promise<Task>;
}

// Validator interface (OCP, ISP)
export interface TaskValidator {
  validateTitle(title: string): ValidationResult;
  validateDescription(description: string): ValidationResult;
  validateTask(task: CreateTaskRequest): ValidationResult;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// HTTP Client interface (DIP, ISP)
export interface HttpClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
  put<T>(url: string, data?: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
  patch<T>(url: string, data: any): Promise<T>;
}
