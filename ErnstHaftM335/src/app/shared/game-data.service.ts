import { Injectable } from '@angular/core';
import {Jagd} from "../pages/data/mock-jagd";

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

<<<<<<< HEAD
  setRewards(rewards: string[]): void {
    this.rewards = rewards;
    localStorage.setItem('score','0');
    //localStorage.setItem('score', JSON.stringify(rewards));
=======
  addToLeaderboard(jagd: Jagd): void {
    this.leaderboard.push(jagd); // Neue Runde hinzufügen
>>>>>>> 16b47f9918f4c57adad21a40af3a7940cf5e7a84
  }

  getLeaderboard(): Jagd[] {
    return this.leaderboard;
  }
}
