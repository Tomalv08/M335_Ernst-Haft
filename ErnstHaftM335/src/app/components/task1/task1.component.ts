import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { DecimalPipe } from '@angular/common';
import {IonButton, IonContent, IonHeader, IonImg, IonTitle, IonToolbar} from "@ionic/angular/standalone";

export function haversineDistance(
  coords1: { latitude: number; longitude: number },
  coords2: { latitude: number; longitude: number }
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
  imports: [DecimalPipe, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButton],
})
export class Task1Component implements OnInit, OnDestroy {
  fixedCoords = { latitude: 47.071945403994924, longitude: 8.348885173299777 }; // Target location
  currentCoords: { latitude: number; longitude: number } | null = null;
  distance: number | null = null;
  watchId: string | null = null;
  intervalId: any = null;

  constructor(private ngZone: NgZone, private router: Router) {}

  async ngOnInit() {
    try {
      // Start watching the position
      const position = await Geolocation.getCurrentPosition();
      this.updateCurrentPosition(position);

      // Set an interval to update distance every 5 seconds
      this.intervalId = setInterval(async () => {
        const latestPosition = await Geolocation.getCurrentPosition();
        this.updateCurrentPosition(latestPosition);
      }, 500); // 5000 ms = 5 seconds
    } catch (err) {
      console.error('Failed to start watching position:', err);
    }
  }

  updateCurrentPosition(position: any) {
    if (position) {
      this.ngZone.run(() => {
        this.currentCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        this.distance = haversineDistance(this.currentCoords, this.fixedCoords);
        console.log('Distance to fixedCoords:', this.distance);
      });
    }
  }

  ngOnDestroy() {
    // Clear the geolocation watcher if set
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId }).catch((err) => {
        console.error('Error clearing geolocation watch:', err);
      });
    }

    // Clear the interval
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onCancel() {
    this.router.navigate(['/home']); // Navigate to home
  }
}
