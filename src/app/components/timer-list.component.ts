import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Timer } from '../interface';
import { TimerService } from '../services/timer.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.css'],
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule],
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
    for (let i = 0; localStorage.getItem(`timer-${i}`) !== null; i++) {
      const savedTimerData = localStorage.getItem(`timer-${i}`);
      if (savedTimerData) {
        const savedTimer = JSON.parse(savedTimerData);
        this.timers.push(savedTimer);
      }
    }
  }

  startTimer(timer: Timer) {
    this.timerService.startTimer(timer);
  }

  pauseTimer(index: number) {
    const timer = this.timers[index];
    clearInterval(timer.timerInterval);
    timer.isRunning = false;
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

  stopTimer(index: number) {
    const timer = this.timers[index];
    clearInterval(timer.timerInterval);
    timer.isRunning = false;
    timer.endTime = new Date();
    localStorage.setItem(`timer-${index}`, JSON.stringify(timer));
  }
}
