import { Component } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import { Task1Component } from '../../components/task1/task1.component';
import { Task2Component } from '../../components/task2/task2.component';
import { Task3Component } from '../../components/task3/task3.component';
import { Task4Component } from '../../components/task4/task4.component';
import {NgIf} from "@angular/common";
import { TASKS } from '../data/mock-task';
import {Task} from '../data/mock-task';
//import {Jagd, JAGDS} from "../data/mock-jagd";



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
    Task1Component,
    Task2Component,
    Task3Component,
    Task4Component,
    IonFooter,
    NgIf,
    // Import Ionic components
  ],
})
export class TaskPage {
  constructor(private router: Router) {}

  navigateToTask() {
    this.router.navigate(['/']);
  }
  currentTaskIndex: number = 0;

  tasks: Task[] = TASKS;

  // Navigate to the next task
  nextTask(): void {
    if (this.currentTaskIndex < this.tasks.length - 1) {
      this.currentTaskIndex++;
    } else {
      this.endGame();
    }
  }
  // Cancel the game and navigate to the home page
  cancelGame(): void {
    this.router.navigate(['/home']);
  }

  // End the game (could show a summary or final message)
  endGame(): void {
    this.router.navigate(['/game-over']);
  }
}
