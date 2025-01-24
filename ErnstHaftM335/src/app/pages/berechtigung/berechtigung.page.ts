import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Router, RouterLink } from '@angular/router'; // Importiere den Router
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
  IonToolbar,
} from '@ionic/angular/standalone';

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
    RouterLink,
  ],
})
export class BerechtigungPage implements OnInit {
  // Variablen zum Überwachen des Berechtigungsstatus
  cameraPermissionGranted = false;
  geolocationPermissionGranted = false;

  constructor(
    private alertController: AlertController,
    private router: Router,
  ) {}

  ngOnInit() {}

  // Kamera-Berechtigung
  async handleCameraPermission() {
    console.log('Prüfe Kamera-Berechtigung...');
    const permissions = await Camera.checkPermissions();
    console.log('Aktueller Kamera-Berechtigungsstatus:', permissions.camera);

    if (permissions.camera === 'granted') {
      console.log('Kamera-Berechtigung bereits erteilt.');
      this.cameraPermissionGranted = true; // Setze Kamera-Berechtigung auf wahr
      await this.showAlreadyGrantedAlert('Kamera');
    } else {
      console.log('Fordere Kamera-Berechtigung an...');
      const request = await Camera.requestPermissions({
        permissions: ['camera'],
      });
      console.log('Angeforderter Kamera-Berechtigungsstatus:', request.camera);

      if (request.camera === 'granted') {
        console.log('Kamera-Berechtigung erfolgreich erteilt.');
        this.cameraPermissionGranted = true; // Setze Kamera-Berechtigung auf wahr
        await this.showAlert('Kamera');
      } else {
        console.error('Kamerazugriff nicht erteilt.');
      }
    }
  }

  // Geolocation-Berechtigung
  async handleGeolocationPermission() {
    console.log('Prüfe Standort-Berechtigung...');
    const permissions = await Geolocation.checkPermissions();
    console.log(
      'Aktueller Standort-Berechtigungsstatus:',
      permissions.location,
    );

    if (permissions.location === 'granted') {
      console.log('Standort-Berechtigung bereits erteilt.');
      this.geolocationPermissionGranted = true; // Setze Geolocation-Berechtigung auf wahr
      await this.showAlreadyGrantedAlert('Standort');
    } else {
      console.log('Fordere Standort-Berechtigung an...');
      const request = await Geolocation.requestPermissions();
      console.log(
        'Angeforderter Standort-Berechtigungsstatus:',
        request.location,
      );

      if (request.location === 'granted') {
        console.log('Standort-Berechtigung erfolgreich erteilt.');
        this.geolocationPermissionGranted = true; // Setze Geolocation-Berechtigung auf wahr
        await this.showAlert('Standort');
      } else {
        console.error('Standortzugriff nicht erteilt.');
      }
    }
  }

  // Generischer Alert für erteilte Berechtigung
  async showAlert(permissionType: string) {
    console.log(
      `${permissionType}-Berechtigung erteilt. Zeige Bestätigungs-Popup.`,
    );
    const alert = await this.alertController.create({
      header: 'Zugriffsbestätigung',
      message: `Du hast die ${permissionType}-Berechtigung erteilt!`,
      buttons: [
        {
          text: 'Weiter',
          handler: () => {
            console.log(
              `${permissionType}-Berechtigung bestätigt, weiter zur TaskPage`,
            );
            this.router.navigate(['/task']); // Navigiere zur TaskPage
          },
        },
      ],
    });
    await alert.present();
  }

  // Generischer Alert für bereits erteilte Berechtigung
  async showAlreadyGrantedAlert(permissionType: string) {
    console.log(
      `${permissionType}-Berechtigung wurde bereits erteilt. Zeige Hinweis-Popup.`,
    );
    const alert = await this.alertController.create({
      header: 'Hinweis',
      message: `Die ${permissionType}-Berechtigung wurde bereits erteilt.`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log(`${permissionType}-Berechtigung bereits erteilt.`);
            // Überprüfen, ob jetzt beide Berechtigungen erteilt wurden, um den Button zu aktivieren
            if (
              this.cameraPermissionGranted &&
              this.geolocationPermissionGranted
            ) {
              console.log(
                'Beide Berechtigungen erteilt, Weiter-Button aktivieren',
              );
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Überprüfe, ob beide Berechtigungen erteilt wurden, um den Button zu aktivieren
  isContinueButtonEnabled() {
    return this.cameraPermissionGranted && this.geolocationPermissionGranted;
  }
}
