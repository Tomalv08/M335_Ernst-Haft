import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-berechtigung',
  templateUrl: './berechtigung.page.html',
  styleUrls: ['./berechtigung.page.scss'],
  imports: [
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonFooter,
    RouterLink
  ]
})
export class BerechtigungPage implements OnInit {
  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  async handleCameraPermission() {
    // Überprüfen der Kamera-Berechtigungen
    const permissions = await Camera.checkPermissions();

    if (permissions.camera === 'granted') {
      // Berechtigung bereits erteilt, Popup anzeigen
      await this.showAlreadyGrantedAlert();
    } else {
      // Berechtigungen anfordern
      const request = await Camera.requestPermissions({ permissions: ['camera'] });

      if (request.camera !== 'granted') {
        console.error('Kamerazugriff nicht erteilt');
        return; // Beenden, wenn die Berechtigung abgelehnt wurde
      }

      // Wenn Berechtigung erteilt wurde, Benachrichtigung anzeigen
      await this.showAlert();
    }
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Zugriffsbestätigung',
      message: 'Du hast die Kamera-Berechtigung erteilt!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showAlreadyGrantedAlert() {
    const alert = await this.alertController.create({
      header: 'Hinweis',
      message: 'Die Kamera-Berechtigung wurde bereits erteilt.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
