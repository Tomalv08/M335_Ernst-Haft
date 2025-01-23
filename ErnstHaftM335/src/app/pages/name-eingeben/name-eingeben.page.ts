import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { GameDataService } from '../../shared/game-data.service';

@Component({
  selector: 'app-name-eingeben',
  templateUrl: './name-eingeben.page.html',
  styleUrls: ['./name-eingeben.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule
  ]
})
export class NameEingebenPage implements OnInit {

  playerName : string = ''; // Wert des Eingabefelds
  isDisabled: boolean = true; // Button ist standardmäßig deaktiviert

  constructor(private router: Router, private alertController: AlertController, private gameDataService: GameDataService) { }

  ngOnInit() { }

  checkInput(): void {
    this.isDisabled = this.playerName .trim() === '';
  }

  async confirmName() {
    if (this.playerName.trim()) {
      this.gameDataService.setPlayerName(this.playerName);
      console.log('Gespeicherter Name:', localStorage.getItem('playerName')); // Debug

      // Alert anzeigen
      const alert = await this.alertController.create({
        header: 'Willkommen!',
        message: `Hallo ${this.playerName.trim()}! Bist du bereit, zu starten?`,
        buttons: [
          {
            text: 'Start',
            handler: () => {
              console.log('Spiel gestartet');
              this.router.navigate(['/berechtigung']); // Passe die Route an, um die Aufgaben-Seite zu laden
            }
          }
        ]
      });

      await alert.present();
    }
  }

}
