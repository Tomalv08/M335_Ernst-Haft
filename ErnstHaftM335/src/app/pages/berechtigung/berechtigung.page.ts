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
    IonFooter
  ]
})
export class BerechtigungPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() { }

  // Kamera-Berechtigung prüfen und anfordern
  async handleCameraPermission() {
    const permissions = await Camera.checkPermissions();
    if (permissions.camera !== 'granted') {
      const request = await Camera.requestPermissions({ permissions: ['camera'] });
      if (request.camera !== 'granted') {
        return; // Wenn die Berechtigung nicht erteilt wird, passiert nichts
      }
    }
    // Wenn die Berechtigung erteilt ist, zeige den Alert
    await this.showAlert();
  }


  // Benachrichtigung anzeigen
  async showAlert() {
    const alert = await this.alertController.create({
      header: "Zugriffsbestätigung",
      message:"Du hast nun erfolgreich Zugriff auf die Kamera erteilt. Die App kann jetzt die Kamera verwenden, um Aufgaben zu erfüllen.",
      buttons: ['OK']
    });
    await alert.present();
  }
}
