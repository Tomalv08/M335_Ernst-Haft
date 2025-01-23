import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { JAGDS } from '../data/mock-jagd';
import { Jagd } from '../data/mock-jagd';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage implements OnInit {
  jagds: Jagd[] = JAGDS;

  constructor(private router: Router) {}

  ngOnInit() {
    this.sortJagdsByTime();
    this.addPlayerToLeaderboard();
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private sortJagdsByTime() {
    this.jagds.sort(
      (a, b) => this.timeToMinutes(a.time) - this.timeToMinutes(b.time)
    );
  }

  private addPlayerToLeaderboard() {
    const playerName = localStorage.getItem('playerName');
    console.log('Gefundener Name im Storage:', playerName); // Debug

    if (playerName) {
      const newJagd: Jagd = {
        id: this.jagds.length + 1,
        name: playerName,
        time: '00:00',
        date: new Date().toISOString().split('T')[0],
        tasks_done: 0,
        tasks_long: 10,
      };
      this.jagds = [...this.jagds, newJagd]; // Array neu zuweisen
      console.log('Aktualisiertes Leaderboard:', this.jagds); // Debug
      this.sortJagdsByTime();
    }
  }

  navigateToName() {
    this.router.navigate(['/name']);
  }
}
