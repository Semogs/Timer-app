import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Timer } from '../interface';
import { TimerService } from '../services/timer.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  standalone: true,
})
export class TimerListComponent implements OnInit {
  timers: Timer[] = [];
  currentTimerIndex: number = -1;

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    // Retrieve timers from the timer service
    this.timers = this.timerService.getTimers();

    // Check for previously saved timers in local storage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const savedDateTimers = localStorage.getItem(key);
        if (savedDateTimers) {
          const timersForDate: Timer[] = JSON.parse(savedDateTimers);
          timersForDate.forEach((savedTimer) => {
            savedTimer.startTime = new Date(savedTimer.startTime);
            if (savedTimer.endTime) {
              savedTimer.endTime = new Date(savedTimer.endTime);
            }
          });
          this.timers.push(...timersForDate);
        }
      }
    }

    this.timers.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
  }

  startTimer(timer: Timer) {
    this.timerService.startTimer(timer);
  }

  pauseTimer(index: number) {
    const timer = this.timers[index];
    clearInterval(timer.timerInterval);
    timer.isRunning = false;
  }

  stopTimer(index: number) {
    const timer = this.timers[index];
    clearInterval(timer.timerInterval);
    timer.isRunning = false;
    timer.endTime = new Date();

    const startDateKey = timer.startTime.toDateString();
    let timersForDate: Timer[] = [];
    const existingTimers = localStorage.getItem(startDateKey);
    if (existingTimers) {
      timersForDate = JSON.parse(existingTimers);
    }
    timersForDate.push(timer);
    localStorage.setItem(startDateKey, JSON.stringify(timersForDate));
  }

  formatElapsedTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  shouldDisplayDateHeader(index: number): boolean {
    if (index === 0) {
      return true;
    } else {
      const currentDate = this.timers[index].startTime.toDateString();
      const previousDate = this.timers[index - 1].startTime.toDateString();
      return currentDate !== previousDate;
    }
  }
}
