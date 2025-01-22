import { Component } from '@angular/core';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent {
  tasks: string[] = [
    'Walk to the marked point.',
    'Walk 10 meters.',
    'Scan the QR code.',
    'Connect your device to a charger.'
  ];

  currentTaskIndex: number = 0;

  get currentTask(): string {
    return this.tasks[this.currentTaskIndex];
  }

  nextTask(): void {
    if (this.currentTaskIndex < this.tasks.length - 1) {
      this.currentTaskIndex++;
    } else {
      alert('All tasks completed!');
    }
  }
}
