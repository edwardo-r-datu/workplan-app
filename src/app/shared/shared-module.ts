import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PriorityLabelPipe } from './pipes/priority-label-pipe';
import { TaskAgePipe } from './pipes/task-age-pipe';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [PriorityLabelPipe, TaskAgePipe],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PriorityLabelPipe,
    TaskAgePipe,
  ],
})
export class SharedModule {}
