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

  playerName: string = '';  // Diese Variable wird den Spielernamen speichern
  gameTime: string = '';    // Diese Variable speichert die Gesamtzeit
  score: string[] = [];     // Diese Variable speichert den Score (Emojis)
  rewards: string[] = JSON.parse(localStorage.getItem('score') || '[]');
  constructor(private router: Router) {}

  ngOnInit() {
    // Abrufen der gespeicherten Daten aus localStorage
    this.playerName = localStorage.getItem('playerName') || 'Unbekannt';  // Spielername wird aus localStorage geladen
    this.gameTime = localStorage.getItem('gameTime') || '0:00';           // Gesamtzeit aus localStorage laden
    this.score = JSON.parse(localStorage.getItem('score') || '[]');
    console.log(this.rewards);// Score (Emojis) aus localStorage laden
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }
}
