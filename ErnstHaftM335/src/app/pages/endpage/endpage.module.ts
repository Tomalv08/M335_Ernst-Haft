import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndpagePageRoutingModule } from './endpage-routing.module';

import { EndpagePage } from './endpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndpagePageRoutingModule,
    EndpagePage,
  ],
  declarations: [],
})
export class EndpagePageModule {}
