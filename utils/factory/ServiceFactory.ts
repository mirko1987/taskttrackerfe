import { TaskRepository } from '../../interfaces/interfaces';
import { TaskRepositoryImpl } from '../repository/TaskRepositoryImpl';
import { AxiosHttpClient } from '../network/AxiosHttpClient';

// Configuration
const API_BASE_URL = 'http://localhost:8080';

class ServiceFactory {
  private static instance: ServiceFactory;
  private taskRepository: TaskRepository | null = null;

  private constructor() {}

  public static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  public getTaskRepository(): TaskRepository {
    if (!this.taskRepository) {
      const httpClient = new AxiosHttpClient(API_BASE_URL);
      this.taskRepository = new TaskRepositoryImpl(httpClient);
    }
    return this.taskRepository;
  }
}

export default ServiceFactory;