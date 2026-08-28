import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError, switchMap } from 'rxjs';
import { Task, CreateTaskDto, UpdateTaskDto } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'http://localhost:3000/tasks';

  // BehaviorSubject still acts as a local cache so the board reacts instantly
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {}

  // GET /tasks — load all tasks and populate the local cache
  loadTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap(tasks => this.tasksSubject.next(tasks)),        // side-effect: update cache
      catchError(err => {
        console.error('Failed to load tasks', err);
        return throwError(() => err);                     // re-throw so the caller can handle it
      }),
    );
  }

  getTaskById(id: number): Task | undefined {
    return this.tasksSubject.getValue().find(t => t.id === id);
  }

  // POST /tasks
  createTask(dto: CreateTaskDto): Observable<Task> {
    const now = new Date().toISOString();
    const payload = { ...dto, createdAt: now, updatedAt: now };

    return this.http.post<Task>(this.apiUrl, payload).pipe(
      tap(created => this.tasksSubject.next([...this.tasksSubject.getValue(), created])),
    );
  }

  // PATCH /tasks/:id — send only changed fields
  updateTask(id: number, dto: UpdateTaskDto): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, { ...dto, updatedAt: new Date().toISOString() }).pipe(
      tap(updated => {
        const tasks = this.tasksSubject.getValue().map(t => (t.id === id ? updated : t));
        this.tasksSubject.next(tasks);
      }),
    );
  }

  // DELETE /tasks/:id
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.tasksSubject.next(this.tasksSubject.getValue().filter(t => t.id !== id))),
    );
  }
}
