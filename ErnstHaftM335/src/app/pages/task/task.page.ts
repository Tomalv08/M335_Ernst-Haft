import { Component } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/angular/standalone';
import {Router} from "@angular/router";



@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true, // Standalone component
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    // Import Ionic components
  ],
})
export class TaskPage {
  constructor(private router: Router) {}

  navigateToTask() {
    this.router.navigate(['/']);
  }
}
