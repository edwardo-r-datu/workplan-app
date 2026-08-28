import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { TaskService } from '../../core/services/task';
import {
  loadTasks, loadTasksSuccess, loadTasksFailure,
  createTask, createTaskSuccess,
  updateTask, updateTaskSuccess,
  deleteTask, deleteTaskSuccess,
} from './task.actions';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  // Each effect listens for a specific action, calls the service, and dispatches a result action
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      switchMap(() =>
        this.taskService.loadTasks().pipe(
          map(tasks => loadTasksSuccess({ tasks })),
          catchError(err => of(loadTasksFailure({ error: err.message ?? 'Load failed' }))),
        ),
      ),
    ),
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTask),
      switchMap(({ dto }) =>
        this.taskService.createTask(dto).pipe(
          map(task => createTaskSuccess({ task })),
        ),
      ),
    ),
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTask),
      switchMap(({ id, dto }) =>
        this.taskService.updateTask(id, dto).pipe(
          map(task => updateTaskSuccess({ task })),
        ),
      ),
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      switchMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          map(() => deleteTaskSuccess({ id })),
        ),
      ),
    ),
  );
}
