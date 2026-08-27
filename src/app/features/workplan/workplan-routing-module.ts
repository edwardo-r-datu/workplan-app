import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkplanBoard } from './components/workplan-board/workplan-board';

const routes: Routes = [
  { path: '', component: WorkplanBoard },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkplanRoutingModule {}
