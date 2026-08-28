import { createAction, props } from '@ngrx/store';
import { Task, CreateTaskDto, UpdateTaskDto } from '../../core/models';

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction('[Task] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Task] Load Tasks Failure', props<{ error: string }>());

export const createTask = createAction('[Task] Create Task', props<{ dto: CreateTaskDto }>());
export const createTaskSuccess = createAction('[Task] Create Task Success', props<{ task: Task }>());

export const updateTask = createAction('[Task] Update Task', props<{ id: number; dto: UpdateTaskDto }>());
export const updateTaskSuccess = createAction('[Task] Update Task Success', props<{ task: Task }>());

export const deleteTask = createAction('[Task] Delete Task', props<{ id: number }>());
export const deleteTaskSuccess = createAction('[Task] Delete Task Success', props<{ id: number }>());
