import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JAGDS } from '../data/mock-jagd';
import { Jagd } from '../data/mock-jagd';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})


export class HomePage {
  jagds: Jagd[] = JAGDS;

  constructor(private router: Router) {
    // Sort jagds by time after the component is initialized
    this.sortJagdsByTime();
  }

  // Function to convert time (HH:MM) into total minutes
  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  // Sort jagds by time in ascending order
  private sortJagdsByTime() {
    this.jagds.sort((a, b) => this.timeToMinutes(a.time) - this.timeToMinutes(b.time));
  }

  navigateToTask() {
    this.router.navigate(['/task']);
  }
  navigateToBerechtigung() {
    this.router.navigate(['/berechtigung']);
  }
  navigateToName() {
    this.router.navigate(['/name']);
  }
}
