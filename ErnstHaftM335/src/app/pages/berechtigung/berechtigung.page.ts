import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';  // AlertController importieren
import { Camera, CameraPermissionType } from '@capacitor/camera';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {RouterLink} from "@angular/router";


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
    IonIcon,
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
    // Check camera permissions
    const permissions = await Camera.checkPermissions();

    if (permissions.camera !== 'granted') {
      // Request permissions using native Android pop-up
      const request = await Camera.requestPermissions({ permissions: ['camera'] });

      if (request.camera !== 'granted') {
        console.error('Kamerazugriff nicht erteilt');
        return; // Exit if permission is denied
      }
    }

    // Wenn Berechtigung erteilt wurde, Benachrichtigung anzeigen
    await this.showAlert();
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Zugriffsbestätigung',
      message: 'Du hast die Kamera-Berechtigung erteilt!',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
