import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { GameDataService } from '../../shared/game-data.service';

@Component({
  selector: 'app-endpage',
  templateUrl: './endpage.page.html',
  styleUrls: ['./endpage.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class EndpagePage implements OnInit {
  playerName: string = '';
  gameTime: string = '';
  rewards: string[] = [];

  constructor(
    private router: Router,
    private gameDataService: GameDataService,
  ) {}

  ngOnInit(): void {
    // Fetch data from the service
    this.playerName = this.gameDataService.getPlayerName();
    this.gameTime = this.gameDataService.getGameTime();
    this.rewards = this.gameDataService.getRewards();
  }

  gotoHome(): void {
    this.router.navigate(['/home']);
  }
}
