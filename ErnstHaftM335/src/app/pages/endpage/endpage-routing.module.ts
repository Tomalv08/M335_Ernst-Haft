import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndpagePage } from './endpage.page';

const routes: Routes = [
  {
    path: '',
    component: EndpagePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndpagePageRoutingModule {}
