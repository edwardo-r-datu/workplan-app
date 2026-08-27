import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskStatus } from '../../../../core/models';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  @Input() title!: string;
  @Input() tasks: Task[] = [];
  @Output() statusChanged = new EventEmitter<{ task: Task; status: TaskStatus }>();
  @Output() taskDeleted = new EventEmitter<number>();

  trackById(_index: number, task: Task): number {
    return task.id;
  }
}
