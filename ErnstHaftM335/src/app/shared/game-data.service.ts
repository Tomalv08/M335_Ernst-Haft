import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private playerName: string = localStorage.getItem('playerName') || '';
  private gameTime: string = localStorage.getItem('timerDisplay') || '';
  private rewards: string[] = JSON.parse(localStorage.getItem('score') || '[]');

  setPlayerName(name: string): void {
    this.playerName = name;
    localStorage.setItem('playerName', name);
  }

  getPlayerName(): string {
    return this.playerName;
  }

  setGameTime(time: string): void {
    this.gameTime = time;
    localStorage.setItem('timerDisplay', time);
  }

  getGameTime(): string {
    return this.gameTime;
  }

  setRewards(rewards: string[]): void {
    this.rewards = rewards;
    localStorage.setItem('score', JSON.stringify(rewards));
  }

  getRewards(): string[] {
    return this.rewards;
  }
}
