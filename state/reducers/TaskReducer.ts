import { Task } from '../../interfaces/interfaces';
import { TaskAction } from '../actions/TaskAction';

// State interface definition
export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  refreshing: boolean;
}

// Initial state
export const initialTaskState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  refreshing: false,
};

// Pure reducer function following Redux pattern
export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
        error: action.payload ? null : state.error, // Clear error when starting new loading
      };

    case 'SET_REFRESHING':
      return {
        ...state,
        refreshing: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,      // Stop loading when error occurs
        refreshing: false,   // Stop refreshing when error occurs
      };

    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        loading: false,      // Loading complete
        refreshing: false,   // Refreshing complete
        error: null,         // Clear any previous errors
      };

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks], // Add new task at the beginning
        loading: false,
        error: null,
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id 
            ? action.payload          // Replace task with updated version
            : task                    // Keep existing task unchanged
        ),
        loading: false,
        error: null,
      };

    case 'COMPLETE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload 
            ? { ...task, completed: true } // Mark task as completed
            : task                         // Keep other tasks unchanged
        ),
        loading: false,
        error: null,
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload), // Remove task from array
        loading: false,
        error: null,
      };

    case 'RESET_STATE':
      return initialTaskState; // Reset to initial state

    default:
      return state; // Return current state for unknown actions
  }
};
