import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskStatus, Priority, CreateTaskDto, UpdateTaskDto } from '../models';

@Injectable({
  providedIn: 'root', // registered in the root injector — one singleton instance across the app
})
export class TaskService {
  private nextId = 6;

  private readonly initialTasks: Task[] = [
    {
      id: 1,
      title: 'Set up project repository',
      description: 'Initialize Git and push to GitHub.',
      priority: Priority.High,
      status: TaskStatus.Done,
      assignee: 'Wat',
      dueDate: '2026-08-27',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ['setup', 'devops'],
    },
    {
      id: 2,
      title: 'Define Angular module architecture',
      description: 'Create CoreModule, SharedModule, and WorkplanModule.',
      priority: Priority.High,
      status: TaskStatus.Done,
      assignee: 'Wat',
      dueDate: '2026-08-27',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ['angular', 'architecture'],
    },
    {
      id: 3,
      title: 'Build task components',
      description: 'Create board, list, and card components.',
      priority: Priority.Medium,
      status: TaskStatus.InProgress,
      assignee: 'Wat',
      dueDate: '2026-08-28',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ['angular', 'components'],
    },
    {
      id: 4,
      title: 'Implement HTTP service with json-server',
      description: 'Replace in-memory data with real REST API calls.',
      priority: Priority.Medium,
      status: TaskStatus.Todo,
      assignee: 'Wat',
      dueDate: '2026-08-28',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ['angular', 'http'],
    },
    {
      id: 5,
      title: 'Add NgRx state management',
      description: 'Migrate task state to NgRx store with actions and effects.',
      priority: Priority.Low,
      status: TaskStatus.Todo,
      assignee: 'Wat',
      dueDate: '2026-08-29',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ['ngrx', 'state'],
    },
  ];

  // BehaviorSubject holds current state and replays the latest value to new subscribers
  private tasksSubject = new BehaviorSubject<Task[]>(this.initialTasks);

  // Expose as read-only Observable — components cannot push values directly
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  getTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  getTaskById(id: number): Task | undefined {
    return this.tasksSubject.getValue().find(t => t.id === id);
  }

  createTask(dto: CreateTaskDto): Task {
    const now = new Date().toISOString();
    const newTask: Task = { ...dto, id: this.nextId++, createdAt: now, updatedAt: now };
    this.tasksSubject.next([...this.getTasks(), newTask]);
    return newTask;
  }

  updateTask(id: number, dto: UpdateTaskDto): Task | undefined {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return undefined;

    const updated = { ...tasks[index], ...dto, updatedAt: new Date().toISOString() };
    const next = [...tasks];
    next[index] = updated;
    this.tasksSubject.next(next);
    return updated;
  }

  deleteTask(id: number): void {
    this.tasksSubject.next(this.getTasks().filter(t => t.id !== id));
  }
}
