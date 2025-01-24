import { Component, OnInit } from '@angular/core';
import { IonButton, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import {Router} from "@angular/router";
import { GameDataService } from '../../shared/game-data.service';

@Component({
  selector: 'app-endpage',
  templateUrl: './endpage.page.html',
  styleUrls: ['./endpage.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton
  ]
})
export class EndpagePage implements OnInit {
  playerName: string = '';
  gameTime: string = '';
  rewards: string[] = ['null'];

  constructor(private gameDataService: GameDataService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve data from the service
    this.playerName = this.gameDataService.getPlayerName();
    this.gameTime = this.gameDataService.getGameTime();
    this.rewards = this.gameDataService.getRewards();

    // Log the data for debugging
    console.log('Endpage loaded with data:');
    console.log('Player Name:', this.playerName);
    console.log('Game Time:', this.gameTime);
    console.log('Rewards:', this.rewards);
  }
  gotoHome(): void {
    this.router.navigate(['/home']);
  }
}
