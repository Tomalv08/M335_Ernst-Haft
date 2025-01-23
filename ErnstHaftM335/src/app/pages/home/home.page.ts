import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage implements OnInit {
  jagds: { name: string; score: string[]; date: string; gameTime: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults(): void {
    const savedResults = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    this.jagds = savedResults;
  }

  navigateToName(): void {
    this.router.navigate(['/name']); // Navigate to the game page
  }
}
