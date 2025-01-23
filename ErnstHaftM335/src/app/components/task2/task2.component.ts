import { Component, OnInit, OnDestroy, NgZone, Input } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { DecimalPipe } from '@angular/common';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { haversineDistance } from '../task1/task1.component';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButton, DecimalPipe],
})
export class Task2Component implements OnInit, OnDestroy {
  startCoords: { latitude: number; longitude: number } | null = null; // Starting position
  currentCoords: { latitude: number; longitude: number } | null = null; // Current position
  distance: number | null = null; // Distance walked
  watchId: string | null = null; // ID for the Geolocation watch
  goalDistance = 10; // Distance goal in meters
  taskComplete = false;

  @Input() moveToNextTask!: () => void; // Input to trigger moving to the next task

  constructor(private ngZone: NgZone) {}

  async ngOnInit() {
    try {
      // Get the initial position when the component starts
      const position = await Geolocation.getCurrentPosition();
      this.startCoords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      console.log('Starting coordinates:', this.startCoords);

      // Start watching the user's position
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

              // Call the updateDistance method whenever position changes
              this.updateDistance();
            });
          }
        }
      );
    } catch (err) {
      console.error('Error initializing geolocation:', err);
    }
  }

  // Method to update the distance walked
  updateDistance() {
    if (this.startCoords && this.currentCoords) {
      // Calculate the distance from the starting point
      this.distance = haversineDistance(this.startCoords, this.currentCoords);
      console.log('Distance walked:', this.distance);

      // Check if the goal distance is reached
      if (this.distance !== null && this.distance >= this.goalDistance) {
        this.showSuccessMessage(); // Call the function to handle UI changes
      }
    }
  }

  showSuccessMessage() {
    console.log('You reached your goal!');
    this.taskComplete = true; // Enable the Weiter button and display success message
  }

  ngOnDestroy() {
    // Clear the Geolocation watch when the component is destroyed
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId }).catch((err) => {
        console.error('Error clearing watch:', err);
      });
    }
  }
}
