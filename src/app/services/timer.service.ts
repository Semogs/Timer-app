import { Injectable } from '@angular/core';
import { Timer } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  timers: Timer[] = [];

  constructor() {
    this.loadTimersFromLocalStorage();
  }

  private loadTimersFromLocalStorage() {
    const savedTimers = localStorage.getItem('timers');
    if (savedTimers) {
      this.timers = JSON.parse(savedTimers);
    }
  }

  createTimer(timer: Timer) {
    this.timers.unshift(timer);
  }

  getTimers(): Timer[] {
    return this.timers;
  }

  startTimer(timer: Timer) {
    if (!timer.isRunning) {
      timer.isRunning = true;
      timer.timerInterval = setInterval(() => {
        if (timer.isRunning) {
          timer.elapsedTime++;
        }
      }, 1000);
    }
  }
}
