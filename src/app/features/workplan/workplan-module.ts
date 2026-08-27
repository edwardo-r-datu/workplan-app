import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared-module';
import { WorkplanRoutingModule } from './workplan-routing-module';
import { WorkplanBoard } from './components/workplan-board/workplan-board';
import { TaskList } from './components/task-list/task-list';
import { TaskCard } from './components/task-card/task-card';

@NgModule({
  declarations: [WorkplanBoard, TaskList, TaskCard],
  imports: [SharedModule, WorkplanRoutingModule],
})
export class WorkplanModule {}
