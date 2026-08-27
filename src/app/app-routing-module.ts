import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'workplan', pathMatch: 'full' },
  {
    path: 'workplan',
    loadChildren: () =>
      import('./features/workplan/workplan-module').then(m => m.WorkplanModule),
  },
  { path: '**', redirectTo: 'workplan' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
