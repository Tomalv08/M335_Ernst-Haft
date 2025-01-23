import { Component, OnInit } from '@angular/core';
import {IonButton, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-endpage',
  templateUrl: './endpage.page.html',
  styleUrls: ['./endpage.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonButton
  ]
})
export class EndpagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
