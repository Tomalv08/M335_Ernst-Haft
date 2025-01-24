import { Injectable } from '@angular/core';
import { Jagd } from '../pages/data/mock-jagd';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private playerName: string = '';
  private rewards: string[] = [];
  private gameTime: string = '';
  private leaderboard: Jagd[] = []; // Array für alle Runden

  setPlayerName(name: string): void {
    this.playerName = name;
  }

  getPlayerName(): string {
    return this.playerName;
  }

  setRewards(rewards: string[]): void {
    this.rewards = rewards;
  }

  getRewards(): string[] {
    return this.rewards;
  }

  setGameTime(time: string): void {
    this.gameTime = time;
  }

  getGameTime(): string {
    return this.gameTime;
  }

  addToLeaderboard(jagd: Jagd): void {
    this.leaderboard.push(jagd);
  }

  getLeaderboard(): Jagd[] {
    return this.leaderboard;
  }
}
