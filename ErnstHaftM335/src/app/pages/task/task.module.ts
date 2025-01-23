import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // This imports all Ionic components
import { TaskPageRoutingModule } from './task-routing.module';
import { TaskPage } from './task.page';
import { Task1Component } from '../../components/task1/task1.component';
import { Task2Component } from '../../components/task2/task2.component';
import { Task3Component } from '../../components/task3/task3.component';
import { Task4Component } from '../../components/task4/task4.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskPageRoutingModule,
    TaskPage,
    Task1Component,
    Task2Component,
    Task3Component,
    Task4Component
  ]
})
export class TaskPageModule {}
