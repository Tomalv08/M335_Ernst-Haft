import { Component, OnInit } from '@angular/core';
import { IonButton, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import {Router} from "@angular/router";

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
  playerName: string = '';  // Stores the player's name
  gameTime: string = '';   // Stores the total time of the game
  score: string[] = [];    // Stores the score (emojis)
  rewards: string[] = [];  // Stores the rewards (for display)

  constructor(private router: Router) {}

  ngOnInit() {
    // Retrieve the current game's data from localStorage
    this.playerName = localStorage.getItem('playerName') || 'Unbekannt'; // Player name fallback to 'Unbekannt' if not set
    this.gameTime = localStorage.getItem('gameTime') || 'x';            // Total time fallback to 'x' if not set
    this.score = JSON.parse(localStorage.getItem('score') || '[]');     // Load score (emojis)
    this.rewards = [...this.score]; // Copy score to rewards for display

    // Log for debugging purposes
    console.log('Player Name:', this.playerName);
    console.log('Game Time:', this.gameTime);
    console.log('Score:', this.score);
  }

  gotoHome() {
    this.router.navigate(['/home']); // Navigate back to the home page
  }
}
