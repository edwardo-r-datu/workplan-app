import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Task, Priority, TaskStatus } from '../../../../core/models';

@Component({
  selector: 'app-task-card',
  standalone: false,
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
  // OnPush: re-renders only when @Input references change, or an event/Observable emits
  // Prevents unnecessary re-renders when parent change detection runs
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCard {
  @Input() task!: Task;
  @Output() statusChanged = new EventEmitter<{ task: Task; status: TaskStatus }>();
  @Output() taskDeleted = new EventEmitter<number>();

  readonly Priority = Priority;
  readonly TaskStatus = TaskStatus;

  onStatusChange(status: TaskStatus): void {
    this.statusChanged.emit({ task: this.task, status });
  }

  onDelete(): void {
    this.taskDeleted.emit(this.task.id);
  }

  isOverdue(): boolean {
    return (
      this.task.status !== TaskStatus.Done &&
      this.task.status !== TaskStatus.Cancelled &&
      new Date(this.task.dueDate) < new Date()
    );
  }
}
