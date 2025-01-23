import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AlertController } from "@ionic/angular";

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

  inputValue: string = ''; // Wert des Eingabefelds
  isDisabled: boolean = true; // Button ist standardmäßig deaktiviert

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() { }

  checkInput(): void {
    this.isDisabled = this.inputValue.trim() === '';
  }

  async confirmName() {
    if (this.inputValue.trim()) {
      localStorage.setItem('playerName', this.inputValue.trim());
      console.log('Gespeicherter Name:', localStorage.getItem('playerName')); // Debug

      // Alert anzeigen
      const alert = await this.alertController.create({
        header: 'Willkommen!',
        message: `Hallo ${this.inputValue.trim()}! Bist du bereit, zu starten?`,
        buttons: [
          {
            text: 'Start',
            handler: () => {
              console.log('Spiel gestartet');
              this.router.navigate(['/home']); // Passe die Route an
            }
          }
        ]
      });

      await alert.present();
    }
  }
}
