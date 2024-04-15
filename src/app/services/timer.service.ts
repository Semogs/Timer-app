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
}
