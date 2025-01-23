import { Component, Input, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { AlertController } from '@ionic/angular';
import {
  IonButton,
  IonCard, IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-task4',
  templateUrl: './task4.component.html',
  styleUrls: ['./task4.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  ]
})
export class Task4Component implements OnInit {
  @Input() moveToNextTask!: () => void;
  isCharging: boolean = false;

  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.checkBatteryStatus();
  }

  async checkBatteryStatus() {
    const info = await Device.getBatteryInfo();
    this.isCharging = info.isCharging ?? false;
  }

  async connectToCharger() {
    // Simulate connecting to a charger
    this.isCharging = true;
    const alert = await this.alertController.create({
      header: 'Task Completed',
      message: 'You have successfully connected to the charger.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
