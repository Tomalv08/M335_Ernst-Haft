import { Component, OnInit, OnDestroy, NgZone, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonImg } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { DecimalPipe } from '@angular/common';
import { Haptics } from '@capacitor/haptics';
import { AlertController } from '@ionic/angular';

// Haversine formula to calculate distance
export function haversineDistance(
  coords1: { latitude: number; longitude: number },
  coords2: { latitude: number; longitude: number },
): number {
  const R = 6371e3; // Earth's radius in meters
  const lat1Rad = coords1.latitude * (Math.PI / 180);
  const lat2Rad = coords2.latitude * (Math.PI / 180);
  const deltaLat = (coords2.latitude - coords1.latitude) * (Math.PI / 180);
  const deltaLon = (coords2.longitude - coords1.longitude) * (Math.PI / 180);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance; // in meters
}

@Component({
  selector: 'app-task1',
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.scss'],
  imports: [IonImg, DecimalPipe, IonButton],
})
export class Task1Component implements OnInit, OnDestroy {
  fixedCoords = { latitude: 47.071945403994924, longitude: 8.348885173299777 }; // Destination coordinates   fixedCoords = { latitude: 47.071945403994924, longitude: 8.348885173299777 };
  currentCoords: { latitude: number; longitude: number } | null = null;
  distance: number | null = null;
  watchId: string | null = null;

  @Input() moveToNextTask!: () => void;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private alertController: AlertController,
  ) {}

  async ngOnInit() {
    try {
      this.watchId = await Geolocation.watchPosition(
        { enableHighAccuracy: true, timeout: 1000, maximumAge: 0 },
        (position, error) => {
          if (error) {
            console.error('Error watching position:', error);
            return;
          }

          if (position) {
            this.ngZone.run(() => {
              this.currentCoords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };

              this.distance = haversineDistance(
                this.currentCoords,
                this.fixedCoords,
              );

              console.log('Distance to fixedCoords:', this.distance);

              // Check if the distance is less than 10 meters
              if (this.distance !== null && this.distance < 10) {
                this.showSuccessAlert(); // Show success alert
              }
            });
          }
        },
      );
    } catch (err) {
      console.error('Failed to start watching position:', err);
    }
  }

  ngOnDestroy() {
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId }).catch((err) => {
        console.error('Error clearing watch:', err);
      });
    }
  }
  async showSuccessAlert() {
    await this.hapticsVibrate();

    const alert = await this.alertController.create({
      header: 'Aufgabe abgeschlossen',
      message: 'Sie haben das Ziel erreicht!',
      buttons: [
        {
          text: 'Weitere Aufgabe',
          handler: () => {
            this.moveToNextTask(); // Go to the next task
          },
        },
      ],
    });
    await alert.present();
  }

  async hapticsVibrate() {
    await Haptics.vibrate();
  }

  onCancel() {
    this.router.navigate(['/home']); // Navigate to the home page
  }
}
