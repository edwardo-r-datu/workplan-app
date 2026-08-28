import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task, TaskStatus, Priority, CreateTaskDto } from '../../../../core/models';
import { AppState } from '../../../../store';
import {
  loadTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../../../../store/task/task.actions';
import {
  selectAllTasks,
  selectTasksLoading,
  selectTasksError,
} from '../../../../store/task/task.selectors';

@Component({
  selector: 'app-workplan-board',
  standalone: false,
  templateUrl: './workplan-board.html',
  styleUrl: './workplan-board.scss',
})
export class WorkplanBoard implements OnInit {
  readonly TaskStatus = TaskStatus;
  readonly Priority = Priority;
  readonly priorityOptions = Object.values(Priority);

  tasks: Task[] = [];
  loading = true;
  error = '';
  showAddForm = false;

  newTask: Omit<CreateTaskDto, 'tags'> & { tags: string[] } = {
    title: '',
    description: '',
    priority: Priority.Medium,
    status: TaskStatus.Todo,
    assignee: '',
    dueDate: '',
    tags: [],
  };

  // Store is injected via DI — the generic type tells TypeScript the shape of the state
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // Dispatch action — the effect handles the HTTP call
    this.store.dispatch(loadTasks());

    // Select slices of state — returns Observables, subscribe to sync to local properties
    this.store.select(selectAllTasks).subscribe(tasks => (this.tasks = tasks));
    this.store.select(selectTasksLoading).subscribe(loading => (this.loading = loading));
    this.store.select(selectTasksError).subscribe(error => (this.error = error ?? ''));
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  onStatusChanged({ task, status }: { task: Task; status: TaskStatus }): void {
    this.store.dispatch(updateTask({ id: task.id, dto: { status } }));
  }

  onTaskDeleted(id: number): void {
    this.store.dispatch(deleteTask({ id }));
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  onAddTask(form: NgForm): void {
    if (form.invalid) return;
    this.store.dispatch(createTask({ dto: { ...this.newTask } }));
    form.resetForm();
    this.newTask = {
      title: '',
      description: '',
      priority: Priority.Medium,
      status: TaskStatus.Todo,
      assignee: '',
      dueDate: '',
      tags: [],
    };
    this.showAddForm = false;
  }
}
