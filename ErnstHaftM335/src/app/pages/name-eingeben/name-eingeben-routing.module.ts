import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NameEingebenPage } from './name-eingeben.page';

const routes: Routes = [
  {
    path: '',
    component: NameEingebenPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NameEingebenPageRoutingModule {}
