import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NameEingebenPageRoutingModule } from './name-eingeben-routing.module';

import { NameEingebenPage } from './name-eingeben.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NameEingebenPageRoutingModule,
    NameEingebenPage
  ],
  declarations: []
})
export class NameEingebenPageModule {}
