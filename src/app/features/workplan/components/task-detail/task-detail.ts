import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup;

  readonly priorities = Object.values(Priority);
  readonly statuses = Object.values(TaskStatus);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private fb: FormBuilder, // FormBuilder is injected via DI
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTaskById(id);

    if (this.task) {
      // Build reactive form with validators
      this.form = this.fb.group({
        title:       [this.task.title,       [Validators.required, Validators.minLength(3)]],
        description: [this.task.description],
        priority:    [this.task.priority,    Validators.required],
        status:      [this.task.status,      Validators.required],
        assignee:    [this.task.assignee,    Validators.required],
        dueDate:     [this.task.dueDate,     Validators.required],
      });
    }
  }

  // Convenience getter for clean template access to form controls
  get f() { return this.form.controls; }

  onSave(): void {
    if (!this.task) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched(); // trigger validation display
      return;
    }

    this.taskService.updateTask(this.task.id, this.form.value).subscribe(() => {
      this.router.navigate(['/workplan']);
    });
  }

  onBack(): void {
    this.router.navigate(['/workplan']);
  }
}
