import { Component, Input } from '@angular/core';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerAndroidScanningLibrary,
} from '@capacitor/barcode-scanner';
import { addIcons } from 'ionicons';
import { qrCode } from 'ionicons/icons';
import { AlertController } from '@ionic/angular';
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/angular/standalone";

@Component({
  selector: 'app-task3',
  templateUrl: './task3.component.html',
  styleUrls: ['./task3.component.scss'],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    // Add Ionic UI components here
  ]
})
export class Task3Component {
  public scanResult: any;

  @Input() moveToNextTask!: () => void;

  constructor(private alertController: AlertController) {
    addIcons({ qrCode });
  }

  async checkTheQrCode(): Promise<void> {
    try {
      // QR-Code scanning logic
      this.scanResult = await CapacitorBarcodeScanner.scanBarcode({
        hint: 0,
        scanInstructions: 'Halte die Kamera über den QR-Code',
        cameraDirection: 1,
        scanOrientation: 1,
        android: {
          scanningLibrary: CapacitorBarcodeScannerAndroidScanningLibrary.MLKIT,
        },
      });

      if (this.scanResult.ScanResult === 'M335@ICT-BZ') {
        // Show success alert
        await this.showAlert('Erfolg', 'Die Aufgabe wurde erfolgreich abgeschlossen!', [
          {
            text: 'Weiter',
            handler: () => {
              console.log('Weiter gedrückt');
            },
          },
        ]);
      } else {
        // Show error alert
        await this.showAlert('Fehler', 'Der QR-Code ist falsch. Bitte erneut versuchen.', [
          {
            text: 'Erneut versuchen',
            handler: () => {
              console.log('Erneut versuchen gedrückt');
            },
          },
        ]);
      }
    } catch (error) {
      console.error('Fehler beim Scannen:', error);

      // Show scan error alert
      await this.showAlert('Scan-Fehler', 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.', [
        {
          text: 'OK',
          handler: () => {
            console.log('Fehler-Alert bestätigt');
          },
        },
      ]);
    }
  }

  private async showAlert(header: string, message: string, buttons: any[]) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons,
    });
    await alert.present();
  }
}
