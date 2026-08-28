import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PriorityLabelPipe } from './pipes/priority-label-pipe';
import { TaskAgePipe } from './pipes/task-age-pipe';
import { OverdueHighlight } from './directives/overdue-highlight';
import { AutoFocus } from './directives/auto-focus';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [PriorityLabelPipe, TaskAgePipe, OverdueHighlight, AutoFocus],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PriorityLabelPipe,
    TaskAgePipe,
    OverdueHighlight,
    AutoFocus,
  ],
})
export class SharedModule {}
