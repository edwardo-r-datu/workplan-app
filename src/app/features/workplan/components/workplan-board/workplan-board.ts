import { Component, OnInit } from '@angular/core';
import { Task, TaskStatus } from '../../../../core/models';
import { TaskService } from '../../../../core/services/task';

@Component({
  selector: 'app-workplan-board',
  standalone: false,
  templateUrl: './workplan-board.html',
  styleUrl: './workplan-board.scss',
})
export class WorkplanBoard implements OnInit {
  readonly TaskStatus = TaskStatus;
  tasks: Task[] = [];
  loading = true;
  error = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => (this.tasks = tasks));

    // Fetch from API on load
    this.taskService.loadTasks().subscribe({
      next: () => (this.loading = false),
      error: () => {
        this.loading = false;
        this.error = 'Failed to load tasks. Is the API server running? (npm run api)';
      },
    });
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  onStatusChanged({ task, status }: { task: Task; status: TaskStatus }): void {
    this.taskService.updateTask(task.id, { status }).subscribe();
  }

  onTaskDeleted(id: number): void {
    this.taskService.deleteTask(id).subscribe();
  }
}
