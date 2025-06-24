import { Task } from '../../interfaces/interfaces';

export type TaskAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_REFRESHING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'COMPLETE_TASK'; payload: number }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'RESET_STATE' };

export const taskActions = {
  setLoading: (loading: boolean): TaskAction => ({
    type: 'SET_LOADING',
    payload: loading,
  }),
  
  setRefreshing: (refreshing: boolean): TaskAction => ({
    type: 'SET_REFRESHING',
    payload: refreshing,
  }),
  
  setError: (error: string | null): TaskAction => ({
    type: 'SET_ERROR',
    payload: error,
  }),
  
  setTasks: (tasks: Task[]): TaskAction => ({
    type: 'SET_TASKS',
    payload: tasks,
  }),
  
  addTask: (task: Task): TaskAction => ({
    type: 'ADD_TASK',
    payload: task,
  }),
  
  updateTask: (task: Task): TaskAction => ({
    type: 'UPDATE_TASK',
    payload: task,
  }),
  
  completeTask: (id: number): TaskAction => ({
    type: 'COMPLETE_TASK',
    payload: id,
  }),

  deleteTask: (id: number): TaskAction => ({
    type: 'DELETE_TASK',
    payload: id,
  }),
  
  resetState: (): TaskAction => ({
    type: 'RESET_STATE',
  }),
};