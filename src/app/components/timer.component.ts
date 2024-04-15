import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Timer } from '../interface';
import { TimerListComponent } from './timer-list.component';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  imports: [CommonModule, FormsModule, TimerListComponent],
  standalone: true,
})
export class TimerComponent implements OnInit {
  timers: Timer[] = [];
  timerName: string = '';

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {}

  createTimer() {
    const newTimer: Timer = {
      name: this.timerName,
      startTime: new Date(),
      elapsedTime: 0,
      isRunning: false,
    };
    this.timerService.createTimer(newTimer);
    this.timerName = '';
  }
}
