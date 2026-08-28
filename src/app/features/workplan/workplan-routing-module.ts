import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkplanBoard } from './components/workplan-board/workplan-board';
import { TaskDetail } from './components/task-detail/task-detail';
import { taskExistsGuard } from './guards/task-exists.guard';

const routes: Routes = [
  { path: '', component: WorkplanBoard },
  { path: ':id', component: TaskDetail, canActivate: [taskExistsGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkplanRoutingModule {}
