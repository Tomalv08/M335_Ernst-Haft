import { Component, OnInit, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg, AlertController } from '@ionic/angular/standalone';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerScanResult,
  CapacitorBarcodeScannerOptions,
  CapacitorBarcodeScannerTypeHint,
} from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-task3',
  templateUrl: './task3.component.html',
  styleUrls: ['./task3.component.scss'],
  imports: [
    DecimalPipe,
    IonButton,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ]
})
export class Task3Component implements OnInit {
  @Input() moveToNextTask!: () => void;

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  async scanQRCode() {
    // QR-Code scannen
    const options: CapacitorBarcodeScannerOptions = {
      hint: CapacitorBarcodeScannerTypeHint.QR_CODE, // Typ des Barcodes
      scanInstructions: 'Bitte QR-Code scannen',
      scanButton: true
    };

    const result: CapacitorBarcodeScannerScanResult = await CapacitorBarcodeScanner.scanBarcode(options);

    // Ergebnis verarbeiten
    this.handleScanResult(result);
  }

  handleScanResult(result: CapacitorBarcodeScannerScanResult) {
    const expectedContent = 'dein-erwarteter-inhalt'; // Hier den erwarteten Inhalt definieren

    // Überprüfen und den gescannten Wert extrahieren
    const scannedValue = result.ScanResult; // Hier den Wert extrahieren

    if (scannedValue === expectedContent) {
      this.showAlert('Erfolg', 'Der QR-Code ist gültig!');
      this.moveToNextTask(); // Nächste Aufgabe aufrufen
    } else {
      this.showAlert('Fehler', 'Der QR-Code ist ungültig.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  onTaskComplete() {
    // Hier kannst du zusätzliche Logik hinzufügen, wenn die Aufgabe abgeschlossen ist
  }
}
