import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BerechtigungPage } from './berechtigung.page';

const routes: Routes = [
  {
    path: '',
    component: BerechtigungPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BerechtigungPageRoutingModule {}
