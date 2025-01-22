import { Component } from '@angular/core';
import {IonButton, IonContent, IonHeader, IonImg, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-task1',
  templateUrl: './task1.component.html',
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonImg,
    IonButton
  ],
  styleUrls: ['./task1.component.scss']
})
export class Task1Component {
  completeTask() {
    console.log('Task 1 completed!');
  }
}
