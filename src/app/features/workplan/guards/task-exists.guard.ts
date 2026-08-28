import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TaskService } from '../../../core/services/task';

// Functional guard (modern Angular style) — prevents navigation to a task detail that doesn't exist
export const taskExistsGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const taskService = inject(TaskService);
  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));

  if (taskService.getTaskById(id)) {
    return true;
  }

  return router.createUrlTree(['/workplan']);
};
