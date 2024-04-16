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
    const timerStartTime = new Date(timer.startTime);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison

    // Find the index where the timer should be inserted based on its start date
    let insertIndex = this.timers.findIndex((existingTimer) => {
      const existingStartTime = new Date(existingTimer.startTime);
      existingStartTime.setHours(0, 0, 0, 0);
      return existingStartTime <= timerStartTime;
    });

    if (insertIndex === -1) {
      // If no existing timers, just push the timer
      this.timers.push(timer);
    } else {
      // If existing timers, insert the timer at the correct position
      while (
        insertIndex < this.timers.length &&
        new Date(this.timers[insertIndex].startTime).toDateString() ===
          timerStartTime.toDateString()
      ) {
        insertIndex++; // Move to the next timer with the same date
      }
      this.timers.splice(insertIndex, 0, timer);
    }
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
