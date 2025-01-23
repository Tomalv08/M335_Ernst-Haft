import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
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

  // Kamera-Berechtigung
  async handleCameraPermission() {
    console.log('Prüfe Kamera-Berechtigung...');

    const permissions = await Camera.checkPermissions();
    console.log('Aktueller Kamera-Berechtigungsstatus:', permissions.camera);

    if (permissions.camera === 'granted') {
      console.log('Kamera-Berechtigung bereits erteilt.');
      await this.showAlreadyGrantedAlert('Kamera');
    } else {
      console.log('Fordere Kamera-Berechtigung an...');
      const request = await Camera.requestPermissions({ permissions: ['camera'] });
      console.log('Angeforderter Kamera-Berechtigungsstatus:', request.camera);

      if (request.camera !== 'granted') {
        console.error('Kamerazugriff nicht erteilt.');
        return;
      }

      console.log('Kamera-Berechtigung erfolgreich erteilt.');
      await this.showAlert('Kamera');
    }
  }

  // Geolocation-Berechtigung
  async handleGeolocationPermission() {
    console.log('Prüfe Standort-Berechtigung...');

    const permissions = await Geolocation.checkPermissions();
    console.log('Aktueller Standort-Berechtigungsstatus:', permissions.location);

    if (permissions.location === 'granted') {
      console.log('Standort-Berechtigung bereits erteilt.');
      await this.showAlreadyGrantedAlert('Standort');
    } else {
      console.log('Fordere Standort-Berechtigung an...');
      const request = await Geolocation.requestPermissions();
      console.log('Angeforderter Standort-Berechtigungsstatus:', request.location);

      if (request.location !== 'granted') {
        console.error('Standortzugriff nicht erteilt.');
        return;
      }

      console.log('Standort-Berechtigung erfolgreich erteilt.');
      await this.showAlert('Standort');
    }
  }

  // Generischer Alert für erteilte Berechtigung
  async showAlert(permissionType: string) {
    console.log(`${permissionType}-Berechtigung erteilt. Zeige Bestätigungs-Popup.`);
    const alert = await this.alertController.create({
      header: 'Zugriffsbestätigung',
      message: `Du hast die ${permissionType}-Berechtigung erteilt!`,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Generischer Alert für bereits erteilte Berechtigung
  async showAlreadyGrantedAlert(permissionType: string) {
    console.log(`${permissionType}-Berechtigung wurde bereits erteilt. Zeige Hinweis-Popup.`);
    const alert = await this.alertController.create({
      header: 'Hinweis',
      message: `Die ${permissionType}-Berechtigung wurde bereits erteilt.`,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
