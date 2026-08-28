import { createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { TaskStatus } from '../../core/models';

const selectTaskFeature = (state: AppState) => state.tasks;

export const selectAllTasks    = createSelector(selectTaskFeature, s => s.tasks);
export const selectTasksLoading = createSelector(selectTaskFeature, s => s.loading);
export const selectTasksError   = createSelector(selectTaskFeature, s => s.error);

// Status-specific memoized selectors — created once, not per-call
export const selectTodoTasks       = createSelector(selectAllTasks, tasks => tasks.filter(t => t.status === TaskStatus.Todo));
export const selectInProgressTasks = createSelector(selectAllTasks, tasks => tasks.filter(t => t.status === TaskStatus.InProgress));
export const selectDoneTasks       = createSelector(selectAllTasks, tasks => tasks.filter(t => t.status === TaskStatus.Done));
export const selectCancelledTasks  = createSelector(selectAllTasks, tasks => tasks.filter(t => t.status === TaskStatus.Cancelled));
