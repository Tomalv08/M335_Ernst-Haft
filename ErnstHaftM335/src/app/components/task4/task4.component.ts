import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { Haptics } from '@capacitor/haptics';
import { AlertController } from '@ionic/angular';
import { IonButton, IonImg } from '@ionic/angular/standalone';
import { GameDataService } from '../../shared/game-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task4',
  templateUrl: './task4.component.html',
  styleUrls: ['./task4.component.scss'],
  imports: [IonImg, IonButton, CommonModule],
})
export class Task4Component implements OnInit {
  @Input() moveToNextTask!: () => void;
  @Input() endGame!: (
    playerName: string,
    gameTime: string,
    rewards: string[],
  ) => void;

  isCharging: boolean = false;

  constructor(
    private alertController: AlertController,
    private router: Router,
    protected gameDataService: GameDataService,
  ) {}

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
    await this.hapticsVibrate();
    const alert = await this.alertController.create({
      header: 'Aufgabe abgeschlossen',
      message: 'Das Gerät wird jetzt aufgeladen.',
      buttons: [
        {
          text: 'Abschliessen',
          handler: () => {
            this.endGame(
              this.gameDataService.getPlayerName(),
              this.gameDataService.getGameTime(),
              this.gameDataService.getRewards(),
            );
          },
        },
      ],
    });
    await alert.present();
  }

  async hapticsVibrate() {
    await Haptics.vibrate();
  }
}
