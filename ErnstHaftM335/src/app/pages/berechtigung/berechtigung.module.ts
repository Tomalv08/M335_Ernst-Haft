import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BerechtigungPageRoutingModule } from './berechtigung-routing.module';

import { BerechtigungPage } from './berechtigung.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BerechtigungPageRoutingModule,
    BerechtigungPage,
  ],

  declarations: [],
})
export class BerechtigungPageModule {}
