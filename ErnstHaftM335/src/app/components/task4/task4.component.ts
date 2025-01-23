import { Component, Input, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { AlertController } from '@ionic/angular';
import {
  IonButton,
  IonCard, IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader, IonImg,
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
    IonButton,
    IonImg
  ]
})
export class Task4Component implements OnInit {
  @Input() moveToNextTask!: () => void;
  isCharging: boolean | undefined = false;

  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.checkBatteryStatus();
  }

  async checkBatteryStatus() {
    // Check battery status every 5 seconds
    const intervalId = setInterval(async () => {
      const info = await Device.getBatteryInfo();
      this.isCharging = info.isCharging;

      if (this.isCharging) {
        clearInterval(intervalId); // Stop checking once charging is detected
        this.showSuccessAlert(); // Show success alert
      }
    }, 5000); // Adjust the interval as needed
  }

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Aufgabe abgeschlossen',
      message: 'Das Gerät wird jetzt aufgeladen.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
