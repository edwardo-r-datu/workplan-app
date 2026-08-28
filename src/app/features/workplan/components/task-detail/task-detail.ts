import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskStatus, Priority } from '../../../../core/models';
import { TaskService } from '../../../../core/services/task';

@Component({
  selector: 'app-task-detail',
  standalone: false,
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail implements OnInit {
  task: Task | undefined;

  readonly priorities = Object.values(Priority);
  readonly statuses = Object.values(TaskStatus);

  constructor(
    private route: ActivatedRoute,  // provides access to the current route's params
    private router: Router,         // used for programmatic navigation
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    // Read the :id param from the URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTaskById(id);
  }

  onSave(): void {
    if (!this.task) return;
    this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
      this.router.navigate(['/workplan']);
    });
  }

  onBack(): void {
    this.router.navigate(['/workplan']);
  }
}
