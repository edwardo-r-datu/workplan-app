import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task, TaskStatus, Priority, CreateTaskDto } from '../../../../core/models';
import { TaskService } from '../../../../core/services/task';

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

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => (this.tasks = tasks));

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

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  // Template-driven form submit — ngForm reference passed from template
  onAddTask(form: NgForm): void {
    if (form.invalid) return;

    this.taskService.createTask({ ...this.newTask }).subscribe(() => {
      // Reset the form and model after successful save
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
    });
  }
}
