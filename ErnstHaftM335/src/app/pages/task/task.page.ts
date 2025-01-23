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
    Task1Component,
    Task2Component,
    Task3Component,
    Task4Component,
    NgIf,
  ],
})
export class TaskPage implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  currentTaskIndex: number = 0;
  tasks: Task[] = TASKS;
  startTime: number | null = null; // Start time of the game
  taskStartTime: number | null = null; // Start time of the current task
  timerDisplay: string = '0:00';
  timerInterval: any = null;
  totalTime: number = 0; // Total time elapsed
  rewards: string[] = [];
  playerName: string = '';

  ngOnInit(): void {
    this.startGame();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  startGame(): void {
    this.startTime = Date.now();
    this.taskStartTime = Date.now();
    this.timerInterval = setInterval(() => {
      this.updateTimerDisplay();
    }, 1000);
  }

  updateTimerDisplay(): void {
    if (this.startTime) {
      const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000); // Total game time
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      this.timerDisplay = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  moveToNextTask(): void {
    if (this.currentTaskIndex < this.tasks.length) {
      const taskEndTime = Date.now();
      const taskDuration = Math.floor((taskEndTime - this.taskStartTime!) / 1000); // Task-specific time
      this.totalTime += taskDuration;

      const currentTask = this.tasks[this.currentTaskIndex];
      if (taskDuration > currentTask.max_time) {
        this.rewards.push('🍺'); // Too slow
      } else {
        this.rewards.push('🍉'); // On time
      }

      this.currentTaskIndex++;

      if (this.currentTaskIndex < this.tasks.length) {
        this.taskStartTime = Date.now(); // Reset for the next task
      } else {
        this.endGame();
      }
    }
  }

  endGame(): void {
    this.stopTimer();
    const totalMinutes = Math.floor(this.totalTime / 60);
    const totalSeconds = this.totalTime % 60;
    const formattedTotalTime = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;

    const playerName = this.playerName || 'Player'; // Default name if none is set
    const currentResult = {
      name: playerName,
      score: this.rewards,
      date: new Date().toLocaleDateString(),
      gameTime: formattedTotalTime,
    };

    // Retrieve the existing leaderboard from localStorage
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');

    // Add the current result to the leaderboard
    leaderboard.push(currentResult);

    // Save the updated leaderboard back to localStorage
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    // Navigate to the leaderboard page
    this.router.navigate(['/endpage']);
  }


  cancelGame(): void {
    this.stopTimer();
    this.router.navigate(['/home']);
  }
}
