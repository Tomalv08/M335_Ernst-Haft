import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameDataService } from '../../shared/game-data.service';
import { Jagd } from '../data/mock-jagd';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  jagds: Jagd[] = []; // Array für Runden

  constructor(
    private gameDataService: GameDataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {
    this.jagds = this.gameDataService.getLeaderboard();
  }
  navigateToName(): void {
    this.router.navigate(['/name']); // Navigate to the game page
  }
}
