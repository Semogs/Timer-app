import { Injectable } from '@angular/core';
import { Timer } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  timers: Timer[] = [];

  constructor() {}

  createTimer(timer: Timer) {
    this.timers.push(timer);
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
