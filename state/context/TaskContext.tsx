import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Task, CreateTaskRequest } from '../../interfaces/interfaces';
import { TaskState, taskReducer, initialTaskState } from '../reducers/TaskReducer';
import { taskActions } from '../actions/TaskAction';
import ServiceFactory from '../../utils/factory/ServiceFactory';

// Context interface
interface TaskContextType {
  // State
  state: TaskState;
  
  // Actions
  fetchTasks: () => Promise<void>;
  createTask: (task: CreateTaskRequest) => Promise<void>;
  completeTask: (id: number) => Promise<void>;
  refreshTasks: () => Promise<void>;
  clearError: () => void;
}

// Create context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider component
interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const taskRepository = ServiceFactory.getInstance().getTaskRepository();

  const fetchTasks = async () => {
    try {
      dispatch(taskActions.setLoading(true));
      const tasks = await taskRepository.getTasks();
      dispatch(taskActions.setTasks(tasks));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tasks';
      dispatch(taskActions.setError(errorMessage));
    }
  };

  const createTask = async (taskData: CreateTaskRequest) => {
    try {
      dispatch(taskActions.setLoading(true));
      const newTask = await taskRepository.createTask(taskData);
      dispatch(taskActions.addTask(newTask));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create task';
      dispatch(taskActions.setError(errorMessage));
      throw error; // Re-throw to allow handling in UI
    }
  };

  const completeTask = async (id: number) => {
    try {
      dispatch(taskActions.setLoading(true));
      await taskRepository.completeTask(id);
      dispatch(taskActions.completeTask(id));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to complete task';
      dispatch(taskActions.setError(errorMessage));
    }
  };

  const refreshTasks = async () => {
    try {
      dispatch(taskActions.setRefreshing(true));
      const tasks = await taskRepository.getTasks();
      dispatch(taskActions.setTasks(tasks));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to refresh tasks';
      dispatch(taskActions.setError(errorMessage));
    }
  };

  const clearError = () => {
    dispatch(taskActions.setError(null));
  };

  const contextValue: TaskContextType = {
    state,
    fetchTasks,
    createTask,
    completeTask,
    refreshTasks,
    clearError,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the context
export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;
