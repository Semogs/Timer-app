import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Timer } from '../interface';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class TimerListComponent implements OnInit {
  timers: Timer[] = [];
  currentTimerIndex: number = -1;
  
  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    // Retrieve timers from the timer service
    this.timers = this.timerService.getTimers();
  }

  startTimer(index: number) {
    const timer = this.timers[index];
    if (!timer.isRunning) {
      this.currentTimerIndex = index;
      timer.isRunning = true;
      timer.timerInterval = setInterval(() => {
        if (timer.isRunning) {
          timer.elapsedTime++;
        }
      }, 1000);
    }
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
  }
}
