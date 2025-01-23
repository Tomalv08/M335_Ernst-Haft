import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Task1Component } from '../../components/task1/task1.component';
import { Task2Component } from '../../components/task2/task2.component';
import { Task3Component } from '../../components/task3/task3.component';
import { Task4Component } from '../../components/task4/task4.component';
import { NgIf } from '@angular/common';
import { TASKS } from '../data/mock-task';
import { Task } from '../data/mock-task';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
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
  ],
})
export class TaskPage implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  currentTaskIndex: number = 0;
  tasks: Task[] = TASKS;

  startTime: number | null = null; // Time when the game starts
  timerDisplay: string = '0:00'; // Elapsed time display
  timerInterval: any = null; // Reference to the interval

  ngOnInit(): void {
    this.startGame();
  }

  ngOnDestroy(): void {
    this.stopTimer(); // Clean up the timer if the component is destroyed
  }

  // Start the game and timer
  startGame(): void {
    this.startTime = Date.now(); // Record the start time
    this.timerInterval = setInterval(() => {
      this.updateTimerDisplay();
    }, 1000); // Update every second
  }

  // Update the timer display
  updateTimerDisplay(): void {
    if (this.startTime) {
      const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000); // Time in seconds
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      this.timerDisplay = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }

  // Stop the timer
  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // Navigate to the next task
  // Move to the next task
  moveToNextTask(): void {
    if (this.currentTaskIndex < 3) {
      this.currentTaskIndex++;
    }
  }

  // Cancel the game and navigate to the home page
  cancelGame(): void {
    this.stopTimer(); // Stop the timer when the game is canceled
    this.router.navigate(['/home']);
  }

  // End the game (show summary or navigate)
  endGame(): void {
    this.stopTimer(); // Stop the timer when the game ends
    this.router.navigate(['/game-over']);
  }
}
