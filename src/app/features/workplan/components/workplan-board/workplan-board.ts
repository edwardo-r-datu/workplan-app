import { Component } from '@angular/core';
import { Task, TaskStatus, Priority } from '../../../../core/models';

@Component({
  selector: 'app-workplan-board',
  standalone: false,
  templateUrl: './workplan-board.html',
  styleUrl: './workplan-board.scss',
})
export class WorkplanBoard {
  readonly TaskStatus = TaskStatus;

  tasks: Task[] = [
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

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  onStatusChanged({ task, status }: { task: Task; status: TaskStatus }): void {
    const target = this.tasks.find(t => t.id === task.id);
    if (target) {
      target.status = status;
      target.updatedAt = new Date().toISOString();
    }
  }

  onTaskDeleted(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}
