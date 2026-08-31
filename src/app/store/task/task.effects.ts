import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
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
  loadTasks$: Observable<Action>;
  createTask$: Observable<Action>;
  updateTask$: Observable<Action>;
  deleteTask$: Observable<Action>;

  constructor(private actions$: Actions, private taskService: TaskService) {
    // Effects are defined in the constructor so this.actions$ is guaranteed to be assigned
    this.loadTasks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadTasks),
        switchMap(() =>
          this.taskService.loadTasks().pipe(
            map(tasks => loadTasksSuccess({ tasks })),
            catchError(err => of(loadTasksFailure({ error: err?.message ?? 'Load failed' }))),
          ),
        ),
      ),
    );

    this.createTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(createTask),
        switchMap(({ dto }) =>
          this.taskService.createTask(dto).pipe(
            map(task => createTaskSuccess({ task })),
          ),
        ),
      ),
    );

    this.updateTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(updateTask),
        switchMap(({ id, dto }) =>
          this.taskService.updateTask(id, dto).pipe(
            map(task => updateTaskSuccess({ task })),
          ),
        ),
      ),
    );

    this.deleteTask$ = createEffect(() =>
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
}
