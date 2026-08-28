import { createReducer, on } from '@ngrx/store';
import { Task } from '../../core/models';
import {
  loadTasks, loadTasksSuccess, loadTasksFailure,
  createTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
} from './task.actions';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const taskReducer = createReducer(
  initialState,
  on(loadTasks,        state => ({ ...state, loading: true, error: null })),
  on(loadTasksSuccess, (state, { tasks }) => ({ ...state, loading: false, tasks })),
  on(loadTasksFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(createTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),

  on(updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? task : t)),
  })),

  on(deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== id),
  })),
);
