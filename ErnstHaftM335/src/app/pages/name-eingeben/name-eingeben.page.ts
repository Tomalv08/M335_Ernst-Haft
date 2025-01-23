import { Component, OnInit } from '@angular/core';
import {IonContent, IonHeader, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-name-eingeben',
  templateUrl: './name-eingeben.page.html',
  styleUrls: ['./name-eingeben.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
    RouterLink
  ]
})
export class NameEingebenPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  inputValue: string = ''; // Wert des Eingabefelds
  isDisabled: boolean = true; // Button ist standardmäßig deaktivier
  checkInput(): void {
    this.isDisabled = this.inputValue.trim() === '';
  }
}
