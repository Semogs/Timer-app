import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Timer {
  name: string;
  startTime: Date;
  endTime?: Date;
  elapsedTime: number;
  isRunning: boolean;
  timerInterval?: any;
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class TimerComponent implements OnInit {
  timers: Timer[] = [];
  currentTimerIndex: number = -1;
  timerName: string = '';

  ngOnInit(): void {}

  createTimer() {
    const newTimer: Timer = {
      name: this.timerName,
      startTime: new Date(),
      elapsedTime: 0,
      isRunning: false,
    };
    this.timers.push(newTimer);
    this.timerName = '';
    this.startTimer(this.timers.length - 1);
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
    clearInterval(this.timers[index].timerInterval);
    this.timers[index].isRunning = false;
    this.timers[index].endTime = new Date();
  }
}
