import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { WorkplanBoard } from './workplan-board';
import { AppState } from '../../../../store';
import { TaskState } from '../../../../store/task/task.reducer';
import { loadTasks, deleteTask, updateTask } from '../../../../store/task/task.actions';
import { Task, TaskStatus, Priority } from '../../../../core/models';

const mockTask: Task = {
  id: 1,
  title: 'Test Task',
  description: 'A test task',
  priority: Priority.High,
  status: TaskStatus.Todo,
  assignee: 'Wat',
  dueDate: '2026-08-29',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  tags: ['test'],
};

const initialTaskState: TaskState = { tasks: [], loading: false, error: null };
const initialState: Partial<AppState> = { tasks: initialTaskState };

describe('WorkplanBoard', () => {
  let component: WorkplanBoard;
  let fixture: ComponentFixture<WorkplanBoard>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkplanBoard],
      providers: [provideMockStore({ initialState })],
      schemas: [NO_ERRORS_SCHEMA], // suppress child component errors in unit test
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(WorkplanBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTasks on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(loadTasks());
  });

  it('should filter tasks by status correctly', () => {
    component.tasks = [
      { ...mockTask, id: 1, status: TaskStatus.Todo },
      { ...mockTask, id: 2, status: TaskStatus.Done },
      { ...mockTask, id: 3, status: TaskStatus.Todo },
    ];
    expect(component.getTasksByStatus(TaskStatus.Todo).length).toBe(2);
    expect(component.getTasksByStatus(TaskStatus.Done).length).toBe(1);
    expect(component.getTasksByStatus(TaskStatus.InProgress).length).toBe(0);
  });

  it('should dispatch deleteTask when a task is deleted', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onTaskDeleted(1);
    expect(dispatchSpy).toHaveBeenCalledWith(deleteTask({ id: 1 }));
  });

  it('should dispatch updateTask when status changes', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onStatusChanged({ task: mockTask, status: TaskStatus.Done });
    expect(dispatchSpy).toHaveBeenCalledWith(
      updateTask({ id: mockTask.id, dto: { status: TaskStatus.Done } })
    );
  });

  it('should toggle the add form', () => {
    expect(component.showAddForm).toBeFalse();
    component.toggleAddForm();
    expect(component.showAddForm).toBeTrue();
    component.toggleAddForm();
    expect(component.showAddForm).toBeFalse();
  });
});
