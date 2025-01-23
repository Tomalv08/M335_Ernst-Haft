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
  startTime: number | null = null; // Zeit, wenn das Spiel beginnt
  taskStartTime: number | null = null; // Startzeit für jede Aufgabe
  timerDisplay: string = '0:00'; // Anzeige der verstrichenen Zeit
  timerInterval: any = null; // Referenz auf den Timer
  totalTime: number = 0; // Gesamtzeit für alle Aufgaben
  rewards: string[] = []; // Belohnungen für jede Aufgabe
  playerName: string = ''; // Variable for storing the player's name

  ngOnInit(): void {
    this.startGame();
  }

  ngOnDestroy(): void {
    this.stopTimer(); // Timer stoppen, wenn die Komponente zerstört wird
  }

  startGame(): void {
    this.startTime = Date.now(); // Startzeit des Spiels
    this.taskStartTime = Date.now(); // Startzeit der ersten Aufgabe
    this.timerInterval = setInterval(() => {
      this.updateTimerDisplay();
    }, 1000);
  }

  updateTimerDisplay(): void {
    if (this.startTime) {
      const elapsedTime = Math.floor((Date.now() - this.taskStartTime!) / 1000); // Zeit für die aktuelle Aufgabe
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
      // Berechne die Zeit für die aktuelle Aufgabe
      const taskEndTime = Date.now();
      const taskDuration = Math.floor((taskEndTime - this.taskStartTime!) / 1000);
      this.totalTime += taskDuration; // Addiere zur Gesamtzeit

      // Belohnung und Bestrafung je nach Aufgabe
      const currentTask = this.tasks[this.currentTaskIndex];
      if (taskDuration > currentTask.max_time) {
        this.rewards.push('🍺'); // Bestrafung (zu lange gebraucht)
      } else {
        this.rewards.push('🍉'); // Belohnung (rechtzeitig geschafft)
      }

      this.currentTaskIndex++;

      // Setze den Timer für die nächste Aufgabe zurück
      if (this.currentTaskIndex < this.tasks.length) {
        this.taskStartTime = Date.now(); // Startzeit für die nächste Aufgabe
      } else {
        this.endGame();
      }
    }
  }

  endGame(): void {
    this.stopTimer(); // Timer stoppen

    // Gesamtzeit speichern
    const totalMinutes = Math.floor(this.totalTime / 60);
    const totalSeconds = this.totalTime % 60;
    const formattedTotalTime = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;

    // Gesamtzeit und Score (Emojis) in localStorage speichern
    localStorage.setItem('gameTime', formattedTotalTime);
    localStorage.setItem('score', JSON.stringify(this.rewards));

    // Navigiere zur Endseite
    this.router.navigate(['/endpage']);
  }

  cancelGame(): void {
    this.stopTimer(); // Timer stoppen, wenn das Spiel abgebrochen wird
    this.router.navigate(['/home']);
  }
}
