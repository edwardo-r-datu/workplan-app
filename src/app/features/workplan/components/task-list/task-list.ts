import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Task, TaskStatus } from '../../../../core/models';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
  // OnPush + trackBy: list only re-renders when the tasks array reference changes
  changeDetection: ChangeDetectionStrategy.OnPush,
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
