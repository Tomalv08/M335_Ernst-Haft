import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { Haptics } from '@capacitor/haptics';
import { AlertController } from '@ionic/angular';
import {IonImg} from "@ionic/angular/standalone";

@Component({
  selector: 'app-task4',
  templateUrl: './task4.component.html',
  styleUrls: ['./task4.component.scss'],
  imports: [
    IonImg
  ]
})
export class Task4Component implements OnInit {
  @Input() moveToNextTask!: () => void;
  isCharging: boolean = false;

  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.checkBatteryStatus();
  }

  async checkBatteryStatus() {
    const intervalId = setInterval(async () => {
      const info = await Device.getBatteryInfo();
      this.isCharging = !!info.isCharging;

      if (this.isCharging) {
        clearInterval(intervalId); // Stop checking once charging is detected
        this.showSuccessAlert(); // Show success alert
      }
    }, 5000);
  }
  navigateToEnd() {
    this.router.navigate(['/endpage']);
  }
  async showSuccessAlert() {
    // Trigger vibration
    await this.hapticsVibrate();

    const alert = await this.alertController.create({
      header: 'Aufgabe abgeschlossen',
      message: 'Das Gerät wird jetzt aufgeladen.',
      buttons: [
        {
          text: 'Abschliessen',
          handler: () => {
            this.navigateToEnd(); // Go to the next task
          }
        }
      ]
    });

    await alert.present();
  }

  async hapticsVibrate() {
    await Haptics.vibrate();
  }
}
