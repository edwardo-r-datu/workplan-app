import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplanBoard } from './workplan-board';

describe('WorkplanBoard', () => {
  let component: WorkplanBoard;
  let fixture: ComponentFixture<WorkplanBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkplanBoard],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkplanBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
