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

  // Angular's DI system resolves TaskService from the root injector and injects it here
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Subscribe to the observable — tasks update automatically whenever the service state changes
    this.taskService.tasks$.subscribe(tasks => (this.tasks = tasks));
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  onStatusChanged({ task, status }: { task: Task; status: TaskStatus }): void {
    this.taskService.updateTask(task.id, { status });
  }

  onTaskDeleted(id: number): void {
    this.taskService.deleteTask(id);
  }
}
