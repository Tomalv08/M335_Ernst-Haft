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
import { GameDataService } from '../../shared/game-data.service';

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
  constructor(private router: Router, private gameDataService: GameDataService) {}
  playerName: string = '';
  gameTime: string = '';
  rewards: string[] = [];
  timerDisplay: string = '';
  totalTime: number = 0;
  currentTaskIndex: number = 0;
  tasks: Task[] = TASKS;
  startTime: number | null = null; // Start time of the game
  taskStartTime: number | null = null; // Start time of the current task
  timerInterval: any = null;

  ngOnInit(): void {
    this.startGame();
    this.playerName = this.gameDataService.getPlayerName();
    this.gameTime = this.gameDataService.getGameTime();
    this.rewards = this.gameDataService.getRewards();
    this.gameDataService.setGameTime('');
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  startGame(): void {
    this.startTime = Date.now();
    this.taskStartTime = Date.now();
    this.rewards.length = 0;
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

      // Always give a watermelon for completing the task
      this.rewards[this.currentTaskIndex] = '🍉'; // Ensure exactly one watermelon per task

      // Add a beer emoji if the task took longer than the allowed time
      if (taskDuration > currentTask.max_time) {
        this.rewards[this.currentTaskIndex] += '🍺'; // Add beer next to the watermelon
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
    // Save the current data into the service
    this.gameDataService.setPlayerName(this.playerName);
    this.gameDataService.setGameTime(this.timerDisplay); // Use the total game time
    this.gameDataService.setRewards(this.rewards);

    // Log the data (for debugging)
    console.log('Game ended. Data saved:');
    console.log('Player Name:', this.playerName);
    console.log('Game Time:', this.timerDisplay);
    console.log('Rewards:', this.rewards);

    // Navigate to the end page
    this.router.navigate(['/endpage']);
  }


  cancelGame(): void {
    this.stopTimer();
    this.router.navigate(['/home']);
  }
}
