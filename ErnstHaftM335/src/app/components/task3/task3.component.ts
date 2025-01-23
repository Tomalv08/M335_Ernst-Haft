import { Component, OnInit, Input } from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg} from "@ionic/angular/standalone";

@Component({
  selector: 'app-task3',
  templateUrl: './task3.component.html',
  styleUrls: ['./task3.component.scss'],
  imports: [
    DecimalPipe,
    IonButton,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ]
})
export class Task3Component  implements OnInit {
  @Input() moveToNextTask!: () => void;


  constructor() { }


  ngOnInit() {}

  onTaskComplete() {

  }
}
