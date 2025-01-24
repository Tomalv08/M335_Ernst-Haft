import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GameDataService } from '../../shared/game-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage implements OnInit {
  jagds: any[] = [];

  constructor(private gameDataService: GameDataService, private router: Router) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {
    const playerName = this.gameDataService.getPlayerName();
    const gameTime = this.gameDataService.getGameTime();
    const score = this.gameDataService.getRewards();

    if (playerName && gameTime && score) {
      this.jagds.push({
        name: playerName,
        score: score,
        date: new Date().toLocaleDateString(),
        gameTime: gameTime,
      });
    }
  }
  navigateToName(): void {
    this.router.navigate(['/name']); // Navigate to the game page
  }
}
